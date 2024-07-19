import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';


export interface EmployeesListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    setEmployeeId: (e: number) => void,
    setType: (e: 'home' | 'came' | 'gone' | 'guest' | 'sign') => void,
}
