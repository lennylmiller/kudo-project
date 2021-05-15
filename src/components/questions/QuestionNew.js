import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Card } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { v4 as uuidv4 } from 'uuid';
import { imageMaps } from '../../helpers/utils';
import { history } from '../../helpers/';
import { toast } from 'react-toastify';
import { newQuestion, setRandomImageURL, getAvatarURL } from '../../helpers/utils';
import { saveQuestion } from '../../store/actions/questionActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';

const useStyles = makeStyles((theme) => ({
  root : {
    margin : theme.spacing(1),
    marginTop : theme.spacing(5)
  },
  media : {
    height : 0,
    paddingTop : '56.25%', // 16:9
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
  options : {
    display : 'flex',
    justifyContent : 'space-between',
    paddingBottom : theme.spacing(2)
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
    // position : 'relative',
    // maxWidth : 542,
    // left : 250,
    // top : -60,
  },
  title : {
    // position: 'relative',
    // left: -15,
    // paddingBottom: theme.spacing(3)

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
}));

function QuestionNew({ saveQuestion }) {
  const classes = useStyles();
  const currentUser = {
    id : 'rashmi'
  };
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [question, setQuestion] = useState(newQuestion);

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
    const newId = uuidv4();
    setRandomImageURL(newId);
    const changes = {
      ...question,
      id : uuidv4(),
      timestamp : (new Date()).getTime(),
      author : currentUser.id
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

  console.log('here', question);
  return saving
    ? (<Spinner/>)
    : (<Card className={ classes.root }>
        <CardMedia
          className={ classes.media }
          image={ imageMaps['poll'] }
        />
        <Avatar
          className={ classes.avatar }
          classes={ { root : classes.avatarRoot } }
          src={ getAvatarURL(currentUser.id) }
        />
        <CardContent className={ classes.cardContent }>
          <Typography className={ classes.title } variant="h4" component="h2">
            Would you rather?
          </Typography>
          <div className={ classes.options }>
            <TextField
              // error
              id="optionOne"
              label="Option One"
              fullWidth
              onBlur={ handleChange }
              name="optionOne"
              // defaultValue="Hello World"
              // helperText="Incorrect entry."
            />
            <Typography className={ classes.orText } variant="h5" color="textSecondary" component="p">
              OR
            </Typography>
            <TextField
              // error
              id="optionTwo"
              label="Option Two"
              fullWidth
              onBlur={ handleChange }
              name="optionTwo"
              // defaultValue="Hello World"
              // helperText="Incorrect entry."
            />
          </div>
        </CardContent>
        <CardActions className={ classes.cardActions }>
          <Button
            size="small"
            color="primary"
            onClick={ () => {
              history.push('/questions');
              window.location.reload();
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
    );
}

QuestionNew.propTypes = {
  saveQuestion : PropTypes.func.isRequired
};

const mapDispatchToProps = {
  saveQuestion
};

export default connect(null, mapDispatchToProps)(QuestionNew);

