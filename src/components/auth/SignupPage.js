import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Form from 'react-validation/build/form';
import { signup } from '../../store/actions/authActions';

const useStyles = makeStyles((theme) => ({
  root:           {
    marginTop: theme.spacing(15)
  },
  paper:          {
    marginTop:     theme.spacing(8),
    display:       'flex',
    flexDirection: 'column',
    alignItems:    'center',
  },
  avatar:         {
    margin:          theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form:           {
    width: '100%', // Fix IE 11 issue.
  },
  submit:         {
    marginTop:    theme.spacing(1),
    marginBottom: theme.spacing(3),
    borderRadius: 5
  },
  contentWrapper: {
    padding:      theme.spacing(2),
    borderRadius: 5
  },
  name:           {
    marginTop:    theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  email:          {
    marginTop: theme.spacing(1)
  },
  password:       {
    paddingBottom: theme.spacing(2)
  }
}));

const SignupPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const form = useRef();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isSignedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signup(name, email, password))
      .then(() => {
        history.push('/');
      })
      .catch(() => {
        alert('Error while signing up');
      });
  };

  if (isSignedIn) {
    return <Redirect to="/profile"/>;
  }

  return (
    <Container className={classes.root} component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Card className={classes.contentWrapper}>
          <Typography align="center" variant="h5">
            Sign Up
          </Typography>
          <Form onSubmit={handleSignup} ref={form}>
            <TextField
              className={classes.name}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              onChange={onChangeName}
              autoFocus
            />
            <TextField
              className={classes.email}
              margin="normal"
              required
              fullWidth
              id="email"
              label="email"
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
              className={classes.submit}>
              Submit
            </Button>
          </Form>
        </Card>
      </div>
    </Container>
  );
};

export default SignupPage;
