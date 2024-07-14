import React, { useState } from "react";
import BaseButton from "../component/baseButton";
import CenterBox from "../component/centerBox";
import BaseInput from "../component/baseInput";
import ErrorMessage from "../component/errorMessage";
import { router } from '@inertiajs/react';

interface LoginProps {}

const Index: React.FC<LoginProps> = (props) => {
    const [memberId, setMemberId] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const changeMemberId = (value: string) => {
        setMemberId(value);
    }

    const changePassword = (value: string) => {
        setPassword(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        router.post('/login', {
            memberId,
            password,
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <CenterBox mt='mt-5' mb='mb-5'>
                <>
                <div className="text-xl">
                    <p>Book Creator</p>
                </div>
                </>
            </CenterBox>
            <CenterBox mt='mt-5' mb=''>
                <BaseInput
                    onChange={changeMemberId}
                    type="text"
                    placeholder="IDを入力してください。"
                />
            </CenterBox>
            { props.errors.memberId &&
                <CenterBox mt='-mt-2' mb='mb-3'>
                    <ErrorMessage 
                        text={props.errors.memberId}
                    />
                </CenterBox>
            }
            <CenterBox mt='mt-5' mb=''>
                <BaseInput
                    onChange={changePassword}
                    type="password"
                    placeholder="パスワードを入力してください。"
                />
            </CenterBox>
            { props.errors.password &&
                <CenterBox mt='-mt-2' mb=''>
                    <ErrorMessage 
                        text={props.errors.password}
                    />
                </CenterBox>
            }
            <CenterBox mt='mt-5' mb='mb-5'>
                <BaseButton
                    type="submit"
                    text="ログイン"
                />
            </CenterBox>
        </form>
    );
}

export default Index;
