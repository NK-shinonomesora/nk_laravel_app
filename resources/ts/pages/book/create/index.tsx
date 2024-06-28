import React, { useState, useEffect } from "react";
import SelectElement from "../../class/selectElement";
import TestHook from "../../hook/testHook";
import CenterBox from "../../component/centerBox";
import BaseInput from "../../component/baseInput";
import BaseButton from '../../component/baseButton';
import { router } from '@inertiajs/react';

const initSelectElement = (updateFunc: Function, addOrDeleteSelectElement: Function, articleList: ArticleList[]) => {
    const root = new SelectElement(articleList, null, null, updateFunc, addOrDeleteSelectElement, true);
    root.setChild(new SelectElement(articleList, root, null, updateFunc, addOrDeleteSelectElement));
    return root;
}

const displayAllSelectElement = (element: SelectElement, displaySelectElements: JSX.Element[]) => {
    displaySelectElements.push(element.display());
    if(element.getChild()) displayAllSelectElement(element.getChild(), displaySelectElements);
}

const Index: React.FC<ArticleListProps> = (props) => {
    const [title, setTitle] = useState<string>('');
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

    const [rootSelectElement, setRootSelectElement] = useState<SelectElement>(initSelectElement(updateFunc, addOrDeleteSelectElement, props.articleList));

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
        router.post('/book/create', {
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
                    <p>本登録画面</p>
                </div>
                </>
            </CenterBox>
            <CenterBox mt='mt-5' mb='mb-5'>
                <BaseInput
                    onChange={changeTitle}
                    type="text"
                    placeholder="タイトルを入力してください。"
                />
            </CenterBox>
            {displaySelectElements.map((element) => (
                element
            ))}
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