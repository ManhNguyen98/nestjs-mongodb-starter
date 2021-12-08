import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, useTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import DrawerCs from '../components/Drawer';
import styles from '../components/Drawer/styles';
import Header from '../components/Header'

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface LayoutProps {
  auth?: boolean;
  children: React.ReactNode;
  title?: string;
}

const Layout = ({children, title}: LayoutProps) => {
  const theme = useTheme()
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header handleDrawerOpen={handleDrawerOpen} open={open} />
      <DrawerCs handleDrawerClose={handleDrawerClose} open={open} />
      <Main open={open}>
        <styles.DrawerHeader />
        {title && <Typography variant="h6" color={theme.palette.text.disabled}>{title}</Typography>}
        {children}
      </Main>
    </Box>
  )
}

export default Layout