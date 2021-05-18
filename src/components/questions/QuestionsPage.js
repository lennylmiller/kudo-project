import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import QuestionList from './QuestionList';
import Spinner from '../common/Spinner';
import { loadQuestionsV2 } from '../../store/actions/questionActions';

const useStyles = makeStyles((theme) => ({
  root : {
    marginTop : 80,
  },
  tabsRoot : {
    paddingTop : theme.spacing(5)
  }
}));

const QuestionsPage = () => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(async() => {
    try {
      if (questions.length === 0) {
        await loadQuestionsV2(dispatch);
        setTabIndex(0);
        setIsLoading(false);
      }
    } catch(error) {
      alert(`Loading questions failed ${ error }`);
    }

    questions.length > 0 && setIsLoading(false);
  }, []);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
    setIsLoading(isLoading);
  };

  const answered = questions.filter(question => {
    if (currentUser) {
      const answeredOne = question.optionOne.votes.includes(currentUser.id);
      const answeredTwo = question.optionTwo.votes.includes(currentUser.id);

      return answeredOne || answeredTwo;
    }
    return false;
  });

  const unanswered = questions.filter(e => !answered.includes(e));

  return isLoading
    ? (<Spinner/>)
    : (<div className={ classes.root }>
        <Typography align="center" variant="h5">Poll Questions</Typography>
        <Tabs
          classes={ { root : classes.tabsRoot } }
          value={ tabIndex }
          indicatorColor="primary"
          textColor="primary"
          onChange={ handleTabChange }
          aria-label="Answered & unanswered questions">
          <Tab label="Unanswered"/>
          <Tab label="Answered"/>
        </Tabs>
        <TabPanel index={ 0 } value={ tabIndex }>
          <QuestionList questions={ unanswered }/>
        </TabPanel>
        <TabPanel index={ 1 } value={ tabIndex }>
          <QuestionList questions={ answered }/>
        </TabPanel>
      </div>
    );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={ value !== index } id={ `simple-tabpanel-${ index }` }
         aria-labelledby={ `simple-tab-${ index }` } { ...other }>
      { children }
    </div>
  );
}

TabPanel.propTypes = {
  children : PropTypes.node,
  index : PropTypes.any.isRequired,
  value : PropTypes.any.isRequired,
};
export default QuestionsPage;
