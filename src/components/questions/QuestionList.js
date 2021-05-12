import React from 'react';
import PropTypes from 'prop-types';
import { history } from '../../helpers/history';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => {
  return {
    root : {},
    tableRow : {
      cursor : 'pointer'
    },
    avatar : {
      height : theme.spacing(9),
      width : theme.spacing(9)
    },
    table: {

    }
  };
});

const QuestionList = ({ questions }) => {
  const classes = useStyles();

  const getAvatarURL = (author) => {
    return `https://kudo-assignment.s3-us-west-2.amazonaws.com/${ author }.jpg`;
  };

  return (
    <div className={ classes.root }>
      <TableContainer component={ Paper } square>
        <Table className={ classes.table } aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Author</TableCell>
              <TableCell>First Option</TableCell>
              <TableCell>OR</TableCell>
              <TableCell>Second Option</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { questions.map((question) => (
              <TableRow
                key={ question.id }
                hover={ true }
                onClick={ () => {
                  history.push(`/questions/${ question.id }`);
                  window.location.reload();
                } }
                classes={ { root : classes.tableRow } }>
                <TableCell component="th" scope="question">
                  <Avatar alt={ question.author } className={ classes.avatar } src={ getAvatarURL(question.author) }/>
                </TableCell>
                <TableCell>{ question.optionOne.text }</TableCell>
                <TableCell></TableCell>
                <TableCell>{ question.optionTwo.text }</TableCell>
                <TableCell>{ question.timestamp }</TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

QuestionList.propTypes = {
  questions : PropTypes.array.isRequired,
};

export default QuestionList;
