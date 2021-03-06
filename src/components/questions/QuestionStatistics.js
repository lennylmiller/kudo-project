import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { Card, makeStyles } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { getAvatarURL, imageMaps } from '../../helpers/utils';
import ThemedContent from './ThemedContent';
import CheckIcon from '@material-ui/icons/Check';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';

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
                            }) => {
  const classes = useStyles();
  const history = useHistory();
  const statistics = getStatistics();
  const { user : currentUser } = useSelector((state) => state.auth);
  const ifOption = (option) => {
    return !question[`option${ option }`].votes.includes(currentUser.id);
  };

  return (
    <Container maxWidth="md">
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
            } }
          >
            <ArrowBackIcon/>
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

QuestionStatistics.propTypes = {
  question : PropTypes.object.isRequired,
  getStatistics : PropTypes.func.isRequired
};

export default QuestionStatistics;
