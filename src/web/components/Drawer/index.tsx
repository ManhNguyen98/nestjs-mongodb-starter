import {
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import ApiIcon from '@mui/icons-material/Api';
import DescriptionIcon from '@mui/icons-material/Description';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import StarBorder from '@mui/icons-material/StarBorder';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import Styles from './styles';
import { useState } from 'react';

const drawerWidth = 240;

const IMPORTS_DATA_SOURCE = [
  {
    id: 0,
    name: 'UberEats',
    link: '/import/uber-eats',
    icon: <FastfoodIcon />,
  },
  {
    id: 1,
    name: '出前館',
    link: '/import/delivery-building',
    icon: <StarBorder />,
  },
  {
    id: 2,
    name: 'DiDi Food',
    link: '/import/didi-food',
    icon: <StarBorder />,
  },
  {
    id: 3,
    name: 'Menu Book',
    link: '/import/menu-book',
    icon: <MenuBookIcon />,
  },
];

const DrawerCs = ({ handleDrawerClose, open }) => {
  const theme = useTheme();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(true);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <Styles.DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </Styles.DrawerHeader>
      <Divider />
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
      >
        <ListItemButton
          selected={router.pathname === '/home'}
          onClick={() => router.push('/home')}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="ホーム" />
        </ListItemButton>
        <ListItemButton onClick={() => setOpenMenu(!openMenu)}>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="データ取込" />
          {openMenu ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {IMPORTS_DATA_SOURCE.map((menu) => (
              <ListItemButton
                selected={router.pathname === menu.link}
                key={menu.id}
                sx={{ pl: 4 }}
                onClick={() => router.push(menu.link)}
              >
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.name} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <ListItemButton
          selected={router.pathname === '/history'}
          onClick={() => router.push('/history')}
        >
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="データ取込履歴" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <ApiIcon />
          </ListItemIcon>
          <ListItemText primary="API連携" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default DrawerCs;
