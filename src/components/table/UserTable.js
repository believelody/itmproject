import React from 'react';
import { NavLink } from 'react-router-dom';
import { Table, Button } from 'reactstrap';

const UserTable = ({users, search, check}) => {
  return (
    <Table hover bordered responsive>
      <thead>
        <tr style={{textAlign: 'center'}}>
          <th>#</th>
          <th>Prénom</th>
          <th>Nom</th>
          {
            !check.email && <th>Email</th>
          }
          {
            !check.poste && <th>Poste</th>
          }
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          users
            .filter(user => user.name.toLowerCase().includes(search))
            .sort((a, b) =>{
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
            .map((user, i) =>
              <tr key={i}>
                <th scope='row'>{i + 1}</th>
                <td>
                  {
                    user.name.split(' ')[0]
                  }
                </td>
                <td>
                  {
                    user.name.split(' ')[1]
                  }
                </td>
                {!check.email && <td>{user.email}</td>}
                {!check.poste && <td>{user.poste}</td>}
                <td>
                  <NavLink to={`/user/${user.id}`} className='mr-2'>
                    <Button color='info'>
                      Voir profile
                    </Button>
                  </NavLink>
                  <NavLink to={`/user`} className='mr-2'>
                    <Button color='success'>
                      Edit
                    </Button>
                  </NavLink>
                  <Button color='danger'>Delete</Button>
                </td>
              </tr>
            )
        }
      </tbody>
    </Table>
  );
}

export default UserTable;
