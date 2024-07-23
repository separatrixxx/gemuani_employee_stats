import { SignBlockProps } from './SignBlock.props';
import styles from './SignBlock.module.css';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { AppState } from '../../features/store/store';
import { Button } from '../Common/Button/Button';
import { setLocale } from '../../helpers/locale.helper';
import { Htag } from '../Common/Htag/Htag';
import { Input } from '../Common/Input/Input';
import { signEmployee } from '../../helpers/sign.helper';
import { ToastError } from '../Common/Toast/Toast';


export const SignBlock = ({ type, employeeId, isGuest, setType }: SignBlockProps): JSX.Element => {
    const router = useRouter();
    
    const employee = useSelector((state: AppState) => state.employees.employees).filter(e => e.id === employeeId)[0];
    const [password, setPassword] = useState<string>('');
    const date = format(new Date(), 'dd.MM.yyyy HH:mm');

    return (
        <div className={styles.signBlock}>
            <Htag tag='m'>
                {setLocale(router.locale).confirm_text
                    .replace('${name}', !isGuest ? employee.name : password)
                    .replace('${date}', date)}
            </Htag>
            <Input text={!isGuest ? setLocale(router.locale).enter_password : setLocale(router.locale).enter_full_name}
                value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button text={setLocale(router.locale).confirm} type="came" onClick={() => {
                if (!isGuest) {
                    if (password === employee.password) {
                        signEmployee(type, employee.name, date, isGuest, router, setType);
                    } else {
                        ToastError(setLocale(router.locale).wrong_password);
                    }
                } else {
                    signEmployee('came', password, date, isGuest, router, setType);
                }
            }} />
        </div>
    );
};
