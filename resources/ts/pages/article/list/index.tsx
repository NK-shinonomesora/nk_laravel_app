import React from "react";
import BasicTable from "../../component/basicTable";
import Header from "../../component/header";
import CenterBox from "../../component/centerBox";
import BaseButton from "../../component/baseButton";
import { router } from '@inertiajs/react';

const articleListHeader = ['タイトル', '作成日時', '更新日時', ''];
const articleListKeys = ['title', 'createdAt', 'updatedAt', 'edit'];

const Index: React.FC<ArticleListProps> = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        router.get('/article/create', {})
    }

    return (
        <>
        <Header />
        <form onSubmit={(e) => handleSubmit(e)}>
            <CenterBox>
                <BaseButton
                    type="submit"
                    text="記事登録"
                />
            </CenterBox>
        </form>
        <BasicTable
            dataList={props.articleList}
            dataKeys={articleListKeys}
            listHeader={articleListHeader}
            url="/article/detail"
            editUrl="/article/edit"
            primaryKey="articleId"
        />
        </>
    )
}

export default Index;