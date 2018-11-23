import React from 'react';
import { NavLink } from 'react-router-dom';
import { List, Container } from 'semantic-ui-react';
import './Settings.css';

const Settings = () => {
  return (
    <Container textAlign='center'>
      <List divided selection size='large'>
        <List.Item className='list-item' as={ NavLink } exact to='/settings/ads' header="Gérer l'actualité de l'entreprise" />
        <List.Item className='list-item' as={ NavLink } exact to='/settings/admin-sys' header="Gérer les accès admin" />
        <List.Item className='list-item' as={ NavLink } exact to='/settings/bills' header="Gérer l'édition des fiches de paie" />
        <List.Item className='list-item' as={ NavLink } exact to='/settings/fire' header="Gérer les licenciements" />
      </List>
    </Container>
  )
}

export default Settings;
