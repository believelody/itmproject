import React, { Component } from 'react';
import { DropdownMenu, DropdownItem, FormGroup, Input, Label } from 'reactstrap';

const FilterFields = ({ check_email, check_poste, handleCheck }) => {
    return (
      <DropdownMenu>
        <DropdownItem header>Cochez la case correspondante pour désélectionner un champs</DropdownItem>
        <FormGroup check className='ml-3'>
          <Label check>
            <Input
            name='check_email'
            type="checkbox"
            onChange={handleCheck}
            />
            {' '}
            Email
          </Label>
        </FormGroup>
        <FormGroup check className='ml-3'>
          <Label check>
            <Input
            name='check_poste'
            type="checkbox"
            onChange={handleCheck}
            />
            {' '}
            Poste
          </Label>
        </FormGroup>
      </DropdownMenu>
    );
}

export default FilterFields;
