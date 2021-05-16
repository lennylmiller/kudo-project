import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Card } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { getAvatarURL } from '../../helpers/utils';
import Button from '@material-ui/core/Button';
import { history } from '../../helpers';
import { imageMaps } from '../../helpers/utils';
import ThemedContent from './ThemedContent';
import CheckIcon from '@material-ui/icons/Check';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root : {
    marginTop : theme.spacing(5)
  },
  options : {
    display : 'flex',
    justifyContent : 'space-between',
    paddingBottom : theme.spacing(2)
  },
  cardActions : {},
  orText : {
    marginRight : theme.spacing(3)
  },
  optionSelected : {
    position : 'relative',
    height : 35,
    width : 35,
    top : 15,
  },
  whichOnePicked : {
    display : 'flex',
    justifyContent : 'space-between'
  },
  invisible : {
    visibility : 'hidden'
  },
  isLeft : {
    right : 0,
    left : -25
  },
  isRight : {
    right : -25,
    left : 0
  }

}));

const QuestionStatistics = ({
                              question,
                              getStatistics,
                              onSave
                            }) => {
  const classes = useStyles();
  const statistics = getStatistics();
  const { user : currentUser, isloggedin } = useSelector((state) => state.auth);

  console.log(getAvatarURL(currentUser.id));
  const whichOption = (userId) => {
    if (question.optionOne.votes.includes(userId)) {
      return 'optionOne';
    }

    return 'optionTwo';
    // const second = question.optionTwo.votes.includes(userId)

  };
  const ifOption = (option) => {
    return !question[`option${ option }`].votes.includes(currentUser.id);
  };
  return (
    <Card className={ classes.root }>
      <ThemedContent imageMaps={ imageMaps } questionId={ question.id } getAvatarURL={ getAvatarURL }>
        <div className={ classes.whichOnePicked }>
          <CheckIcon className={ clsx(classes.optionSelected, {
            [classes.invisible] : ifOption('One'),
            [classes.isLeft] : true
          }) }/>
          <CheckIcon className={ clsx(classes.optionSelected, {
            [classes.invisible] : ifOption('Two'),
            [classes.isRight] : true
          }) }/>
        </div>
        <div className={ classes.options }>
          <Typography variant="h5" color="textSecondary" component="p">
            { question?.optionOne?.text }
          </Typography>
          <Typography className={ classes.orText } variant="h5" color="textSecondary" component="p">
            OR
          </Typography>
          <Typography variant="h5" color="textSecondary" component="p">
            { question?.optionTwo?.text }
          </Typography>
        </div>
        <div className={ classes.options }>
          <Typography variant="body2" color="textSecondary" component="p">
            { statistics.optionOne }
          </Typography>
          <Typography variant="h5" color="textSecondary" component="p">

          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            { statistics.optionTwo }
          </Typography>
        </div>
      </ThemedContent>
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
      </CardActions>
    </Card>
  );
};

QuestionStatistics.propTypes = {
  question : PropTypes.object.isRequired,
  getStatistics : PropTypes.func.isRequired,
  onSave : PropTypes.func
};

export default QuestionStatistics;
