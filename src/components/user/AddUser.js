import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Form, Label, Input, Button, FormGroup } from 'reactstrap';

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      poste: ''
    };
  }

  handleChange = ({target}) => this.setState({ [target.name]: target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    let newUser = this.state;
    console.log(newUser);
  }

  render() {
    const { email, name } = this.state;
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
              value={name}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for='email'>Email</Label>
            <Input
              type='email'
              name='email'
              placeholder='exemple: johndoe@yahoo.com'
              onChange={this.handleChange}
              value={email}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for='poste'>Poste</Label>
            <Input
              type='select'
              name='poste'
              onChange={this.handleChange}
              required
            >
              <option>Ingénieur</option>
              <option>Technicien</option>
              <option>Gardien</option>
            </Input>
          </FormGroup>
          <Button color='success'>Submit</Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, {})(AddUser);
