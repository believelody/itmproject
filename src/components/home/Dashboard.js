import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchAllAds } from '../../actions/adAction';
import { StatItem } from '../Export';
import { Container, Message, Card, Statistic, Loader, Header, Divider, Segment, Button } from 'semantic-ui-react';
import './Dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchAllAds();
  }

  render() {
    const { loading, ads } = this.props.ad;
    return (
      <Container fluid className='container'>
        <Header
          as='h1'
          content='Dashboard'
          subheader={`Voici un résumé des statistiques et les dernières nouvelles de l'entreprise`}
          textAlign='center'
        />
        {
          loading && <Loader inline='center' content='Chargement...' />
        }
        {
          !loading && ads &&
          <div>
            <Message>
              <Header content={`Actualités de l'entreprise`} />
              { ads.texte }
            </Message>
            <Segment className='stat-resume'>
              <StatItem
                title='Total retard'
                subtitle='Comptabilise les heures de tout le personnel'
                statWeek='12,3h'
                statMonth='33,3h'
              />
              <StatItem
                title='Total des absences'
                subtitle="Comptabilise le nombre d'absence"
                statWeek='3'
                statMonth='13'
              />
              <StatItem
                title='Cumul des heures supplémentaires'
                subtitle='Retrouvez le total des heures supplémentaires de tout le personnel'
                statWeek='27h'
                statMonth='76,28h'
              />
            </Segment>
          </div>
        }
      </Container>
    )
  }
}

Dashboard.propTypes = {
  ad: PropTypes.object.isRequired,
  fetchAllAds: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  ad: state.ad
});

export default connect(mapStateToProps, { fetchAllAds })(Dashboard);
