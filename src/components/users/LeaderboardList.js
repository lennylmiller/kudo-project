import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { getAnswerCount } from '../../helpers/utils';

const useStyles = makeStyles((theme) => {
  return {
    root : {},
    tableRow : {
      // cursor : 'pointer'
    },
    avatar : {
      height : theme.spacing(9),
      width : theme.spacing(9)
    },
    table : {},
    avatarURL : {}
  };
});

const LeaderboardList = ({ users }) => {
  const classes = useStyles();

  console.log(users);

  return (
    <div className={ classes.root }>
      <TableContainer component={ Paper } square>
        <Table className={ classes.table } aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan="2">Name</TableCell>
              <TableCell>Number Asked</TableCell>
              <TableCell>Number Answered</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { users.map((user) => (
              <TableRow key={ user.id } classes={ { root : classes.tableRow } }>
                <TableCell component="th" scope="user">
                  <Avatar alt={ user.id } className={ classes.avatar } src={ user.avatarURL }/>
                </TableCell>
                <TableCell>{ user.name }</TableCell>
                <TableCell>{ getAnswerCount(user) }</TableCell>
                <TableCell>{ user.questions.length }</TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

LeaderboardList.propTypes = {
  users : PropTypes.array.isRequired,
};

export default LeaderboardList;
