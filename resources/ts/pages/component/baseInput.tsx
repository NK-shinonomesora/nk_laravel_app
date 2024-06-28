import React from "react";
import Input from '@mui/material/Input';

const BaseInput: React.FC<BaseInputProps> = ({ onChange, type, placeholder }) => {
    return (
        <>
        <Input
            type={type}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            margin='dense'
            className="w-[24rem] border-solid border border-black"
        ></Input>
        </>
    );
}

export default BaseInput;
