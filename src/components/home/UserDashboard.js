import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchAllAds } from '../../actions/adAction';
import { StatItem } from '../Export';
import { Container, Message, Card, Loader, Header, Divider, Segment, Button } from 'semantic-ui-react';
import './Dashboard.css'

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchAllAds();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.ad.ads.length !== nextProps.ad.ads.length) {
      nextProps.fetchAllAds();
    }
  }

  render() {
    const { loading, ads } = this.props.ad;

    return (
      <Container fluid className='container'>
        <Header
          as='h1'
          content='Dashboard'
          subheader={`Voici les dernières nouvelles de l'entreprise`}
          textAlign='center'
        />
        {
          loading && <Loader content='Chargement...' />
        }
        {
          !loading && ads.length > 0 &&
          <div>
            <Message>
              <Header content={`Actualités de l'entreprise`} subheader={ads[0].title} />
              { ads[0].text }
            </Message>
            <Segment className='user-resume'>
            </Segment>
          </div>
        }
      </Container>
    )
  }
}

UserDashboard.propTypes = {
  ad: PropTypes.object.isRequired,
  fetchAllAds: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  ad: state.ad
});

export default connect(mapStateToProps, { fetchAllAds })(UserDashboard);
