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
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
      className="mt-10 mb-10"
    >
        <TextField
          fullWidth
          id="fullWidth"
          label={label}
          multiline
          maxRows={4}
          onChange={(e) => onChange(e.target.value)}
        />
    </Box>
  );
}

export default BaseTextField;