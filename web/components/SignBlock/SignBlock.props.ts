import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';


export interface SignBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    type: 'came' | 'gone' | 'break',
    employeeId: number,
    isGuest: boolean,
    setType: (e: 'home' | 'came' | 'gone' | 'guest' | 'sign') => void,
}
