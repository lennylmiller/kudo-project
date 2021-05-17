import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
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

import { login } from '../../store/actions/authActions';

const useStyles = makeStyles((theme) => ({
  root : {
    marginTop : theme.spacing(15)
  },
  paper : {
    marginTop : theme.spacing(8),
    display : 'flex',
    flexDirection : 'column',
    alignItems : 'center',
  },
  avatar : {
    margin : theme.spacing(1),
    backgroundColor : theme.palette.secondary.main,
  },
  form : {
    width : '100%', // Fix IE 11 issue.
  },
  submit : {
    // margin: theme.spacing(3, 0, 2),
    marginTop : theme.spacing(1),
    marginBottom : theme.spacing(3),
    borderRadius : 5
  },
  loginWrapper : {
    padding : theme.spacing(2),
    borderRadius : 5
  },
  username : {
    marginTop : theme.spacing(0.2)
  },
  password : {
    paddingBottom : theme.spacing(2)
  }
}));

const LoginPage = (props) => {
  const classes = useStyles();

  const form = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(username, password))
      .then(() => {
        props.history.push('/questions');
        // window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Redirect to="/profile"/>;
  }

  return (
    <Container className={ classes.root } component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={ classes.paper }>
        <Card className={ classes.loginWrapper }>
          <Typography align="center" variant="h5">
            Sign in
          </Typography>
          <Form onSubmit={ handleLogin } ref={ form }>
            <TextField
              className={ classes.username }
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              onChange={ onChangeUsername }
              autoFocus
            />
            <TextField
              className={ classes.password }
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={ onChangePassword }
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={ classes.submit }
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/recover-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  { 'Don\'t have an account? Sign Up' }
                </Link>
              </Grid>
            </Grid>
          </Form>
        </Card>
      </div>
    </Container>
  );
};

export default withRouter(LoginPage);
