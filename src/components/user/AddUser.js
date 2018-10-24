import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../../actions/userAction';
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
    let newUser = this.state;
    console.log(newUser);
    this.props.addUser(newUser);
    // this.props.history.goBack();
  }

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
                value={name}
                invalid={(errors.length > 0 && errors.find(err => err.code === 'name')) ? true : false}
              />
              { errors.length > 0 && errors.find(err => err.code === 'name') && <FormFeedback invalid="true">{errors[errors.indexOf(errors.find(err => err.code === 'name'))].msg}</FormFeedback> }
            </FormGroup>
            <FormGroup>
              <Label for='email'>Email</Label>
              <Input
                type='email'
                name='email'
                placeholder='exemple: johndoe@yahoo.com'
                onChange={this.handleChange}
                value={email}
                invalid={false}
              />
            </FormGroup>
            <FormGroup>
              <Label for='poste'>Poste</Label>
              <Input
                type='select'
                name='poste'
                onChange={this.handleChange}
                invalid={false}
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
});

export default connect(mapStateToProps, { addUser })(AddUser);
