import React from 'react';
import { router } from '@inertiajs/react';
import BaseButton from './baseButton';

interface LogoutProps {}

const Logout: React.FC<LogoutProps> = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        router.post('/login/logout', {})
    }
    
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <BaseButton
                type="submit"
                text="ログアウト"
            />
        </form>
    )
}

export default Logout;