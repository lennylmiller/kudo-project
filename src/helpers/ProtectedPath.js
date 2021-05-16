import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const ProtectedPath = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={(props) => {
      const user = localStorage.getItem('user');
      return user ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{pathname: '/login', state: {from: props.location}}}
        />
      )
    }}
  />
);

export default ProtectedPath
