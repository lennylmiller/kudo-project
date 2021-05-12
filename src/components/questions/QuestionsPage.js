import React from "react";
import { connect } from "react-redux";
import * as questionActions from "../../store/actions/questionActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import QuestionList from "./QuestionList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class QuestionsPage extends React.Component {
  state = {
    redirectToAddQuestionPage: false
  };

  componentDidMount() {
    const { questions, actions } = this.props;

    if (questions.length === 0) {
      actions.loadQuestions().catch(error => {
        alert("Loading questions failed" + error);
      });
    }
  }

  handleDeleteQuestion = async question => {
    toast.success("Question deleted");
    try {
      await this.props.actions.deleteQuestion(question);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddQuestionPage && <Redirect to="/question" />}
        <h2>Questions</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-question"
              onClick={() => this.setState({ redirectToAddQuestionPage: true })}
            >
              Add Question
            </button>

            <QuestionList
              onDeleteClick={this.handleDeleteQuestion}
              questions={this.props.questions}
            />
          </>
        )}
      </>
    );
  }
}

QuestionsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  questions: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};
// TODO: This is the place to change when I get real questions
function mapStateToProps(state) {
  return {
    questions:
      state.authors.length === 0
        ? []
        : state.courses.map(question => {
          return {
            ...question,
            authorName: state.authors.find(a => a.id === question.authorId).name
          };
        }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadQuestions: bindActionCreators(questionActions.loadQuestions, dispatch),
      deleteQuestion: bindActionCreators(questionActions.deleteQuestion, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionsPage);
