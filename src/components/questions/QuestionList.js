import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const QuestionList = ({ questions, onDeleteClick }) => (
  <table className="table">
    <thead>
    <tr>
      <th />
      <th>Title</th>
      <th>Author</th>
      <th>Category</th>
      <th />
    </tr>
    </thead>
    <tbody>
    {questions.map(question => {
      return (
        <tr key={question.id}>
          <td>
            <a
              className="btn btn-light"
              href={"http://pluralsight.com/questions/" + question.slug}
            >
              Watch
            </a>
          </td>
          <td>
            <Link to={"/question/" + question.slug}>{question.title}</Link>
          </td>
          <td>{question.authorName}</td>
          <td>{question.category}</td>
          <td>
            <button
              className="btn btn-outline-danger"
              onClick={() => onDeleteClick(question)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    })}
    </tbody>
  </table>
);

QuestionList.propTypes = {
  questions: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default QuestionList;
