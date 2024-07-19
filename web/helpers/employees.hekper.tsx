import axios, { AxiosResponse } from "axios";
import { EmployeeDataInterface } from "../interfaces/employee.interface";
import { setEmployees } from "../features/employees/employeesSlice";


export async function getEmployees(dispatch: any) {
    try {
        await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/api/auth/local', {
            identifier: process.env.NEXT_PUBLIC_EMAIL,
            password: process.env.NEXT_PUBLIC_PASSWORD,
        })
            .then(async function (jwt) {
                const { data : response }: AxiosResponse<EmployeeDataInterface> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN +
                    '/api/employees', {
                        headers: {
                            'Authorization': 'Bearer ' + jwt.data.jwt,
                            'Content-Type': 'application/json'
                        }
                    });
                    
                dispatch(setEmployees(response.data));
            })
            .catch(function (error) {
                console.log("Get JWT error: " + error);
        });
    } catch (err) {
        console.log(err);
    }
}
