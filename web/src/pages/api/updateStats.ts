import { NextApiResponse, NextApiRequest } from 'next';
import { google } from 'googleapis';
import { GoogleAuth, JWT } from 'google-auth-library';
import axios from 'axios';


const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SPREADSHEET_ID = process.env.SPREADSHEET_ID as string;
const SHEET_NAME_EMPLOYEES = 'Employees';
const SHEET_NAME_GUESTS = 'Guests';

const getAuth = async (): Promise<JWT> => {
    const auth = new GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY,
        },
        scopes: SCOPES,
    });

    return (await auth.getClient()) as JWT;
};

const getStatsData = async (jwt: string) => {
    const response = await axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/api/stats?pagination%5Blimit%5D=1000000', {
        headers: {
            'Authorization': `Bearer ${jwt}`,
        },
    });

    return response.data.data;
};

const processStatsData = (data: any) => {
    const groupedData = data.reduce((acc: any, item: any) => {
        const date = item.timestamp.split(' ')[0];
        
        if (!acc[date]) {
            acc[date] = {};
        }

        if (!acc[date][item.name]) {
            acc[date][item.name] = {
                name: item.name,
                came: '-',
                break: '-',
                gone: '-',
                isGuest: item.isGuest ? '+' : '-',
                totalTime: '-'
            };
        }

        if (item.action === 'came') acc[date][item.name].came = item.timestamp.split(' ')[1];
        if (item.action === 'break') acc[date][item.name].break = item.timestamp.split(' ')[1];
        if (item.action === 'gone') acc[date][item.name].gone = item.timestamp.split(' ')[1];

        if (item.action === 'gone' && !item.isGuest) {
            const cameTime = acc[date][item.name].came;
            const goneTime = acc[date][item.name].gone;

            if (cameTime !== '-' && goneTime !== '-') {
                const [cameHours, cameMinutes] = cameTime.split(':').map(Number);
                const [goneHours, goneMinutes] = goneTime.split(':').map(Number);
                const cameInMinutes = cameHours * 60 + cameMinutes;
                const goneInMinutes = goneHours * 60 + goneMinutes;
                const totalMinutes = goneInMinutes - cameInMinutes;
                const totalHours = Math.floor(totalMinutes / 60);
                const remainderMinutes = totalMinutes % 60;
                acc[date][item.name].totalTime = `${totalHours}h ${remainderMinutes}m`;
            }
        }

        return acc;
    }, {});

    return Object.entries(groupedData).flatMap(([date, employees]: [string, any]) => {
        return Object.values(employees).map((employee: any) => ({
            date,
            name: employee.name,
            came: employee.came,
            break: employee.break,
            gone: employee.gone,
            isGuest: employee.isGuest === '+' ? true : false,
            totalTime: employee.totalTime
        }));
    });
};

const getExistingRecords = async (sheets: any, sheetName: string) => {
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!A:E`,
    });

    return response.data.values || [];
};

const updateGoogleSheet = async (data: any[]) => {
    const auth = await getAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    const existingEmployeeRecords = await getExistingRecords(sheets, SHEET_NAME_EMPLOYEES);

    const existingEmployeeMap = existingEmployeeRecords.reduce((acc: any, row: any, index: number) => {
        const [date, name] = row;

        if (!acc[date]) {
            acc[date] = {};
        }

        acc[date][name] = index + 1;

        return acc;
    }, {});

    const employeeRequests = data.filter(row => !row.isGuest).map((row) => {
        const { date, name, came, break: breakTime, gone, totalTime } = row;
        const rowIndex = existingEmployeeMap[date] ? existingEmployeeMap[date][name] : null;

        const values = [date, name, came, breakTime, gone, totalTime];

        if (rowIndex) {
            return {
                updateCells: {
                    range: {
                        sheetId: 0,
                        startRowIndex: rowIndex - 1,
                        endRowIndex: rowIndex,
                        startColumnIndex: 0,
                        endColumnIndex: values.length,
                    },
                    rows: [
                        {
                            values: values.map((cell: any) => ({
                                userEnteredValue: { stringValue: cell },
                            })),
                        },
                    ],
                    fields: 'userEnteredValue',
                },
            };
        } else {
            return {
                appendCells: {
                    sheetId: 0,
                    rows: [
                        {
                            values: values.map((cell: any) => ({
                                userEnteredValue: { stringValue: cell },
                            })),
                        },
                    ],
                    fields: 'userEnteredValue',
                },
            };
        }
    });

    const guestRequests = data.filter(row => row.isGuest).map((row) => {
        const { date, name, came } = row;
        const values = [date, name, came];

        return {
            appendCells: {
                sheetId: 0,
                rows: [
                    {
                        values: values.map((cell: any) => ({
                            userEnteredValue: { stringValue: cell },
                        })),
                    },
                ],
                fields: 'userEnteredValue',
            },
        };
    });

    await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME_GUESTS}!A:C`,
        valueInputOption: 'RAW',
        requestBody: {
            values: guestRequests.map(({ appendCells }) =>
                appendCells.rows[0].values.map(cell => cell.userEnteredValue.stringValue)
            ),
        },
    });

    if (employeeRequests.length > 0) {
        await sheets.spreadsheets.batchUpdate({
            spreadsheetId: SPREADSHEET_ID,
            requestBody: {
                requests: employeeRequests,
            },
        });
    }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const jwtResponse = await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/api/auth/local', {
            identifier: process.env.NEXT_PUBLIC_EMAIL,
            password: process.env.NEXT_PUBLIC_PASSWORD,
        });

        const jwt = jwtResponse.data.jwt;
        const statsData = await getStatsData(jwt);

        const processedData = processStatsData(statsData);
        await updateGoogleSheet(processedData);

        res.status(200).json({ message: 'Данные успешно обновлены в Google Sheets' });
    } catch (error) {
        console.error('Ошибка при обновлении данных:', error);
        res.status(500).json({ error: 'Ошибка при обновлении данных' });
    }
};

export default handler;
