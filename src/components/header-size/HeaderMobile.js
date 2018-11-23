import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const HeaderMobile = ({handleClick}) =>
  <Button
    className='header-mobile-btn'
    color='grey'
    inverted o
    nClick={() => handleClick(true)}
    icon
  >
    <Icon name='bars' />
  </Button>

export default HeaderMobile;
