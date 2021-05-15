import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Card } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { getAvatarURL } from '../../helpers/utils';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import { history } from '../../helpers';

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
  cardContent : {
    // position : 'relative',
    // maxWidth : 542,
    // left : 250,
    // top : -60,
  },
  title: {
    // position: 'relative',
    // left: -15,
    // paddingBottom: theme.spacing(3)
  },
  cardActions: {
    // display: 'flex',
    // justifyContent: 'space-between'
  },
  orText: {
    // position: 'relative',
    // left: -20
  }
}));

export const imageMaps = {
  '8xf0y6ziyjabvozdd253nd' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/memory-loss.jpg',
  '6ni6ok3ym7mf1p33lnez' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/super-hero-or-super-villain.jpg',
  'am8ehyc8byjqgar0jgpub9' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/telekinetic-or-telepathic.jpg',
  'loxhs1bqm25b708cmbf3g' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/backend-or-front-end-developer.jpg',
  'vthrdm985a262al8qx3do' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/fifty-for-you-five-hundred-for-a-friend.jpg',
  'xj352vofupe1dqz9emx13r' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/javaScript-or-swift.jpg',
  'newUserOne' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/survey-clipart.jpg',
  'newUserTwo' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/index.jpg',
};

console.log('OUT_STATISTICS')

const QuestionStatistics = ({
                              question,
                              getStatistics,
                              onSave
                            }) => {
  let mode = '';
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [expanded, setExpanded] = React.useState(false);

  console.log('IN_STATISTICS')

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const classes = useStyles();

  const gotoQuestions = () => {
    history.push('/questions');
    window.location.reload();
  };


  const statistics = getStatistics();

  return (
    <Card className={ classes.root }>
      <CardActionArea>
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
        <CardContent className={classes.cardContent}>
          <Typography className={classes.title} variant="h4" component="h2">
            Would you rather?
          </Typography>
          <div className={ classes.options }>
            <Typography variant="h5" color="textSecondary" component="p">
              { question?.optionOne?.text }
            </Typography>
            <Typography className={classes.orText} variant="h5" color="textSecondary" component="p">
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
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
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
        {mode === 'answer' && (
          <Button
            size="medium"
            color="primary"
            Save
          >
            Submit
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

QuestionStatistics.propTypes = {
  question : PropTypes.object.isRequired,
  getStatistics : PropTypes.func.isRequired,
  onSave : PropTypes.func
};

export default QuestionStatistics
