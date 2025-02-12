import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import { MdEditDocument } from "react-icons/md";
import { PiNotebookFill } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import UserMenu from "../user-menu/UserMenu"
import { GiOpenPalm } from 'react-icons/gi';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(0)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebar({ pages }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate()

  const handleDrawer = () => {
    setOpen(!open)
  }
  const icons = [
    {
      text: "Home",
      icon: <HomeSharpIcon />,
      goto: () => navigate('/')
    },
    {
      text: "Create Blog",
      icon: <EditNoteSharpIcon />,
      goto: () => navigate('/blog')
    },
    {
      text: "Drafts",
      icon: <MdEditDocument size={20} />,
      goto: () => navigate('/drafts')
    },
    {
      text: "Your Blogs",
      icon: <PiNotebookFill size={20} />,
      goto: () => navigate('/your_blogs')
    }
  ]
  return (
    <Box component="main" sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {icons.map((text, index) => (
            // {['Home', 'About'].map((text, index) => (
            <ListItem onClick={text.goto} key={text.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {text.icon}
                </ListItemIcon>
                <ListItemText primary={text.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>


      <Box component="div" sx={{
        display: "flex",
        gap: "1rem",
        flexDirection: "column",
        flexGrow: 1,
        p: 3,
        paddingY: 0,
        [theme.breakpoints.down('sm')]: { padding: "5px" },
      }}>

        <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", py: "10px", borderBottom: "1px solid #E0E0E0" }}>
          {!open && <span className='customBP:hidden'> <IconButton onClick={handleDrawer}>
            <ChevronRightIcon />
          </IconButton></span>}
          <img src="/logo/blog-logo-black.svg" width={80} alt="logo" />
          <UserMenu />
        </Box>

        <div className='flex-grow-1 p-0 '>
          <div className='flex justify-center items-center flex-col'>
            {pages}
          </div>
        </div>
      </Box>


    </Box>
  );
}
