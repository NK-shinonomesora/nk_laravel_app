import React, { useState } from "react";
import Button from '@mui/material/Button';
import CenterBox from "../..//component/centerBox";
import BaseInput from "../../component/baseInput";
import BaseTextField from "../../component/baseTextField";
import { router } from '@inertiajs/react';

interface ArticleCreateProps {}

const Index: React.FC<ArticleCreateProps> = () => {
        const [title, setTitle] = useState<string>('');
        const [content, setContent] = useState<string>('');

        const changeTitle = (value: string) => {
            setTitle(value);
        }
    
        const changeContent = (value: string) => {
            setContent(value);
        }
    
        const handleSubmit = (e) => {
            e.preventDefault()
            router.post('/article/create', {
                title,
                content,
            })
        }
    
        return (
            <form onSubmit={handleSubmit}>
                <CenterBox mt="mt-5" mb="mb-5">
                    <>
                    <div className="text-xl">
                        <p>記事登録画面</p>
                    </div>
                    </>
                </CenterBox>
                <CenterBox mt="mt-5" mb="mb-5">
                    <BaseInput
                        onChange={changeTitle}
                        type="text"
                        placeholder="タイトルを入力してください。"
                    >
                    </BaseInput>
                </CenterBox>
                <CenterBox mt="mt-20" mb="mb-20">
                    <BaseTextField 
                        label="記事の内容"
                        onChange={changeContent}
                    />
                </CenterBox>
                <CenterBox mt="mt-5" mb="mb-5">
                    <Button
                        color="info"
                        type="submit"
                    >登録</Button>
                </CenterBox>
    
            </form>
    )
}

export default Index;