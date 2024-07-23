import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface HomeFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    setType: (e: 'home' | 'came' | 'gone' | 'break' | 'guest' | 'sign') => void,
    setTypeSign: (e: 'came' | 'gone' | 'break') => void,
}
