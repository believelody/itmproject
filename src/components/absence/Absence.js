import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Container, List } from 'semantic-ui-react';
import './Absence.css';

class Absence extends Component {
  render() {
    return (
      <Container>
      </Container>
    )
  }
}

export default connect(mapStateToProps, {})(Absence);
