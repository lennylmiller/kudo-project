import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core';
import { Card } from '@material-ui/core';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import { shortDateTime } from '../../helpers/timeFormats';

const useStyles = makeStyles((theme) => ({
  unansweredRoot : {
    marginTop : 80,
  },
  card : {
    maxWidth : 350,
    margin : 'auto'
  },
  content : {},
  body : {
    marginTop : 20
  },
  tableRow : {
    cursor : 'pointer'
  },
  bullet : {
    display : 'inline-blockk',
    margin : '0 2px',
    transform : 'scale(0.8)',
  },
  title : {
    fontSize : 11,
  },
  pos : {
    marginBottom : 12,
  },
  toot : {
    display : 'flex',
    '& > *' : {
      margin : theme.spacing(1),
    },
  },
  small : {
    width : theme.spacing(3),
    height : theme.spacing(3),
  },
  large : {
    width : theme.spacing(7),
    height : theme.spacing(7),
  },
  header : {
    display : 'flex',
    justifyContent : 'space-between'
  },
  headerLeft : {},
  headerRight : {},
  avatar : {
    width : theme.spacing(25),
    height : theme.spacing(25),
  },
  author : {
    marginBottom : -5
  },
  optionLabel : {
    fontSize : theme.spacing(2.7),
    fontWeight : 500,
  },
  radioGroup : {
    marginTop : theme.spacing(3),
    marginBottom : theme.spacing(1)
  },
  orPart : {
    margin : theme.spacing(2)
  },
  hideUnanswered : {
    display : 'none'
  },
  hideAnswered : {
    display : 'none'
  },
  progress : {
    position : 'absolute',
    marginTop : 85,
    left : 115,
    top : 90,
    opacity : 0.5

  }
}));

const QuestionAnswer = ({
  question,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {

  const [selectedOption, setSelectedOption] = React.useState(null);

  const classes = useStyles();

  const gotoQuestions = () => {
    history.push('/questions');
    window.location.reload();
  };

  const getAvatarURL = (author) => {
    return `https://kudo-assignment.s3-us-west-2.amazonaws.com/${ author }.jpg`;
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // const updateContent = () => {
  //   dispatch(updateQuestion(currentQuestion.id, currentQuestion))
  //     .then(response => {
  //       setMessage('The question was updated successfully!');
  //     })
  //     .catch(e => {
  //       console.error(e);
  //     });
  // };

  return (
    <div className={classes.unansweredRoot}>
      <Card className={ classes.card }>
        <CardContent className={ classes.content }>
          <div className={ classes.header }>
            <div className={ classes.headerLeft }>
              <Typography variant="h5" color="textSecondary" className={ classes.author } gutterBottom>
                { question.author }
              </Typography>
              <Typography variant="caption" className={ classes.title } color="textSecondary" gutterBottom>
                { shortDateTime(question.timestamp) }
              </Typography>
            </div>
            <div className={ classes.headerRight }>
              <Avatar alt={ question.author } src={ getAvatarURL(question.author) }
                      classes={ { root : classes.avatar } }/>
            </div>
          </div>
          <div className={ classes.body }>
            <Typography variant="h4" component="h2">
              Would you rather?
            </Typography>
            <FormControl classes={ classes.formControl } fullWidth={ true } component="fieldset">
              <RadioGroup className={ classes.radioGroup } aria-label="answer" name="answer" value={ selectedOption }
                          onChange={ handleChange }>
                <FormControlLabel
                  classes={ { label : classes.optionLabel } }
                  value="optionOne"
                  label={ question?.optionOne?.text }
                  control={ <Radio/> }
                />
                <Typography classes={ { h6 : classes.orPart } } variant="h6" align="center">Or</Typography>
                <FormControlLabel
                  classes={ { label : classes.optionLabel } }
                  value="optionTwo"
                  label={ question?.optionTwo?.text }
                  control={ <Radio/> }
                />
              </RadioGroup>
            </FormControl>
          </div>
        </CardContent>
        <CardActions>
          <Button
            size="medium"
            onClick={ gotoQuestions }>
            Close
          </Button>
          <Button
            size="medium"
            color="primary"
            onClick={ (e) => {
              onSave(e);
            } }>
            Save
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

QuestionAnswer.propTypes = {
  question: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default QuestionAnswer;
