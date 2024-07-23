import styles from './MainPage.module.css';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { EmployeesList } from '../../components/EmployeesList/EmployeesList';
import { BackButton } from '../../components/BackButton/BackButton';
import { SignBlock } from '../../components/SignBlock/SignBlock';
import { HomeForm } from '../../components/HomeForm/HomeForm';


export const MainPage = (): JSX.Element => {
    const [type, setType] = useState<'home' | 'came' | 'gone' | 'break' | 'guest' | 'sign'>('home');
    const [typeSign, setTypeSign] = useState<'came' | 'gone' | 'break'>('came');
    const [employeeId, setEmployeeId] = useState<number>(0);
    
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
                {
                    type === 'home' ?
                        <HomeForm setType={setType} setTypeSign={setTypeSign} />
                    :
                        <>
                            <BackButton setType={setType} />
                            {
                                type === 'came' || type === 'gone' || type === 'break' ?
                                    <EmployeesList setEmployeeId={setEmployeeId} setType={setType} />
                                :
                                    <SignBlock type={typeSign} employeeId={employeeId} isGuest={type === 'guest'} setType={setType} />
                            }
                        </>
                }
            </div>
        </>
    );
};
