import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Container, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root : {
    marginTop : theme.spacing(15)
  },
  recoverText : {
    display : 'flex',
    justifyContent : 'center'
  }
}));

const RecoverPasswordPage = () => {
  const classes = useStyles();

  return (
    <div className={ classes.root }>
      <Container maxWidth="xs">
        <Card>
          <div className={ classes.recoverText }>
            <Typography variant="h3">ramish</Typography>
            <Typography variant="h3">/</Typography>
            <Typography variant="h3">admin</Typography>
          </div>
          <div className={ classes.recoverText }>
            <Typography variant="h3">julian</Typography>
            <Typography variant="h3">/</Typography>
            <Typography variant="h3">admin</Typography>
          </div>
          <div className={ classes.recoverText }>
            <Typography variant="h3">johndoe</Typography>
            <Typography variant="h3">/</Typography>
            <Typography variant="h3">admin</Typography>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default RecoverPasswordPage;
