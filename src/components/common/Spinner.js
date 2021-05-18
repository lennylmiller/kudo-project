import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root : {
    marginTop : 60,
    opacity : 0.4,
  },
  loader : {}
}));
const Spinner = () => {
  const classes = useStyles();
  return <CircularProgress
    classes={ { root : classes.root } }
    className={ classes.loader }
    color="primary"
    size={ 110 }
    thickness={ 2.2 }
  />;
};

export default Spinner;
