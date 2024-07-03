import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ViewListIcon from '@mui/icons-material/ViewList';
import { router } from '@inertiajs/react';
import CenterBox from "../component/centerBox";

const TemporaryDrawer = () => {
  const menuList = [
    { text: 'メンバー一覧', url: '/member/list' },
    { text: '記事一覧', url: '/article/list' },
    { text: '本一覧', url: '/book/list' }
  ];

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleSubmit = (e, url: string) => {
    e.preventDefault()
    router.get(url, {})
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menuList.map((list) => (
          <form onSubmit={(e) => handleSubmit(e, list.url)}>
            <ListItem key={list.text} disablePadding>
              <Button type='submit'>
                <ListItemIcon>
                  <ViewListIcon />
                </ListItemIcon>
                <ListItemText primary={list.text} />
              </Button>
            </ListItem>
          </form>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <CenterBox>
        <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      </CenterBox>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default TemporaryDrawer;