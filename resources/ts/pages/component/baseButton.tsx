import React from 'react';
import Button from '@mui/material/Button';

interface BaseButtonProps {
    type: 'submit' | 'button'
    text: string
    onClick?: Function
}

const BaseButton: React.FC<BaseButtonProps> = ({ type, text, onClick = () => "" }) => {
    return (
        <Button
            color="info"
            type={type}
            onClick={onClick}
        >{text}</Button>
    )
}

export default BaseButton;