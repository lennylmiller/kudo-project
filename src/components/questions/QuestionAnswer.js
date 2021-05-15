import React from 'react';
import PropTypes from 'prop-types';
import { Card, makeStyles } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { getAvatarURL, imageMaps } from '../../helpers/utils';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import { history } from '../../helpers';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles((theme) => ({
  root : {
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
  }
}));


let answerEvent;

const QuestionAnswer = ({
                          question,
                          getStatistics,
                          onChange,
                          onSave,
                          onAnswer
                        }) => {

  const [selectedOption, setSelectedOption] = React.useState(null);
  const [expanded, setExpanded] = React.useState(false);

  const classes = useStyles();

  const gotoQuestions = () => {
    history.push('/questions');
    window.location.reload();
  };

  const statistics = getStatistics();

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Card className={ classes.root }>
      <CardMedia
        className={ classes.media }
        image={ imageMaps[question.id] }
        title="Contemplative Reptile"
      />
      <Avatar
        className={ classes.avatar }
        classes={ { root : classes.avatarRoot } }
        src={ getAvatarURL(question.author) }
      />
      <CardContent className={ classes.cardContent }>
        <Typography className={ classes.title } gutterBottom variant="h4" component="h2">
          Would you rather?
        </Typography>
        <div className={ classes.options }>
          <FormControl className={ classes.formControl } fullWidth={ true } component="fieldset">
            <RadioGroup className={ classes.radioGroup } aria-label="answer" name="answer" value={ selectedOption }
                        onChange={ handleChange }>
              <FormControlLabel
                classes={ { label : classes.optionLabel } }
                value="optionOne"
                label={ question?.optionOne?.text }
                control={ <Radio/> }
              />
              <Typography classes={ { h6 : classes.orPart } } variant="h6" align="center">OR</Typography>
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
          size="small"
          color="primary"
          onClick={ () => {
            onAnswer({
              preventDefault : () => '',
              target : {
                name : 'answer',
                value : selectedOption,
              }
            });
          } }
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

QuestionAnswer.propTypes = {
  question : PropTypes.object.isRequired,
  getStatistics : PropTypes.func.isRequired,
  onChange : PropTypes.func.isRequired,
  onSave : PropTypes.func.isRequired,
  onAnswer : PropTypes.func.isRequired
};

export default QuestionAnswer;
