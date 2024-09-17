import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import cn from 'classnames';


export const Button = ({ text, type, isEmployee, onClick }: ButtonProps): JSX.Element => {   
    return (
        <button className={cn(styles.button, {
            [styles.came]: type === 'came',
            [styles.gone]: type === 'gone',
            [styles.guest]: type === 'guest',
            [styles.employee]: isEmployee,
        })} onClick={onClick}>
            {text}
        </button>
    );
};
