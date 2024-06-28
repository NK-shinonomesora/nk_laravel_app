import React, { useState, useEffect } from "react";
import SelectElement from "../../class/selectElement";
import TestHook from "../../hook/testHook";

interface TestSelectProps {}

const initSelectElement = (updateFunc: Function, addOrDeleteSelectElement: Function) => {
    const root = new SelectElement(null, null, updateFunc, addOrDeleteSelectElement, true);
    root.setChild(new SelectElement(root, null, updateFunc, addOrDeleteSelectElement));
    return root;
}

const displayAllSelectElement = (element: SelectElement, displaySelectElements: JSX.Element[]) => {
    console.log(element.getId() + ' = ' + element.getValue());
    displaySelectElements.push(element.display());
    if(element.getChild()) displayAllSelectElement(element.getChild(), displaySelectElements);
}

const Index: React.FC<TestSelectProps> = () => {
    const [testVal, updateFunc] = TestHook('D');

    const addOrDeleteSelectElement = (element: SelectElement, isPlus: boolean = true) => {
        if(isPlus) {
            const child = element.getChild();
            const newElement = new SelectElement(element, child, updateFunc, addOrDeleteSelectElement);
            element.setChild(newElement);
            if(child) child.setParent(newElement);
        } else {
            const parent = element.getParent();
            const child = element.getChild();
            parent?.setChild(child);
            if(child) child.setParent(parent);
        }
        updateFunc(Math.random().toString(32).substring(2))
    }

    const [rootSelectElement, setRootSelectElement] = useState<SelectElement>(initSelectElement(updateFunc, addOrDeleteSelectElement));

    useEffect(() => {
    }, [testVal]);


    let displaySelectElements: JSX.Element[] = [];
    displayAllSelectElement(rootSelectElement.getChild(), displaySelectElements);

    return (
        <>
        {displaySelectElements.map((element) => (
            element
        ))}
        </>
    )
}

export default Index;