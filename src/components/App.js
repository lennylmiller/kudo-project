import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles, useTheme, MuiThemeProvider } from '@material-ui/core/styles';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import Header from './layout/Header';
import PageNotFound from './PageNotFound';
import CoursesPage from './courses/CoursesPage';
import ManageCoursePage from './courses/ManageCoursePage'; // eslint-disable-line import/no-named-as-default
import QuestionsPage from './questions/QuestionsPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import muiTheme from '../muiTheme';

const useStyles = makeStyles((theme) => ({
  // TODO: How does Material-UI want me to manage this?
  root : {
    marginTop : 85,
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
          <Switch>
            <Route exact path="/" component={ HomePage }/>
            <Route path="/about" component={ AboutPage }/>
            <Route path="/courses" component={ CoursesPage }/>
            <Route path="/course" component={ ManageCoursePage }/>
            <Route path="/questions" component={ QuestionsPage }/>
            <Route component={ PageNotFound }/>
          </Switch>
          <ToastContainer autoClose={ 3000 } hideProgressBar/>
        </Container>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
