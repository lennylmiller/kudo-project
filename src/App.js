import React from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import HomePage from './components/home/HomePage';
import Header from './components/Header';
import PageNotFound from './components/PageNotFound';
import QuestionsPage from './components/questions/QuestionsPage';
import LeaderboardPage from './components/users/LeaderboardPage';
import QuestionNew from './components/questions/QuestionNew';
import ManageQuestionPage from './components/questions/ManageQuestionPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import muiTheme from './muiTheme';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import ProtectedPath from './helpers/ProtectedPath';

const useStyles = makeStyles((theme) => ({
  // TODO: How does Material-UI want me to manage this?
  root : {
    marginTop : theme.spacing(4),
    flex : 1
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div className={ classes.root }>
      <Router>
        <MuiThemeProvider theme={ muiTheme }>
          <CssBaseline/>
          <Container>
            <Header/>
            <Switch>
              <ProtectedPath exact path={['/', '/home']} component={ HomePage }/>
              <Route exact path="/login" component={ LoginPage }/>
              <Route path="/register" component={ RegisterPage }/>
              <ProtectedPath exact path="/questions/add" component={ QuestionNew }/>
              <ProtectedPath path="/questions/:id" component={ ManageQuestionPage }/>
              <ProtectedPath exact path="/questions" component={ QuestionsPage }/>
              <ProtectedPath path="/leaderboard" component={ LeaderboardPage }/>
              <Route path="/404" component={ PageNotFound }/>
              <Redirect to="/404"/>
            </Switch>
            <ToastContainer autoClose={ 3000 } hideProgressBar/>
          </Container>
        </MuiThemeProvider>
      </Router>
    </div>
  );
}

export default App;
