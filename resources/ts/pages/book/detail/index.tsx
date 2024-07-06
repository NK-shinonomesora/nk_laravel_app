import React, { useState } from "react";
import CenterBox from "../../component/centerBox";
import BaseButton from "../../component/baseButton";
import { router } from '@inertiajs/react';

interface BookDetailProps {}

const getRootArticle = (articles: object[]) => {
    for(let i = 0; i < articles.length; i++) {
        if(!articles[i].parentId) return articles[i].articleId;
    }
}

const createArticleInfo = (articles: object[], targetArticleId: number | null, articleInfo: object[]) => {
    if(!targetArticleId) return;
    let childArticleId = 0;
    for(let i = 0; i < articles.length; i++) {
        if(articles[i].articleId === targetArticleId) {
            articleInfo.push({ articleId: targetArticleId, articleTitle: articles[i].articleTitle });
            childArticleId = articles[i].childId;
            break;
        }
    }
    createArticleInfo(articles, childArticleId, articleInfo);
}

const Index: React.FC<BookDetailProps> = (props) => {
    const title = props.bookDetail[0].bookTitle;
    const rootArticleId = getRootArticle(props.bookDetail);
    let articleInfo = [];
    createArticleInfo(props.bookDetail, rootArticleId, articleInfo);
    console.log(articleInfo);

    const [articleId, setArticleId] = useState<number>();

    const changeArticleId = (value: number) => {
        setArticleId(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        router.get('/article/detail', {
            articleId,
        });
    }

    return (
        <>
        <CenterBox mt='mt-5' mb='mb-5'>
            <>
            <div className="text-xl">
                <p>{title}</p>
            </div>
            </>
        </CenterBox>
        <form onSubmit={(e) => handleSubmit(e)}>
            {articleInfo.map((article, i) => (
                <CenterBox mt='mt-2' mb='mb-2'>
                    <a href='#'>
                        <BaseButton
                            type="submit"
                            text={article.articleTitle}
                            onClick={() => changeArticleId(article.articleId)}
                        />
                    </a>
                </CenterBox>
            ))}
        </form>
        </>
    )
}

export default Index;