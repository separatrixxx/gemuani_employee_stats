import styles from './MainPage.module.css';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { AppState } from '../../features/store/store';
import { useState } from 'react';
import { Button } from '../../components/Common/Button/Button';
import { setLocale } from '../../helpers/locale.helper';
import { EmployeesList } from '../../components/EmployeesList/EmployeesList';
import { BackButton } from '../../components/BackButton/BackButton';
import { SignBlock } from '../../components/SignBlock/SignBlock';


export const MainPage = (): JSX.Element => {
    const router = useRouter();

    const employees = useSelector((state: AppState) => state.employees.employees);

    const [type, setType] = useState<'home' | 'came' | 'gone' | 'guest' | 'sign'>('home');
    const [employeeId, setEmployeeId] = useState<number>(0);
    
    if (type === 'home') {
        return (
            <>
                <Toaster
                    position="top-center"
                    reverseOrder={true}
                    toastOptions={{
                        duration: 2000,
                    }}
                />
                <div className={styles.wrapper}>
                    <Button text={setLocale(router.locale).came} type='came' onClick={() => setType('came')} />
                    <Button text={setLocale(router.locale).gone} type='gone' onClick={() => setType('gone')} />
                    <Button text={setLocale(router.locale).guest} type='guest' onClick={() => setType('guest')} />
                </div>
            </>
        );
    } else if (type === 'guest') {
        return (
            <>
                <Toaster
                    position="top-center"
                    reverseOrder={true}
                    toastOptions={{
                        duration: 2000,
                    }}
                />
                <div className={styles.wrapper}>
                    
                </div>
            </>
        );
    } else if (type === 'came' || type === 'gone') {
        return (
            <>
                <Toaster
                    position="top-center"
                    reverseOrder={true}
                    toastOptions={{
                        duration: 2000,
                    }}
                />
                <div className={styles.wrapper}>
                    <BackButton setType={setType} />
                    <EmployeesList setEmployeeId={setEmployeeId} setType={setType} />
                </div>
            </>
        );
    } else {
        return (
            <>
                <Toaster
                    position="top-center"
                    reverseOrder={true}
                    toastOptions={{
                        duration: 2000,
                    }}
                />
                <div className={styles.wrapper}>
                    <BackButton setType={setType} />
                    <SignBlock employeeId={employeeId} />
                </div>
            </>
        );
    }
};
