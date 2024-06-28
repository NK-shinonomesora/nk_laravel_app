import React, { useState } from "react";
import Button from '@mui/material/Button';
import CenterBox from "../..//component/centerBox";
import BaseInput from "../../component/baseInput";
import ErrorMessage from "../../component/errorMessage";
import { router } from '@inertiajs/react';

interface MemberCreateProps {}

const Index: React.FC<MemberCreateProps> = (props) => {
    console.log(props.errors);
    const [memberId, setMemberId] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [password_confirmation, setPasswordConfirm] = useState<string>('');

    const changeMemberId = (value: string) => {
        setMemberId(value);
    }

    const changeLastName = (value: string) => {
        setLastName(value);
    }

    const changeFirstName = (value: string) => {
        setFirstName(value)
    }

    const changePassword = (value: string) => {
        setPassword(value);
    }

    const changePasswordConfirm = (value: string) => {
        setPasswordConfirm(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        router.post('/member/create', {
            memberId,
            lastName,
            firstName,
            password,
            password_confirmation,
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <CenterBox>
                <>
                <div className="text-xl">
                    <p>メンバー登録画面</p>
                </div>
                </>
            </CenterBox>
            <CenterBox>
                <BaseInput
                    onChange={changeMemberId}
                    type="text"
                    placeholder="IDを入力してください。"
                >
                </BaseInput>
            </CenterBox>
            { props.errors.memberId &&
                <CenterBox mt='-mt-2' mb=''>
                    <ErrorMessage 
                        text={props.errors.memberId}
                    />
                </CenterBox>
            }
            <CenterBox>
                <BaseInput
                    onChange={changeLastName}
                    type="text"
                    placeholder="氏名を入力してください。"
                >
                </BaseInput>
            </CenterBox>
            { props.errors.lastName &&
                <CenterBox mt='-mt-2' mb=''>
                    <ErrorMessage 
                        text={props.errors.lastName}
                    />
                </CenterBox>
            }
            <CenterBox>
                <BaseInput
                    onChange={changeFirstName}
                    type="text"
                    placeholder="名前を入力してください。"
                >
                </BaseInput>
            </CenterBox>
            { props.errors.firstName &&
                <CenterBox mt='-mt-2' mb=''>
                    <ErrorMessage 
                        text={props.errors.firstName}
                    />
                </CenterBox>
            }
            <CenterBox>
                <BaseInput
                    onChange={changePassword}
                    type="password"
                    placeholder="パスワードを入力してください。"
                >
                </BaseInput>
            </CenterBox>
            { props.errors.password &&
                <CenterBox mt='-mt-2' mb=''>
                    <ErrorMessage 
                        text={props.errors.password}
                    />
                </CenterBox>
            }
            <CenterBox>
                <BaseInput
                    onChange={changePasswordConfirm}
                    type="password"
                    placeholder="パスワードをもう一度入力してください。"
                >
                </BaseInput>
            </CenterBox>
            <CenterBox>
                <Button
                    color="info"
                    type="submit"
                >登録</Button>
            </CenterBox>

        </form>
    )
}

export default Index;