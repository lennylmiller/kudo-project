import React from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { NavLink } from 'react-router-dom';
import { logout } from '../store/actions/authActions';
import {useHistory} from 'react-router-dom';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root : {
    display : 'flex'
  },
  appBar : {
    transition : theme.transitions.create(['margin', 'width'], {
      easing : theme.transitions.easing.sharp,
      duration : theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift : {
    width : `calc(100% - ${ drawerWidth }px)`,
    marginLeft : drawerWidth,
    transition : theme.transitions.create(['margin', 'width'], {
      easing : theme.transitions.easing.easeOut,
      duration : theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton : {
    marginRight : theme.spacing(2),
  },
  hide : {
    display : 'none',
  },
  drawer : {
    width : drawerWidth,
    flexShrink : 0,
  },
  drawerPaper : {
    width : drawerWidth,
  },
  drawerHeader : {
    display : 'flex',
    alignItems : 'center',
    padding : theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent : 'flex-end',
  },
  content : {
    flexGrow : 1,
    padding : theme.spacing(3),
    transition : theme.transitions.create('margin', {
      easing : theme.transitions.easing.sharp,
      duration : theme.transitions.duration.leavingScreen,
    }),
    marginLeft : -drawerWidth,
  },
  contentShift : {
    transition : theme.transitions.create('margin', {
      easing : theme.transitions.easing.easeOut,
      duration : theme.transitions.duration.enteringScreen,
    }),
    marginLeft : 0,
  },
  toolbarRoot : {
    display : 'flex',
    justifyContent : 'space-between',
    alignItems : 'center',
  }
}));

const Header = () => {
  const { user : currentUser, isLoggedIn } = useSelector((state) => state.auth);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const toggleDrawer = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const handleLogout = () => {
    dispatch(logout())
      .then(() => {
        console.log("logout okay");
        history.push('/login');
        // window.location.reload();
      })
      .catch(() => {
        console.error('Error logging out');
      });
  };

  return (
    <div className={ classes.root } onClick={ toggleDrawer }>
      <CssBaseline/>
      <AppBar
        position="fixed"
        className={ clsx(classes.appBar, {
          [classes.appBarShift] : open,
        }) }
      >
        <Toolbar classes={ { root : classes.toolbarRoot } }>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={ toggleDrawer }
            edge="start"
            className={ clsx(classes.menuButton, open && classes.hide) }
          >
            <MenuIcon/>
          </IconButton>
          { isLoggedIn && (
            <div
              style={ {
                display : 'flex',
                flexDirection : 'column',
                alignItems : 'center',
                justifyContent : 'center'
              } }>
              <AccountCircleIcon fontSize="small"/>
              <Typography variant="caption">{ currentUser.name }</Typography>
            </div>
          ) }
        </Toolbar>
      </AppBar>
      <Drawer
        className={ classes.drawer }
        variant="temporary"
        anchor="left"

        open={ open }
        classes={ {
          paper : classes.drawerPaper,
        } }
      >
        <Divider/>
        <List>
          <NavLink to="/questions" key="/questions">
            <ListItem button key="Questions">
              <ListItemIcon>
                <LibraryBooksIcon/>
              </ListItemIcon>
              <ListItemText primary="Questions"/>
            </ListItem>
          </NavLink>
          <NavLink to="/leaderboard" key="/leaderboard">
            <ListItem button key="Leaderboard">
              <ListItemIcon>
                <EqualizerIcon/>
              </ListItemIcon>
              <ListItemText primary="Leaderboard"/>
            </ListItem>
          </NavLink>
        </List>
        <Divider/>
        <List>
          {!isLoggedIn && (
            <NavLink to="/login" key="/login">
              <ListItem button key="LoginPage">
                <ListItemIcon>
                  <AccountCircleIcon/>
                </ListItemIcon>
                <ListItemText primary="LoginPage"/>
              </ListItem>
            </NavLink>
          )}
          { isLoggedIn && (
            <ListItem
              button
              key="Logout"
              onClick={ handleLogout }>
              <ListItemIcon>
                <ExitToAppIcon/>
              </ListItemIcon>
              <ListItemText primary="Logout"/>
            </ListItem>
          ) }
        </List>
      </Drawer>
    </div>
  );
};

export default Header;
