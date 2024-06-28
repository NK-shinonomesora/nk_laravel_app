import React from "react";

interface CenterBoxProps {
    children: JSX.Element
    mt: string
    mb: string
}

const CenterBox: React.FC<CenterBoxProps> = ({ children, mt, mb }) => {
    return (
        <div className={`w-100 h-10 flex items-center justify-center ${mt} ${mb}`}>
            {children}
        </div>
    );
}

export default CenterBox;
