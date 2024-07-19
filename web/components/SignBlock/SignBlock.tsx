import { SignBlockProps } from './SignBlock.props';
import styles from './SignBlock.module.css';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import SignatureCanvas from 'react-signature-canvas';
import { format } from 'date-fns';
import { AppState } from '../../features/store/store';
import { Button } from '../Common/Button/Button';
import { setLocale } from '../../helpers/locale.helper';
import { Htag } from '../Common/Htag/Htag';


export const SignBlock = ({ employeeId }: SignBlockProps): JSX.Element => {
    const router = useRouter();
    
    const employees = useSelector((state: AppState) => state.employees.employees);

    const sigCanvas = useRef<SignatureCanvas | null>(null);

    return (
        <div className={styles.signBlock}>
            <Htag tag='m'>
                {setLocale(router.locale).confirm_text
                    .replace('${name}', employees.filter(e => e.id === employeeId)[0].name)
                    .replace('${date}', format(new Date(), 'dd.MM.yyyy HH:mm'))}
            </Htag>
            <div className={styles.signatureContainer}>
                <Htag tag='m'>
                    {setLocale(router.locale).signature + ':'}
                </Htag>
                <SignatureCanvas
                    ref={sigCanvas}
                    penColor="black"
                    canvasProps={{ className: styles.signatureCanvas }}
                />
                <Button text={setLocale(router.locale).clear} type="gone" onClick={() => {
                    if (sigCanvas.current) {
                        sigCanvas.current.clear();
                    }
                }} />
            </div>
            <Button text={setLocale(router.locale).confirm} type="came" onClick={() => {
                if (sigCanvas.current) {
                    const signatureDataUrl = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
                    console.log(signatureDataUrl);
                }
            }} />
        </div>
    );
};
