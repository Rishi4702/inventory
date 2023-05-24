import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from '../users/userCard.js';
import './usercard.css';
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    axios.get('http://10.8.0.6:8080/users/all', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // const currentUser = users.find(user => user.email === localStorage.getItem('email'));

  const filteredUsers = users.filter(user => {
    const fullName = user.name + ' ' + user.surname;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className='OuterWrapForSearchCards'>
      <div style={{ display: 'flex', justifyContent: 'flex-end' ,marginLeft:'260px',marginBottom:'100px'}}>
        <input
          type="text"
          placeholder="Search users by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            position:'fixed',
            height: '30px',
            width: '250px',
            borderRadius: '20px',
            border: '1px solid grey',
            padding: '5px 10px',
            marginRight: '10px',
            marginBottom:'20px',
          }}
        />
      </div>
      {filteredUsers.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
