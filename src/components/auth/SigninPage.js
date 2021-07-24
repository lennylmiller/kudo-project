import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Form from 'react-validation/build/form';
import { signin } from '../../store/actions/authActions';

const useStyles = makeStyles((theme) => ({
  root:         {
    marginTop: theme.spacing(15)
  },
  paper:        {
    marginTop:     theme.spacing(8),
    display:       'flex',
    flexDirection: 'column',
    alignItems:    'center',
  },
  avatar:       {
    margin:          theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form:         {
    width: '100%', // Fix IE 11 issue.
  },
  submit:       {
    // margin: theme.spacing(3, 0, 2),
    marginTop:    theme.spacing(1),
    marginBottom: theme.spacing(3),
    borderRadius: 5
  },
  loginWrapper: {
    padding:      theme.spacing(2),
    borderRadius: 5
  },
  email:         {
    marginTop: theme.spacing(0.2)
  },
  password:     {
    paddingBottom: theme.spacing(2)
  }
}));

const SigninPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const form = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isSignedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleSignin = (e) => {
    e.preventDefault();
    dispatch(signin(email, password))
      .then(() => {
        history.push('/questions');
      })
      .catch(() => {
        alert('Error while signing in');
      });
  };

  if (isSignedIn) {
    return <Redirect to="/profile"/>;
  }

  return (
    <Container className={classes.root} component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Card className={classes.loginWrapper}>
          <Typography align="center" variant="h5">
            Sign in
          </Typography>
          <Form onSubmit={handleSignin} ref={form}>
            <TextField
              className={classes.email}
              margin="normal"
              required
              fullWidth
              id="email"
              label="User Email"
              name="email"
              autoComplete="email"
              onChange={onChangeEmail}
              autoFocus
            />
            <TextField
              className={classes.password}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={onChangePassword}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/recover-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {'Don\'t have an account? Sign Up'}
                </Link>
              </Grid>
            </Grid>
          </Form>
        </Card>
      </div>
    </Container>
  );
};

export default SigninPage;
