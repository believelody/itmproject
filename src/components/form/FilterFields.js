import React, { Component } from 'react';
// import { DropdownMenu, DropdownItem, FormGroup, Input, Label } from 'reactstrap';
import { Dropdown, Input, Label, Form } from 'semantic-ui-react';

const FilterFields = ({ check_email, check_poste, handleCheck }) => {
    return (
      <Dropdown multiple text='Filtres'>
        <Dropdown.Menu multiple>
          <Dropdown.Header content='Sélection champs' />
          <Dropdown.Item>
            <Input
              type='checkbox'
              name='check_email'
              onChange={handleCheck}
            />
            Email
          </Dropdown.Item>
          <Dropdown.Item>
            <Input
              type='checkbox'
              name='check_poste'
              onChange={handleCheck}
            />
            Poste
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
}

export default FilterFields;

// <DropdownMenu>
// <DropdownItem header>Cochez la case correspondante pour désélectionner un champs</DropdownItem>
// <FormGroup check className='ml-3'>
// <Label check>
// <Input
// name='check_email'
// type="checkbox"
// onChange={handleCheck}
// />
// {' '}
// Email
// </Label>
// </FormGroup>
// <FormGroup check className='ml-3'>
// <Label check>
// <Input
// name='check_poste'
// type="checkbox"
// onChange={handleCheck}
// />
// {' '}
// Poste
// </Label>
// </FormGroup>
// </DropdownMenu>
