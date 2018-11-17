import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Button, Header, Statistic } from 'semantic-ui-react';

const StatItem = ({title, subtitle, statWeek, statMonth}) => (
  <Card>
    <Card.Content>
      <Card.Header content={title} />
      <Card.Meta>{ subtitle }</Card.Meta>
    </Card.Content>
    <Card.Content textAlign='center'>
      <Card.Description>
        <Statistic value={statWeek || 0} label='Semaine' />
      </Card.Description>
      <Card.Description>
        <Statistic value={statMonth || 0} label='Mois' />
      </Card.Description>
    </Card.Content>
    <Card.Content extra textAlign='center'>
      <div className='ui one buttons'>
        <NavLink to='/statistic'>
          <Button inverted color='instagram' content='Voir les détails' />
        </NavLink>
      </div>
    </Card.Content>
  </Card>
);

export default StatItem;
