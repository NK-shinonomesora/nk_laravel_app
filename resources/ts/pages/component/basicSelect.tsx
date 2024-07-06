import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface BasicSelectProps {
  list: object[]
  label: string
  onChange: (value: string | number) => void
}

const BasicSelect: React.FC<BasicSelectProps> = ({ list, label, onChange }) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={label}
          onChange={(e: SelectChangeEvent) => onChange(e.target.value)}
        >
          {
            list.map((data, i) => (
              <MenuItem
                  value={data.articleId}
              >{data.title}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </Box>
  )
}

export default BasicSelect;
