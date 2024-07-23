import axios from "axios";
import { ToastSuccess } from "../components/Common/Toast/Toast";
import { setLocale } from "./locale.helper";
import { updateStats } from "./stats.helper";


export async function signEmployee(type: 'came' | 'gone' | 'break', name: string, date: string, isGuest: boolean,
    router: any, setType: (e: 'home' | 'came' | 'gone' | 'guest' | 'sign') => void) {
    try {
        const jwtResponse = await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/api/auth/local', {
            identifier: process.env.NEXT_PUBLIC_EMAIL,
            password: process.env.NEXT_PUBLIC_PASSWORD,
        });

        const jwt = jwtResponse.data.jwt;

        await axios.post(
            process.env.NEXT_PUBLIC_DOMAIN + '/api/stats',
            {
                "data": {
                    "name": name,
                    "action": type,
                    "timestamp": date,
                    "isGuest": isGuest,
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            }
        ).then(() => {
            updateStats();
            ToastSuccess(setLocale(router.locale).data_sent);
            setType('home');
        });
    } catch (error) {
        console.error("Error: ", error);
    }
}
