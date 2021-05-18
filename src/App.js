import React from 'react';
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import muiTheme from './muiTheme';
import { Routes } from './Routes';

const useStyles = makeStyles((theme) => ({
  root : {
    marginTop : theme.spacing(4),
    flex : 1
  }
}));

function App() {
  const classes = useStyles();
  return (
    <div className={ classes.root }>
      <MuiThemeProvider theme={ muiTheme }>
        <CssBaseline/>
        <Container>
          <Header/>
          <Routes/>
          <ToastContainer autoClose={ 3000 } hideProgressBar/>
        </Container>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
