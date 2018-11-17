import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Container, Message, Card, Statistic } from 'semantic-ui-react';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container fluid>
      </Container>
    )
  }
}

export default connect(null, {})(Dashboard);
