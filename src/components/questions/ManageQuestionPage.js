import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { loadQuestions, saveQuestion } from '../../store/actions/questionActions';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';
import QuestionNew from './QuestionNew';
import { Redirect } from 'react-router-dom';
import QuestionAnswer from './QuestionAnswer';
import QuestionStatistics from './QuestionStatistics';
import { setMode } from '../../store/actions/questionActions';
import { getVotesWithoutCurrentUser, newQuestion, currency } from '../../helpers/utils';

const ManageQuestionPage = ({
                              questions,
                              loadQuestions,
                              saveQuestion,
                              history,
                              ...props
                            }) => {
  const [question, setQuestion] = useState({ ...props.question });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const { user : currentUser, isloggedin } = useSelector((state) => state.auth);

  if (props.question === null) {
    history.push('/questions');
    window.location.reload();
  }



  let mode = '';

  useEffect(() => {
    if (questions.length === 0) {
      loadQuestions().catch(error => {
        alert('Loading questions failed' + error);
      });
    } else {
      setQuestion({ ...props.question });
    }
  }, [props.question]);

  const handleChange = (event) => {
    let changes = {};
    const { name, value } = event.target;

    if (name === 'answer') {
      changes = getVotesWithoutCurrentUser(question, currentUser);
      changes[value].votes.push(currentUser.id);
    } else if (name === 'new') {
      //TODO: transform as needed
    }
    setQuestion(prevQuestion => {
      return ({
        ...prevQuestion,
        ...changes
      });
    });
  };

  const formIsValid = () => {
    // for a new question, text is required for each
    const { optionOne, optionTwo } = question;
    if (!optionOne) errors.optionOne = 'optionOne is required';
    if (!optionTwo) errors.optionTwo = 'optionTwo is required';
    if (!optionOne.text && optionOne.text.length > 0) errors.optionOne = 'text must exist for optionOne';
    if (!optionTwo.text && optionTwo.text.length > 0) errors.optionOne = 'text must exist for optionTwo';

    setErrors(errors);

    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  };

  const handleAnswer = (event) => {
    const { name, value } = event.target;
    event.preventDefault();
    let options = getVotesWithoutCurrentUser(question, currentUser);
    options[value].votes.push(currentUser.id);
    const changes = {
      ...question,
      ...options
    };

    if (!formIsValid()) return;
    setSaving(true);
    saveQuestion(changes)
      .then(() => {
        toast.success('Question saved.');
        history.push('/questions');
        window.location.reload()
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave : error.message });
      });
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveQuestion(question)
      .then(() => {
        toast.success('Question saved.');
        history.push('/questions');
        window.location.reload()
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave : error.message });
      });
  };

  const isAnswered = () => {
    const answeredOne = question?.optionOne?.votes.includes(currentUser.id);
    const answeredTwo = question?.optionTwo?.votes.includes(currentUser.id);

    return answeredOne || answeredTwo;
  };

  let Component = QuestionNew;


  if (question.id !== null) {
    if (isAnswered()) {
      if (mode === '') {
        setMode('statistics');
        mode = { mode };
      }
      Component = QuestionStatistics;
    } else {
      if (mode === '') {
        setMode('answer');
      }
      Component = QuestionAnswer;
    }
  }
  const getStatistics = () => {
    const oneCount = question.optionOne.votes.length + 1;
    const twoCount = question.optionTwo.votes.length + 1;

    const denominator = oneCount + twoCount;

    let onePercent = 0;
    let twoPercent = 0;

    if (denominator > 0) {
      onePercent = (oneCount / denominator) * 100;
      twoPercent = (twoCount / denominator) * 100;
    }

    return {
      optionOne : `${ oneCount } voted which is ${ currency(onePercent) }%`,
      optionTwo : `${ twoCount } voted which is ${ currency(twoPercent) }%`
    };
  };

  {
    question === null && (
      <Redirect to="/questions"/>
    );
  }

  return (question.id === null || questions.length === 0) ? (
    <Spinner/>
  ) : (
    <Component
      question={ question }
      errors={ errors }
      onChange={ handleChange }
      onSave={ handleSave }
      onAnswer={ handleAnswer }
      saving={ saving }
      getStatistics={ getStatistics }
    />
  );
};

ManageQuestionPage.propTypes = {
  question : PropTypes.object.isRequired,
  questions : PropTypes.array.isRequired,
  loadQuestions : PropTypes.func.isRequired,
  saveQuestion : PropTypes.func.isRequired,
  history : PropTypes.object.isRequired
};

export function getQuestionById(questions, id) {
  return questions.find(question => question.id === id) || null;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const question =
    id && state.questions.length > 0
      ? getQuestionById(state.questions, id)
      : newQuestion;
  return {
    question,
    questions : state.questions
  };
}

const mapDispatchToProps = {
  loadQuestions,
  saveQuestion
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageQuestionPage);
