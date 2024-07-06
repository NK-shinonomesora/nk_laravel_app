import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import BaseButton from '../component/baseButton';
import CenterBox from "../component/centerBox";

export default class SelectElement {
    private id: string = Math.random().toString(32).substring(2);
    private value: number;
    private articleList: ArticleList[];
    private parent: SelectElement | null;
    private child: SelectElement | null;
    private updateFunc: Function;
    private addOrDeleteSelectElement: Function;
    private isRoot: boolean = false;

    constructor(articleList: ArticleList[], parent: SelectElement | null, child: SelectElement | null, updateFunc: Function, addOrDeleteSelectElement: Function, isRoot = false) {
        this.value = articleList[0].articleId;
        this.articleList = articleList;
        this.parent = parent;
        this.child = child;
        this.updateFunc = updateFunc;
        this.addOrDeleteSelectElement = addOrDeleteSelectElement;
        this.isRoot = isRoot;
    }

    public getId() {
        return this.id;
    }

    public getValue() {
        return this.value;
    }

    public setValue(value: string) {
        this.value = value;
    }

    public getParent() {
        return this.parent;
    }

    public setParent(parent: SelectElement) {
        this.parent = parent;
    }

    public getChild() {
        return this.child;
    }

    public setChild(child: SelectElement) {
        this.child = child;
    }

    public getIsRoot() {
        return this.isRoot;
    }

    private onChange(value: string) {
        this.setValue(value);
        this.updateFunc(Math.random().toString(32).substring(2));
    }

    display(): JSX.Element {
        return (
            <>
            <CenterBox mt='mt-8' mb='mb-8'>
                <div key={this.id} className='flex'>
                    <Select
                        defaultValue={this.value}
                        onChange={(e) => this.onChange(e.target.value)}
                    >
                        {this.articleList.map((articleInfo) => (
                            <MenuItem
                                value={articleInfo.articleId}
                            >{articleInfo.title}
                            </MenuItem>
                        ))}
                    </Select>
                    <BaseButton
                        type='button'
                        text='＋'
                        onClick={() => this.addOrDeleteSelectElement(this)}
                    />
                    <BaseButton
                        type='button'
                        text='－'
                        onClick={() => this.addOrDeleteSelectElement(this, false)}
                    />
                </div>
            </CenterBox>
            </>
        )
    }
}