import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface BaseTextFieldProps {
    label: string
    onChange: (value: string) => void 
}

const BaseTextField: React.FC<BaseTextFieldProps> = ({ label, onChange }) => {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '75ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label={label}
          multiline
          maxRows={4}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </Box>
  );
}

export default BaseTextField;