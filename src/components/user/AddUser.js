import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser, clearUserFailure } from '../../actions/userAction';
import { Container, Form, Label, Input, Button, FormGroup, FormFeedback } from 'reactstrap';

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      poste: '',
      errors: []
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user.errors.length > 0) {
      this.setState({ errors: nextProps.user.errors });
    }
  }

  handleChange = ({target}) => this.setState({ [target.name]: target.value });

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.props.user.errors.length > 0) {
      this.props.clearUserFailure();
    }

    let { name, email, poste, errors } = this.state
    let newUser = { name, email, poste };
    this.props.addUser(newUser);

    // console.log(this.props.user.errors.length);

    this.setState({
      email: errors.find(err => err.code === 'email') ? '' : email,
      name: errors.find(err => err.code === 'name') ? '' : name,
      poste: errors.find(err => err.code === 'poste') ? '' : poste,
      errors: []
    });
    this.props.history.goBack();
  }

  clearInput = ({target}) => {
    if (this.state.errors.length > 0) {
      this.setState({ errors: this.state.errors.filter(err => err.code !== target.name) });
    }
  }

  validationFeedBack = (errors, codeLabel) => errors.length > 0 && errors.find(err => err.code === codeLabel) && <FormFeedback invalid="true">{errors[errors.indexOf(errors.find(err => err.code === codeLabel))].msg}</FormFeedback>

  render() {
    const { email, name, poste, errors } = this.state;

    if (errors.length > 0) {
      console.log(errors);
    }
    return (
      <Container>
          <Form className='py-3' onSubmit={this.handleSubmit} noValidate>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input
                type='text'
                name='name'
                placeholder='Entrez vos noms et prénoms'
                onChange={this.handleChange}
                onFocus={this.clearInput}
                value={name}
                invalid={(errors.length > 0 && errors.find(err => err.code === 'name')) ? true : false}
              />
              { this.validationFeedBack(errors, "name") }
            </FormGroup>
            <FormGroup>
              <Label for='email'>Email</Label>
              <Input
                type='email'
                name='email'
                placeholder='exemple: johndoe@yahoo.com'
                onChange={this.handleChange}
                onFocus={this.clearInput}
                value={email}
                invalid={(errors.length > 0 && errors.find(err => err.code === 'email')) ? true : false}
              />
              { this.validationFeedBack(errors, "email") }
            </FormGroup>
            <FormGroup>
              <Label for='poste'>Poste</Label>
              <Input
                type='select'
                name='poste'
                onChange={this.handleChange}
                onFocus={this.clearInput}
                invalid={(errors.length > 0 && errors.find(err => err.code === 'poste')) ? true : false}
              >
                <option>Ingénieur</option>
                <option>Technicien</option>
                <option>Gardien</option>
              </Input>
              { this.validationFeedBack(errors, "poste") }
            </FormGroup>
            <Button color='success'>Submit</Button>
          </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { addUser, clearUserFailure })(AddUser);
