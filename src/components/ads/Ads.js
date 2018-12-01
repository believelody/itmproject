import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllAds, deleteAd } from '../../actions/adAction';
import { Container, List, Button, Loader, Segment } from 'semantic-ui-react';
import { NewAd, ConfirmAction } from '../Export';
import './Ads.css';

class Ads extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedAd: null,
      open: false,
      activeItem: null,
      openConfirm: false
    }
  }

  componentDidMount() {
    this.props.fetchAllAds();
  }

  editAd = selectedAd => {
    this.setState({ selectedAd, activeItem: selectedAd.id });
    this.openModal(true);
  }

  clearSelectedAd = () => this.setState({ selectedAd: null });

  openModal = open => {
    this.setState({ open });
    this.clearSelectedAd();
  }

  sendID = selectedAd => this.setState({ selectedAd, openConfirm: true });

  handleConfirmAction = openConfirm => this.setState({ openConfirm });

  render() {
    const { open, selectedAd, activeItem, openConfirm } = this.state;
    const { loading, ads } = this.props.ad;
    return (
      <Container>
        {
          loading && <Loader content='Chargement...' />
        }
        {
          !loading && ads.length > 0 &&
          <Segment className='ads-list'>
            <NewAd selectedAd={selectedAd} open={open} openModal={this.openModal} />
            <ConfirmAction
              open={openConfirm}
              data={selectedAd}
              action={this.props.deleteAd}
              subAction={this.clearSelectedAd}
              handleConfirmAction={this.handleConfirmAction}
              header='Suppression'
              content={`Voulez vraiment effectuer cette action? Vous ne pourrez plus revenir en arrière`}
              cancelButton='Annuler'
              confirmButton='Supprimer'
            />
            <List bulleted>
            {
              ads.map((ad, i) =>
                <List.Item key={ad.id} active={activeItem === ad.id} className='ad-item'>
                  <List.Header content={ad.title} />
                  <List.Content floated='right'>
                    <List.Icon className='ad-item-btn' name='edit' onClick={() => this.editAd(ad)} />
                    <List.Icon className='ad-item-btn' name='trash' onClick={() => this.sendID(ad)} />
                  </List.Content>
                </List.Item>
              )
            }
            </List>
          </Segment>
        }
      </Container>
    )
  }
}

Ads.propTypes = {
  ad: PropTypes.object.isRequired,
  fetchAllAds: PropTypes.func.isRequired,
  deleteAd: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  ad: state.ad
});

export default connect(mapStateToProps, { fetchAllAds, deleteAd })(Ads);
