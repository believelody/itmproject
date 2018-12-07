import React, { Component } from 'react';
import { Segment, Container, Message, Icon } from 'semantic-ui-react';
import { DepositAbsenceForm } from '../Export';

const Deposit = ({match}) => (
  <Container>
    <Segment>
      <Message info>
        <Message.Header>
          <Icon name='info' />
          Dépôt de justificatif d'absence
        </Message.Header>
        <Message.Content>
          Vous êtes dans la section de dépôt de justificatif d'absence. Il vous permet de sauvegarder en quelques clics vos documents justifiants une absence à un ou plusieurs jours donnés. Notez que seul les fichiers pdf sont acceptés. Veuillez aussi indiquer la date de l'absence.
        </Message.Content>
      </Message>
      <DepositAbsenceForm id={match.params.id} />
    </Segment>
  </Container>
)

export default Deposit;
