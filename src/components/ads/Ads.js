import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllAds } from '../../actions/adAction';
import { Container, List, Button, Loader } from 'semantic-ui-react';
import { NewAd } from '../Export';

class Ads extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchAllAds();
  }

  render() {
    const { loading, ads } = this.props.ad;
    console.log(ads);
    return (
      <Container>
        {
          loading && <Loader content='Chargement...' />
        }
        {
          !loading && ads.length > 0 &&
          <Fragment>
            <NewAd />
            <List>
            {
              ads.map((ad, i) =>
                <List.Item key={i} header={ad.title} />
              )
            }
            </List>
          </Fragment>
        }
      </Container>
    )
  }
}

Ads.propTypes = {
  ad: PropTypes.object.isRequired,
  fetchAllAds: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  ad: state.ad
});

export default connect(mapStateToProps, { fetchAllAds })(Ads);
