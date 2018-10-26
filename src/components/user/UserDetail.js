import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null
    };
  }
  componentDidMount() {
    if (this.props.match.params.user_id) {
      this.setState({ id: this.props.match.params.user_id });
    }
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    const { id } = this.state;
    const { loading, users } = this.props.user;
    return (
      <Container>
        {!loading && <Card>
          {
            users[id].img &&
            <CardImg top width='100%' src={users[id].img} alt={users[id].name} />
          }
          <CardBody>
            <CardTitle>
              {users[id].name}
            </CardTitle>
            <CardSubtitle>
              {users[id].poste}
            </CardSubtitle>
            <CardText>
              {users[id].email}
            </CardText>
          </CardBody>
        </Card>}
      </Container>
    );
  }
}

UserDetail.propTypes = {
  user: PropTypes.object.isRequired
};

// Equivalent to const mapStateToProps = state => ({ user: state.user });
const mapStateToProps = ({user}) => ({user});

export default connect(mapStateToProps, {})(UserDetail);
