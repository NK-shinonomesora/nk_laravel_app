import React from "react";
import BasicTable from "../../component/basicTable";
import Header from "../../component/header";
import CenterBox from "../../component/centerBox";
import BaseButton from "../../component/baseButton";
import { router } from '@inertiajs/react';

const memberListHeader = ['メンバーID', '氏名', '名前', ''];
const memberListKeys = ['memberId', 'lastName', 'firstName', 'edit'];

const Index: React.FC<MemberListProps> = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        router.get('/member/create', {})
    }

    return (
        <>
        <Header />
        <form onSubmit={(e) => handleSubmit(e)}>
            <CenterBox>
                <BaseButton
                    type="submit"
                    text="メンバー登録"
                />
            </CenterBox>
        </form>
        <BasicTable
            dataList={props.memberList}
            dataKeys={memberListKeys}
            listHeader={memberListHeader}
            url="/member/detail"
            editUrl="/member/edit"
            primaryKey="memberId"
        />
        </>
    )
}

export default Index;