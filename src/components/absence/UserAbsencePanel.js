import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Loader, List, Button } from 'semantic-ui-react';

const UserAbsencePanel = ({auth}) => {
  const absList = [];
  const { loading, user } = auth;
  if (user) {
    for (let abs in user.absence) {
      if (user.absence.hasOwnProperty(abs)) {
        absList.push({ id: abs, ...user.absence[abs]});
      }
    }
  }
  return (
    <Container>
      {
        loading && <Loader active content='Chargement' />
      }
      {
        !loading && user && absList.length > 0 &&
        <List divided>
          {
            absList.map(item =>
              <List.Item key={item.id}>
                <List.Content>
                  <List.Description>
                    <b>{item.filename}</b> déposé le {item.date}
                    <NavLink to={`/document/viewer/${item.id}/${item.filename}`}>
                      <Button
                        floated='right'
                        color='green'
                        content='Consulter le document'
                        inverted
                        icon='search'
                      />
                    </NavLink>
                  </List.Description>
                </List.Content>
              </List.Item>
            )
          }
        </List>
      }
    </Container>
  );
}

UserAbsencePanel.propTypes = {
  auth: PropTypes.object.isRequired
}

export default UserAbsencePanel;
