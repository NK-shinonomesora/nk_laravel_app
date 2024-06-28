import React from "react";
import BasicTable from "../../component/basicTable";
import TemporaryDrawer from "../../component/temporaryDrawer";
import CenterBox from "../../component/centerBox";
import BaseButton from "../../component/baseButton";
import { router } from '@inertiajs/react';

const bookListHeader = ['タイトル', '作成日時', '更新日時'];
const bookListKeys = ['title', 'createdAt', 'updatedAt'];

const Index: React.FC<BookListProps> = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        router.get('/book/create', {})
    }

    return (
        <>
        <TemporaryDrawer />
        <form onSubmit={(e) => handleSubmit(e)}>
            <CenterBox mt='' mb='mb-5'>
                <BaseButton
                    type="submit"
                    text="本の登録"
                />
            </CenterBox>
        </form>
        <BasicTable
            dataList={props.bookList}
            dataKeys={bookListKeys}
            listHeader={bookListHeader}
            url="/book/detail"
            primaryKey="bookId"
        />
        </>
    )
}

export default Index;