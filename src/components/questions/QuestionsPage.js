import React from 'react';
import { connect } from 'react-redux';
import * as questionActions from '../../store/actions/questionActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import QuestionList from './QuestionList';
import { Redirect } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { Typography } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class QuestionsPage extends React.Component {
  state = {
    redirectToAddQuestionPage : false
  };

  componentDidMount() {
    const { questions, actions } = this.props;

    if (questions.length === 0) {
      actions.loadQuestions().catch(error => {
        alert('Loading questions failed' + error);
      });
    }
  }

  render() {
    return (
      <div className={ classes.root }>
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
      // <>
      //   { this.state.redirectToAddQuestionPage && <Redirect to="/questions/add"/> }
      //   <h2>Questions</h2>
      //   { this.props.loading ? (
      //     <Spinner/>
      //   ) : (
      //     <>
      //       <button
      //         style={ { marginBottom : 20 } }
      //         className="btn btn-primary add-question"
      //         onClick={ () => this.setState({ redirectToAddQuestionPage : true }) }
      //       >
      //         Add Question
      //       </button>
      //
      //       <QuestionList
      //         onDeleteClick={ this.handleDeleteQuestion }
      //         questions={ this.props.questions }
      //       />
      //     </>
      //   ) }
      // </>
    );
  }
}

QuestionsPage.propTypes = {
  questions : PropTypes.array.isRequired,
  actions : PropTypes.object.isRequired,
  loading : PropTypes.bool.isRequired
};

// TODO: This is the place to change when I get real questions
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
