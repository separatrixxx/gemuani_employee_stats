import { createSlice } from '@reduxjs/toolkit'
import { EmployeeInterface } from '../../interfaces/employee.interface';


const employeesData: EmployeeInterface[] = [];

export const employeesSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: employeesData,
  },
  reducers: {
    setEmployees: (state, actions) => {
        state.employees = actions.payload
    },
  },
})

export const { setEmployees } = employeesSlice.actions

export default employeesSlice.reducer;