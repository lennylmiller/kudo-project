import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Card } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { forceReload, imageMaps } from '../../helpers/utils';
import { history } from '../../helpers/';
import { toast } from 'react-toastify';
import { newQuestion, getQuestionId, getAvatarURL } from '../../helpers/utils';
import { saveQuestion } from '../../store/actions/questionActions';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ThemedContent from './ThemedContent';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root : {
    margin : theme.spacing(1),
    marginTop : theme.spacing(5)
  },
  media : {
    height : 0,
    paddingTop : '56.25%', // 16:9
  },
  options : {
    display : 'flex',
    justifyContent : 'space-between',
    // paddingBottom : theme.spacing(2)
  },
  formControl : {},
  radioGroup : {
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'space-between',
  },
  optionLabel : {
    fontSize : 20
  },
  cardContent : {
    position : 'relative',
    top : -25,
    marginLeft : theme.spacing(7),
    marginRight : theme.spacing(7)
  },
  cardActions : {
    display : 'flex',
    justifyContent : 'space-between'
  },
  orText : {
    paddingLeft : theme.spacing(3),
    paddingRight : theme.spacing(3),
    position : 'relative',
    top : 18,
    fontWeight : 500
  },
  avatarTitle : {
    display : 'flex',
    justifyContent : 'space-between',
    alignItems : 'center'


  },
  title : {
    paddingRight : theme.spacing(11)
  },
  avatar : {
    height : theme.spacing(20),
    width : theme.spacing(20)
  },
  avatarRoot : {
    position : 'relative',
    top : -37,
    left : 15,
    border : `3px solid ${ theme.palette.info.light } `
  },
}));

function QuestionNew({ saveQuestion }) {
  const classes = useStyles();
  const { user : currentUser, isloggedin } = useSelector((state) => state.auth);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [question, setQuestion] = useState(newQuestion);
  const [questionId, setQuestionId] = useState(getQuestionId());

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    const changedQuestion = {
      ...question
    };

    changedQuestion[name].text = value;

    setQuestion(prevQuestion => {
      return ({
        ...prevQuestion,
        ...changedQuestion
      });
    });
  };

  const handleSave = (event) => {
    const { name, value } = event.target;
    event.preventDefault();
    const changes = {
      ...question,
      id : questionId,
      timestamp : (new Date()).getTime(),
      author : currentUser.id
    };

    if (!formIsValid()) return;
    setSaving(true);
    saveQuestion(changes)
      .then(() => {
        toast.success('Question saved.');
        history.push('/questions');
        forceReload();
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave : error.message });
      });
  };

  return saving
    ? (<Spinner/>)
  : (<Container maxWidth="md">
        <Card className={ classes.root }>
          <ThemedContent
            imageMaps={ imageMaps }
            questionId={ questionId }
            getAvatarURL={ getAvatarURL }>
            <div className={ classes.options }>
              <TextField
                id="optionOne"
                label="Option One"
                fullWidth
                onBlur={ handleChange }
                name="optionOne"
              />
              <Typography
                className={ classes.orText }
                variant="h5"
                color="textSecondary"
                component="p">
                OR
              </Typography>
              <TextField
                id="optionTwo"
                label="Option Two"
                fullWidth
                onBlur={ handleChange }
                name="optionTwo"
              />
            </div>
          </ThemedContent>
          <CardActions className={ classes.cardActions }>
            <Button
              size="small"
              color="primary"
              onClick={ () => {
                history.push('/questions');
                forceReload();
              } }
            >
              <ArrowBackIcon/>
            </Button>
            <Button
              size="medium"
              color="primary"
              onClick={ (e) => {
                handleSave(e);
              } }
            >
              Submit
            </Button>
          </CardActions>
        </Card>
      </Container>
    );
}

QuestionNew.propTypes = {
  saveQuestion : PropTypes.func.isRequired
};

const mapDispatchToProps = {
  saveQuestion
};

export default connect(null, mapDispatchToProps)(QuestionNew);

