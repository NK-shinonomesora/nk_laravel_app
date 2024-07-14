import React, { useState, useEffect } from "react";
import SelectElement from "../../class/selectElement";
import TestHook from "../../hook/testHook";
import CenterBox from "../../component/centerBox";
import Input from '@mui/material/Input';
import BaseButton from '../../component/baseButton';
import ErrorMessage from "../../component/errorMessage";
import { router } from '@inertiajs/react';

interface BookEditProps {}

const getRootArticle = (bookInfo: object[]) => {
    for(let i = 0; i < bookInfo.length; i++) {
        if(!bookInfo[i].parentId) return bookInfo[i].articleId;
    }
}

const getTargetArticleId = (bookInfo: object[], targetArticleId: number) => {
    for(let i = 0; i < bookInfo.length; i++) {
        if(bookInfo[i].articleId === targetArticleId) return bookInfo[i].childId;
    }
}

const relationSelectElement = (parent: SelectElement, targetArticleId: number | null, updateFunc: Function, addOrDeleteSelectElement: Function, articleList: ArticleList[], bookInfo: object[]) => {
    if(!targetArticleId) return;
    const newSelectElement = new SelectElement(articleList, parent, null, updateFunc, addOrDeleteSelectElement, false, targetArticleId);
    parent.setChild(newSelectElement);
    const nextId = getTargetArticleId(bookInfo, targetArticleId);
    relationSelectElement(newSelectElement, nextId, updateFunc, addOrDeleteSelectElement, articleList, bookInfo);
}

const initSelectElement = (updateFunc: Function, addOrDeleteSelectElement: Function, articleList: ArticleList[], bookInfo: object[]) => {
    const root = new SelectElement(articleList, null, null, updateFunc, addOrDeleteSelectElement, true);
    const firstArticleId = getRootArticle(bookInfo);
    relationSelectElement(root, firstArticleId, updateFunc, addOrDeleteSelectElement, articleList, bookInfo);
    return root;
}

const displayAllSelectElement = (element: SelectElement, displaySelectElements: JSX.Element[]) => {
    displaySelectElements.push(element.display());
    if(element.getChild()) displayAllSelectElement(element.getChild(), displaySelectElements);
}

const Index: React.FC<BookEditProps> = (props) => {
    const [title, setTitle] = useState<string>(props.bookInfo[0].bookTitle);
    const [postRelationData, setPostRelationData] = useState<object[]>([]);
    const [testVal, updateFunc] = TestHook('');

    const addOrDeleteSelectElement = (element: SelectElement, isPlus: boolean = true) => {
        if(isPlus) {
            const child = element.getChild();
            const newElement = new SelectElement(props.articleList, element, child, updateFunc, addOrDeleteSelectElement);
            element.setChild(newElement);
            if(child) child.setParent(newElement);
        } else {
            if(countSelectElements() < 2) return;
            const parent = element.getParent();
            const child = element.getChild();
            parent?.setChild(child);
            if(child) child.setParent(parent);
        }
        updateFunc(Math.random().toString(32).substring(2))
    }

    const [rootSelectElement] = useState<SelectElement>(initSelectElement(updateFunc, addOrDeleteSelectElement, props.articleList, props.bookInfo));

    function countSelectElements(element: SelectElement = rootSelectElement, count: number = 0) {
        if(!element.getChild()) return count;
        count++;
        return countSelectElements(element.getChild(), count);
    }

    const createRelation = (element: SelectElement, relationData: object[]) => {
        const parent = element.getParent(); const child = element.getChild();
        if(parent && parent.getIsRoot() && child) { //子を持つ最初の要素
            relationData.push({ parentId: null, childId: child.getValue(), articleId: element.getValue() });
        } else if(parent && parent.getIsRoot() && !child) { //子を持たない最初の要素
            relationData.push({ parentId: null, childId: null, articleId: element.getValue() });
        } else if(parent && child) { //子を持つ2番目以降の要素
            relationData.push({ parentId: parent?.getValue(), childId: child.getValue(), articleId: element.getValue() });
        } else if(parent && !child) { //子を持たない2番目以降の要素
            relationData.push({ parentId: parent?.getValue(), childId: null, articleId: element.getValue() });
        }
        if(child) createRelation(element.getChild(), relationData);
    }

    useEffect(() => {
    }, [testVal]);


    let displaySelectElements: JSX.Element[] = [];
    displayAllSelectElement(rootSelectElement.getChild(), displaySelectElements);

    const changeTitle = (value: string) => {
        setTitle(value);
    }

    const changePostRelationData = () => {
        let relationData: object[] = [];
        createRelation(rootSelectElement, relationData);
        setPostRelationData(relationData);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        router.post('/book/edit', {
            bookId: props.bookInfo[0].bookId,
            title,
            postRelationData,
        })
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <CenterBox mt='mt-5' mb='mb-5'>
                <>
                <div className="text-xl">
                    <p>本編集画面</p>
                </div>
                </>
            </CenterBox>
            <CenterBox mt='mt-5' mb='mb-5'>
                <Input
                    onChange={(e) => changeTitle(e.target.value)}
                    type="text"
                    placeholder="タイトルを入力してください。"
                    value={title}
                    margin='dense'
                    className="w-[24rem] border-solid border border-black"
                />
            </CenterBox>
            { props.errors.title &&
                <CenterBox mt='-mt-2' mb=''>
                    <ErrorMessage 
                        text={props.errors.title}
                    />
                </CenterBox>
            }
            {displaySelectElements.map((element) => (
                element
            ))}
            { props.errors.postRelationData &&
                <CenterBox mt='-mt-2' mb=''>
                    <ErrorMessage 
                        text={props.errors.postRelationData}
                    />
                </CenterBox>
            }
            <CenterBox mt='mt-5' mb='mb-5'>
                <BaseButton
                    type='submit'
                    text='登録'
                    onClick={() => changePostRelationData()}
                />
            </CenterBox>
        </form>
        </>
    )
}

export default Index;