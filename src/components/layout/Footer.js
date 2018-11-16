import React from 'react';
import { Segment } from 'semantic-ui-react';

const footerStyle = {
  bottom: 0,
  width: '100%',
  border: '1px solid rgba(255, 255, 255, .5)',
  borderRadius: '4px'
}

const Footer = () => (
  <footer style={footerStyle}>
    <Segment style={{background: 'transparent', fontSize: '1.1em'}} textAlign='center'>
      <span style={{fontWeight: 'bold'}}>&copy; 2018 Copyright</span>
    </Segment>
  </footer>
);

export default Footer;
