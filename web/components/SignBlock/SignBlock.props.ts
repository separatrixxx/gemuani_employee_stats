import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';


export interface SignBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    employeeId: number,
}
