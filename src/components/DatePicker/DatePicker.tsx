import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {ICustomDatePickerProps } from '../../services/types'


export function CustomDatePicker (props: ICustomDatePickerProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
            <DatePicker
                label="Controlled picker"
                value={props.dateValue}
                onChange={(newValue) => props.setDate(newValue)}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
