import axios from 'axios';

const API_URL = '/api';

const signup = (name, email, password) => {
  return axios.post(API_URL + '/signup', {
    name,
    email,
    password,
  });
};

const signin = (email, password) => {
  return axios
    .post(API_URL + '/signin', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const signout = () => {
  localStorage.removeItem('user');
};

export default {
  signup : signup,
  signin : signin,
  signout : signout,
};
