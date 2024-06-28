import React from "react";
import CenterBox from "../../component/centerBox";

const Index: React.FC<ArticleListProps> = (props) => {
    const { title, content } = props[0];

    return (
        <>
        <CenterBox mt='mt-5' mb='mb-5'>
            <>
            <div className="text-xl">
                <p>{title}</p>
            </div>
            </>
        </CenterBox>
        <CenterBox mt='mt-5' mb='mb-5'>
            <pre>{content}</pre>
        </CenterBox>
        </>
    )
}

export default Index;