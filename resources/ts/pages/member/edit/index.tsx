import React, { useState } from "react";
import Button from '@mui/material/Button';
import CenterBox from "../..//component/centerBox";
import Input from '@mui/material/Input';
import ErrorMessage from "../../component/errorMessage";
import { router } from '@inertiajs/react';

interface MemberEditProps {}

const Index: React.FC<MemberEditProps> = (props) => {
    const [memberId] = useState<string>(props[0].memberId);
    const [lastName, setLastName] = useState<string>(props[0].lastName);
    const [firstName, setFirstName] = useState<string>(props[0].firstName);

    const changeLastName = (value: string) => {
        setLastName(value);
    }

    const changeFirstName = (value: string) => {
        setFirstName(value)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        router.post('/member/edit', {
            memberId,
            lastName,
            firstName,
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
                <Input
                    type={'text'}
                    value={memberId}
                    disabled={true}
                    margin='dense'
                    className="w-[24rem] border-solid border border-black"
                >
                </Input>
            </CenterBox>
            <CenterBox>
                <Input
                    type={'text'}
                    placeholder={'氏名を入力してください。'}
                    onChange={(e) => changeLastName(e.target.value)}
                    margin='dense'
                    className="w-[24rem] border-solid border border-black"
                    value={lastName}
                ></Input>
            </CenterBox>
            { props.errors.lastName &&
                <CenterBox mt='-mt-2' mb=''>
                    <ErrorMessage 
                        text={props.errors.lastName}
                    />
                </CenterBox>
            }
            <CenterBox>
                <Input
                    type={'text'}
                    placeholder={'名前を入力してください。'}
                    onChange={(e) => changeFirstName(e.target.value)}
                    margin='dense'
                    className="w-[24rem] border-solid border border-black"
                    value={firstName}
                ></Input>
            </CenterBox>
            { props.errors.firstName &&
                <CenterBox mt='-mt-2' mb=''>
                    <ErrorMessage 
                        text={props.errors.firstName}
                    />
                </CenterBox>
            }
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