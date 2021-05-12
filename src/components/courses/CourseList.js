import React from 'react';
import PropTypes from 'prop-types';
import { history } from '../../helpers/history';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
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
    }
  };
});

const CourseList = ({ courses, onDeleteClick }) => {
  const classes = useStyles();

  return (
    <div className={ classes.root }>
      <TableContainer component={ Paper } square>
        <Table className={ classes.table } aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Category</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { courses.map((course) => (
              <TableRow
                key={ course.id }
                hover={ true }
                onClick={ () => {
                  history.push(`/course/${ course.slug }`);
                  window.location.reload();
                } }
                classes={ { root : classes.tableRow } }>
                <TableCell>{ course.title }</TableCell>
                <TableCell>{ course.authorName }</TableCell>
                <TableCell>{ course.category }</TableCell>
                <TableCell><Button onClick={() => onDeleteClick(course)} variant="outlined">Delete</Button> </TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

CourseList.propTypes = {
  courses : PropTypes.array.isRequired,
  onDeleteClick : PropTypes.func.isRequired
};

export default CourseList;
