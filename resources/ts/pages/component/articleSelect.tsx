import React from 'react';
import BaseButton from './baseButton';
import BasicSelect from './basicSelect';

interface ArticleSelectProps {
    list: object[]
    label: string
    onChange: (value: string | number, index: number) => void
    plusMinusButton: JSX.Element
}

const ArticleSelect: React.FC<ArticleSelectProps> = ({ list, label, onChange, plusMinusButton }) => {
    return (
        <div className='flex'>
            <BasicSelect
                list={list}
                label={label}
                onChange={onChange}
            />
            {plusMinusButton}
        </div>
    )
}

export default ArticleSelect;