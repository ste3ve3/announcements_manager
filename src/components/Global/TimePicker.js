import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function TimePickerValue({ value, onChange, label, name }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
                <TimePicker label={label} name={name} value={dayjs(value)} onChange={onChange} sx={{ width: "100%" }}/>
            </DemoContainer>
        </LocalizationProvider>
    );
}
