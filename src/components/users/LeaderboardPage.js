import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Typography } from '@material-ui/core';
import LeaderboardList from './LeaderboardList';
import { loadUsersV2 } from '../../store/actions/userActions';

const useStyles = makeStyles(() => ({
  root : {
    marginTop : 80
  },
}));

const LeaderboardPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(async() => {
    try {
      if (users.length === 0) {
        await loadUsersV2(dispatch);
      }
    } catch(error) {
      alert(`Loading users failed ${ error }`);
    }
  });

  return (
    <div className={ classes.root }>
      <Typography align="center" variant="h5">Leader Board</Typography>
      <div className={ classes.root }>
        <LeaderboardList users={ users }/>
      </div>
    </div>
  );
};

export default LeaderboardPage;
