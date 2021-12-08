import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Profile from './Profile'
import Styles from './styles'

export default function Header({handleDrawerOpen, open}) {
  return (
      <Styles.AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Cloud Kitchen
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Profile />
        </Toolbar>
      </Styles.AppBar>
  );
}
