import React from "react";

const Index: React.FC<MemberListProps> = (props) => {
    const { memberId } = props[0];

    return (
        <>
        <p>{memberId}</p>
        </>
    )
}

export default Index;