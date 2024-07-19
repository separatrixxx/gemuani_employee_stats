import { BackButtonProps } from './BackButton.props';
import styles from './BackButton.module.css';
import { useRouter } from 'next/router';


export const BackButton = ({ setType }: BackButtonProps): JSX.Element => {
    const router = useRouter();
    
    return (
        <div className={styles.backButton} onClick={() => setType('home')}>
            {'<'}
        </div>
    );
};
