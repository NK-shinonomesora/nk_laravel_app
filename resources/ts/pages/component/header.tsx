import React from 'react';
import TemporaryDrawer from './temporaryDrawer';
import CenterBox from './centerBox';
import Logout from './logout';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    return (
        <CenterBox mt='mt-3' mb='mb-3'>
            <div className='flex'>
                <TemporaryDrawer />
                <Logout />
            </div>
        </CenterBox>
    )
}

export default Header;