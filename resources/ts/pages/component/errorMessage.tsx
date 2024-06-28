import React from 'react';

interface ErrorMessageProps {
    text: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ text }) => {
    return (
        <div>
            <p className='text-red-500 text-sm'>{text}</p>
        </div>
    )
}

export default ErrorMessage;