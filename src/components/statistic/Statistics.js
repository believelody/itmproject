import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Statistics extends Component {
  render() {
    return (
      <div>
        Statistiques Page
      </div>
    )
  }
}

export default connect(null, {})(Statistics);
