import React from "react";
import BasicTable from "../../component/basicTable";
import Header from "../../component/header";
import CenterBox from "../../component/centerBox";
import BaseButton from "../../component/baseButton";
import ErrorMessage from "../../component/errorMessage";
import { router } from '@inertiajs/react';

const articleListHeader = ['タイトル', '作成日時', '更新日時', '', ''];
const articleListKeys = ['title', 'createdAt', 'updatedAt', 'edit', 'delete'];

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
        { props.errors.articleId &&
            <CenterBox mt='-mt-2' mb=''>
                <ErrorMessage 
                    text={props.errors.articleId}
                />
            </CenterBox>
        }
        <BasicTable
            dataList={props.articleList}
            dataKeys={articleListKeys}
            listHeader={articleListHeader}
            url="/article/detail"
            editUrl="/article/edit"
            deleteUrl="/article/delete"
            primaryKey="articleId"
        />
        </>
    )
}

export default Index;