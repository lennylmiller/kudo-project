import React from 'react';
import { connect } from 'react-redux';
import * as userActions from '../../store/actions/userActions';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Typography } from '@material-ui/core';
import LeaderboardList from './LeaderboardList';

const styles = theme => ({
  root : {
    marginTop : 80
  },
});

@withStyles(styles, { withTheme : true })
class LeaderboardPage extends React.Component {

  componentDidMount() {
    const { users, actions } = this.props;
    if (users.length === 0) {
      actions.loadUsers().catch(error => {
        alert('Loading users failed' + error);
      });
    }
  }


  render() {
    const users = this.props.users;
    const { classes } = this.props;

    return (
      <div className={ classes.root }>
        <Typography align="center" variant="h5">Leader Board</Typography>
        <div className={ classes.root }>
         <LeaderboardList  users={users}/>
        </div>
      </div>
    );
  }
}

LeaderboardPage.propTypes = {
  users : PropTypes.array.isRequired,
  actions : PropTypes.object.isRequired,
  loading : PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    users : state.users,
    loading : state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : {
      loadUsers : bindActionCreators(userActions.loadUsers, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaderboardPage);
