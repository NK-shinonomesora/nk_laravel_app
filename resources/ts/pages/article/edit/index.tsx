import React, { useState } from "react";
import Button from '@mui/material/Button';
import CenterBox from "../..//component/centerBox";
import Input from "@mui/material/Input";
import TextField from '@mui/material/TextField';
import ErrorMessage from "../../component/errorMessage";
import Box from '@mui/material/Box';
import { router } from '@inertiajs/react';

interface ArticleEditProps {}

const Index: React.FC<ArticleEditProps> = (props) => {
    const articleId = props[0].articleId;
    const [title, setTitle] = useState<string>(props[0].title);
    const [content, setContent] = useState<string>(props[0].content);

    const changeTitle = (value: string) => {
        setTitle(value);
    }

    const changeContent = (value: string) => {
        setContent(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        router.post('/article/edit', {
            articleId,
            title,
            content,
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <CenterBox mt="mt-5" mb="mb-5">
                <>
                <div className="text-xl">
                    <p>記事編集画面</p>
                </div>
                </>
            </CenterBox>
            <CenterBox mt="mt-5" mb="mb-5">
                <Input
                    onChange={(e) => changeTitle(e.target.value)}
                    type="text"
                    placeholder="タイトルを入力してください。"
                    margin='dense'
                    className="w-[24rem] border-solid border border-black"
                    value={title}
                >
                </Input>
            </CenterBox>
            { props.errors.title &&
                <CenterBox mt='-mt-2' mb=''>
                    <ErrorMessage 
                        text={props.errors.title}
                    />
                </CenterBox>
            }
            <CenterBox mt="mt-20" mb="mb-20">
                <Box
                    sx={{
                        width: 500,
                        maxWidth: '100%',
                    }}
                    className="mt-10 mb-10"
                    >
                        <TextField
                            fullWidth
                            id="fullWidth"
                            label="記事"
                            multiline
                            maxRows={4}
                            onChange={(e) => changeContent(e.target.value)}
                            value={content}
                        />
                </Box>
            </CenterBox>
            { props.errors.content &&
                    <CenterBox mt='-mt-2' mb=''>
                        <ErrorMessage 
                            text={props.errors.content}
                        />
                    </CenterBox>
                }
            <CenterBox mt="mt-5" mb="mb-5">
                <Button
                    color="info"
                    type="submit"
                >更新</Button>
            </CenterBox>
        </form>
    )
}

export default Index;