import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import Header from './components/layout/Header';
import PageNotFound from './components/PageNotFound';
import CoursesPage from './components/courses/CoursesPage';
import ManageCoursePage from './components/courses/ManageCoursePage';
import QuestionsPage from './components/questions/QuestionsPage';
import LeaderboardPage from './components/users/LeaderboardPage';
import QuestionNew from './components/questions/QuestionNew';
import ManageQuestionPage from './components/questions/ManageQuestionPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import muiTheme from './muiTheme';

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
      <MuiThemeProvider theme={ muiTheme }>
        <CssBaseline/>
        <Container>
          <Header/>
          <Switch>
            <Route exact path="/" component={ HomePage }/>
            <Route path="/about" component={ AboutPage }/>
            <Route path="/courses" component={ CoursesPage }/>
            <Route path="/course/:slug" component={ ManageCoursePage }/>
            <Route exact path="/questions/add" component={ QuestionNew }/>
            <Route exact path="/questions" component={ QuestionsPage }/>
            <Route path="/questions/:id" component={ ManageQuestionPage }/>
            <Route exact path="/leaderboard" component={ LeaderboardPage }/>
            <Route component={ PageNotFound }/>
          </Switch>
          <ToastContainer autoClose={ 3000 } hideProgressBar/>
        </Container>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
