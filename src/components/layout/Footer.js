import React from 'react';
import { Segment } from 'semantic-ui-react';
import './Layout.css';

// const footerStyle = {
//   bottom: 0,
//   width: '100%',
//   border: '1px solid rgba(0, 0, 0, 1)',
//   borderRadius: '4px',
//   height: 'auto'
// }

const Footer = () => (
  <footer className='footer-style'>
    <Segment style={{background: 'transparent', fontSize: '1.1em'}} textAlign='center'>
      <span style={{fontWeight: 'bold'}}>&copy; 2018 Copyright</span>
    </Segment>
  </footer>
);

export default Footer;
