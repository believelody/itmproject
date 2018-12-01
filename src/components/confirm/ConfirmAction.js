import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Confirm, Button } from 'semantic-ui-react';

export default class ConfirmAction extends Component {

  handleCancel = () => this.props.handleConfirmAction(false);

  handleConfirm = () => {
    if (this.props.history) {
      this.props.history.goBack();
    }
    if (this.props.subAction) {
      this.props.subAction();
    }
    this.props.action(this.props.data);
    this.props.handleConfirmAction(false);
  }

  render() {
    const { header, content, cancelButton, confirmButton, open } = this.props;
    return (
      <Confirm
        open={open}
        header={header}
        content={content}
        cancelButton={cancelButton}
        confirmButton={confirmButton}
        onCancel={this.handleCancel}
        onConfirm={this.handleConfirm}
        size='tiny'
      />
    )
  }
}

ConfirmAction.propTypes = {
  open: PropTypes.bool.isRequired,
  handleConfirmAction: PropTypes.func.isRequired
}
