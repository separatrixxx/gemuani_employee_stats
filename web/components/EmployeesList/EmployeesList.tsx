import { EmployeesListProps } from './EmployeesList.props';
import styles from './EmployeesList.module.css';
import { useSelector } from 'react-redux';
import { AppState } from '../../features/store/store';
import { Button } from '../Common/Button/Button';


export const EmployeesList = ({ setType, setEmployeeId }: EmployeesListProps): JSX.Element => {
    const employees = useSelector((state: AppState) => state.employees.employees);
    
    return (
        <div className={styles.employeesList}>
            {employees.map(e => (
                <Button key={e.id} text={e.name} onClick={() => {
                    setEmployeeId(e.id);
                    setType('sign');
                }} />
            ))}
        </div>
    );
};
