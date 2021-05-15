import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import * as questionActions from '../../store/actions/questionActions';
import QuestionList from './QuestionList';
import Spinner from '../common/Spinner';

const styles = theme => ({
  root : {
    marginTop : 80,
  },
  tabsRoot : {
    paddingTop : theme.spacing(5)
  }
});

@withStyles(styles, { withTheme : true })
class QuestionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToAddQuestionPage : false,
      tabIndex : 0,
      isLoading : true
    };
  }

  componentDidMount() {
    const { questions, actions } = this.props;
    if (questions.length === 0) {
      actions.loadQuestions()
        .then(() => {
          this.setState({
            redirectToAddQuestionPage : false,
            tabIndex : 0,
            isLoading : false
          })
        })
        .catch(error => {
        alert('Loading questions failed' + error);
      });
    }
  }

  handleTabChange = (event, newTabIndex) => {
    this.setState({
      redirectToAddQuestionPage : false,
      tabIndex : newTabIndex,
      isLoading: this.state.isLoading
    });
  };

  render() {
    const answered = this.props.questions.filter(question => {
      const answeredOne = question.optionOne.votes.includes('rashmi');
      const answeredTwo = question.optionTwo.votes.includes('rashmi');

      // question.isAnswered = answeredOne || answeredTwo;
      return answeredOne || answeredTwo;
    });

    const unanswered = this.props.questions.filter(e => !answered.includes(e));
    const { classes } = this.props;

    // if (this.props.questions.length > 0) {
    //  this.setState({
    //    isLoading: false
    //  })
    // }
    console.log('ASDFASDFASDFASDFASDF', this.props.questions);

    return this.state.isLoading
      ? (<Spinner/>)
      : (<div className={ classes.root }>
          <Typography align="center" variant="h5">Poll Questions</Typography>
          <Tabs
            classes={ { root : classes.tabsRoot } }
            value={ this.state.tabIndex }
            indicatorColor="primary"
            textColor="primary"
            onChange={ this.handleTabChange }
            aria-label="Answered & unanswered questions">
            <Tab label="Unanswered"/>
            <Tab label="Answered"/>
          </Tabs>
          <TabPanel index={ 0 } value={ this.state.tabIndex }>
            <QuestionList questions={ unanswered }/>
          </TabPanel>
          <TabPanel index={ 1 } value={ this.state.tabIndex }>
            <QuestionList questions={ answered }/>
          </TabPanel>
        </div>
      );
  }
}

QuestionsPage.propTypes = {
  questions : PropTypes.array.isRequired,
  actions : PropTypes.object.isRequired,
  loading : PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    questions : state.questions,
    loading : state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : {
      loadQuestions : bindActionCreators(questionActions.loadQuestions, dispatch),
      deleteQuestion : bindActionCreators(questionActions.deleteQuestion, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionsPage);

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
