import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PageNotFound from './components/PageNotFound';
import QuestionNew from './components/questions/QuestionNew';
import ProtectedPath from './helpers/ProtectedPath';
import RecoverPasswordPage from './components/auth/RecoverPasswordPage';
import QuestionsPage from './components/questions/QuestionsPage';
import LeaderboardPage from './components/users/LeaderboardPageV1';
import ManageQuestionPage from './components/questions/ManageQuestionPage';
import LoginPage from './components/auth/LoginPage';

export const Routes = () => {
  return (
    <Switch>
      <ProtectedPath exact path={ ['/', '/home'] } component={ QuestionsPage }/>
      <ProtectedPath exact path="/questions/add" component={ QuestionNew }/>
      <ProtectedPath exact path="/questions" component={ QuestionsPage }/>
      <ProtectedPath path="/questions/:questionId" component={ ManageQuestionPage }/>
      <ProtectedPath path="/leaderboard" component={ LeaderboardPage }/>
      <Route exact path="/login" component={ LoginPage }/>
      <Route path="/recover-password" component={ RecoverPasswordPage }/>
      <Route path="/404" component={ PageNotFound }/>
      <Redirect to="/404"/>
    </Switch>
  );
};

