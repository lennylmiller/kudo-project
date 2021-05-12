import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadQuestions, saveQuestion } from '../../store/actions/questionActions';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';
import QuestionAnswer from './QuestionAnswer';

const newQuestion = {
  id : null,
  author : '',
  timestamp : 0,
  questionTwo : {
    votes : [],
    text : ''
  },
  optionOne : {
    votes : [],
    text : ''
  },

};

export function ManageQuestionPage({
                                     questions,
                                     loadQuestions,
                                     saveQuestion,
                                     history,
                                     ...props
                                   }) {
  const [question, setQuestion] = useState({ ...props.question });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    if (questions.length === 0) {
      loadQuestions().catch(error => {
        alert('Loading questions failed' + error);
      });
    } else {
      setQuestion({ ...props.question });
    }
  }, [props.question]);

  function transformOption(name, value, prevQuestion) {
    return {
      text : value,
      votes : []
    };
  }

  function handleChange(event) {
    const { name, value } = event.target;
    console.log('name,value', { name, value });
    setQuestion(prevQuestion => {
      return ({
        ...prevQuestion,
        [name] : name.startsWith('option')
          ? transformOption(name, value, prevQuestion)
          : value
      });
    });
  }

  function formIsValid() {
    return true;
    // const { title, category } = question;
    // const errors = {};
    //
    // if (!title) errors.title = "Title is required.";
    // if (!category) errors.category = "Category is required";
    //
    // setErrors(errors);
    // // Form is valid if the errors object still has no properties
    // return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    console.log('handleSave', event, question);
    saveQuestion(question)
      .then(() => {
        toast.success('Question saved.');
        history.push('/questions');
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave : error.message });
      });
  }

  console.log('Manage-questions', question);
  return (question.id === null || questions.length === 0) ? (
    <Spinner/>
  ) : (
    <QuestionAnswer
      question={ question }
      errors={ errors }
      onChange={ handleChange }
      onSave={ handleSave }
      saving={ saving }
    />
  );
}

ManageQuestionPage.propTypes = {
  question : PropTypes.object.isRequired,
  questions : PropTypes.array.isRequired,
  loadQuestions : PropTypes.func.isRequired,
  saveQuestion : PropTypes.func.isRequired,
  history : PropTypes.object.isRequired
};

export function getQuestionById(questions, id) {
  const question = questions.find(question => question.id === id) || null;
  return question;
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
