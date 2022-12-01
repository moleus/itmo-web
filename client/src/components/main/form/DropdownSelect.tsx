import React from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

interface DropdownSelectProps {
    label: string
    items: number[]
    handleChange: (e: SelectChangeEvent) => void
}

const DropdownSelect = ({label, items, handleChange}: DropdownSelectProps) => {
    return (
        <FormControl>
            <InputLabel>{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                onChange={handleChange}
            >
                {items.map(number => (
                    <MenuItem value={number}>{number}</MenuItem>
                ))}
            </Select>
        </FormControl>

    );
}

export default DropdownSelect;