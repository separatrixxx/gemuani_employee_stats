import { HomeFormProps } from './HomeForm.props';
import { useRouter } from 'next/router';
import { Button } from '../Common/Button/Button';
import { setLocale } from '../../helpers/locale.helper';


export const HomeForm = ({ setType, setTypeSign }: HomeFormProps): JSX.Element => {
    const router = useRouter();

    return (
        <>
            <Button text={setLocale(router.locale).came} type='came' onClick={() => {
                setType('came');
                setTypeSign('came');
            }} />
            <Button text={setLocale(router.locale).gone} type='gone' onClick={() => {
                setType('gone');
                setTypeSign('gone');
            }} />
            <Button text={setLocale(router.locale).break} type='guest' onClick={() => {
                setType('break');
                setTypeSign('break');
            }} />
            <Button text={setLocale(router.locale).guest} type='guest' onClick={() => setType('guest')} />
        </>
    );
};
