import { InputProps } from './Input.props';
import styles from './Input.module.css';


export const Input = ({ text, value, onChange }: InputProps): JSX.Element => {    
	return <input className={styles.input}
        placeholder={text}
        value={value}
        onChange={onChange}
        type='text'
        name='text input'
        aria-label='text input' />;
};
