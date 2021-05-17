import React from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import PageNotFound from './components/PageNotFound';
import QuestionsPageV2 from './components/questions/QuestionsPage';
import LeaderboardPage from './components/users/LeaderboardPage';
import QuestionNew from './components/questions/QuestionNew';
import ManageQuestionPage from './components/questions/ManageQuestionPage';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import ProtectedPath from './helpers/ProtectedPath';
import RecoverPasswordPage from './components/auth/RecoverPasswordPage';

export const Routes = () => {
  return (
    <Switch>
      <ProtectedPath exact path={ ['/', '/home'] } component={ HomePage }/>
      <ProtectedPath exact path="/questions/add" component={ QuestionNew }/>
      <ProtectedPath exact path="/questions" component={ QuestionsPageV2 }/>
      <ProtectedPath path="/questions/:questionId" component={ ManageQuestionPage }/>
      <ProtectedPath path="/leaderboard" component={ LeaderboardPage }/>
      <Route exact path="/login" component={ LoginPage }/>
      <Route path="/register" component={ RegisterPage }/>
      <Route path="/recover-password" component={ RecoverPasswordPage }/>
      <Route path="/404" component={ PageNotFound }/>
      <Redirect to="/404"/>
    </Switch>
  );
};

