import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';


export interface BackButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    setType: (e: 'home' | 'came' | 'gone' | 'guest' | 'sign') => void,
}
