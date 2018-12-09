import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { authListener } from '../../actions/authAction';
import { Login } from '../Export';
import { Loader } from 'semantic-ui-react';

class UserRoute extends Component {

  componentDidMount() {
    this.props.authListener();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.loading && nextProps.auth.isAuthenticated && nextProps.auth.user && nextProps.auth.user.role === 'admin') {
      this.props.history.replace('/admin');
    }
    if (!nextProps.auth.loading && !nextProps.auth.isAuthenticated) {
      this.props.history.replace('/login');
    }
  }

  render() {
    const {component: Component, auth, ...rest} = this.props;

    return <Route
    {...rest}
    render={
      props => (
        <div>
        { auth.loading && <Loader content='Chargement ...' /> }
        { !auth.loading && auth.isAuthenticated && <Component auth={auth} {...props} /> }
        </div>
      )
    }
    />
  }
}

UserRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { authListener })(withRouter(UserRoute));
