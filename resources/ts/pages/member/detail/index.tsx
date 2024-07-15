import React from "react";
import CenterBox from "../../component/centerBox";

const Index: React.FC<MemberListProps> = (props) => {
    console.log(props)
    const { memberId, lastName, firstName } = props[0];

    return (
        <>
        <CenterBox mt='mt-5' mb='mb-5'>
            <>
            <div className="text-xl">
                <p>{memberId}</p>
            </div>
            </>
        </CenterBox>
        <CenterBox mt='mt-5' mb='mb-5'>
            <>
            <div className="text-xl">
                <p>{lastName}</p>
            </div>
            </>
        </CenterBox>
        <CenterBox mt='mt-5' mb='mb-5'>
            <>
            <div className="text-xl">
                <p>{firstName}</p>
            </div>
            </>
        </CenterBox>
        </>
    )
}

export default Index;