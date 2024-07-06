import { useState } from 'react';

const TestHook = (initVal: string) => {
    const [value, setValue] = useState<string>(initVal);

    return [ value, setValue ];
}

export default TestHook;