import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getQuestionImageUrl } from '../../helpers/utils';

const useStyles = makeStyles((theme) => ({
    root : {
      margin : theme.spacing(1),
      marginTop : theme.spacing(5)
    },
    media : {
      height : 0,
      paddingTop : '67.25%', // 16:9
    },
    cardContent : {
      position : 'relative',
      top : -25,
      marginLeft : theme.spacing(7),
      marginRight : theme.spacing(7)
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
  }
));

const ThemedContent = ({ questionId, children, getAvatarURL, imageMaps }) => {
  const classes = useStyles();
  const { user : currentUser, isloggedin } = useSelector((state) => state.auth);

  const resolvedImage = imageMaps[questionId]
    ? imageMaps[questionId]
    : getQuestionImageUrl();

  return (<div className={ classes.root }>
      <CardMedia
        className={ classes.media }
        image={resolvedImage}
      />
      <div className={ classes.avatarTitle }>
        <Avatar
          className={ classes.avatar }
          classes={ { root : classes.avatarRoot } }
          src={ getAvatarURL(currentUser.id) }
        />
        <Typography className={ classes.title } variant="h2">
          Would You Rather?
        </Typography>
      </div>
      <CardContent className={ classes.cardContent }>
        { children }
      </CardContent>
    </div>
  );
};

ThemedContent.propTypes = {
  children : PropTypes.any,
  questionId : PropTypes.string.isRequired,
  getAvatarURL : PropTypes.func.isRequired,
  imageMaps : PropTypes.object.isRequired
};


export default ThemedContent;

