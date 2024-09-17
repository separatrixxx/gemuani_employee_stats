import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';


export interface ButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    text: string,
    type?: 'came' | 'gone' | 'guest',
    isEmployee?: boolean,
	onClick: (e: any) => void,
}
