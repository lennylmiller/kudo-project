import React from 'react';
import PropTypes from 'prop-types';
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
    // position: 'relative',
    // left: -20
  }
}));

const QuestionStatistics = ({
                              question,
                              getStatistics,
                              onSave
                            }) => {
  const classes = useStyles();
  const statistics = getStatistics();

  return (
    <Card className={ classes.root }>
      <ThemedContent imageMaps={ imageMaps } questionId={ question.id } getAvatarURL={ getAvatarURL }>
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
