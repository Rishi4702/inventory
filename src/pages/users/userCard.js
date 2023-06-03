import React, { useState, useEffect } from 'react';
import './usercard.css';
import Avatar from 'react-avatar';
import axios from 'axios';
import { GoVerified } from 'react-icons/go';

const UserCard = ({ user }) => {
  const { id, email, name, surname, managedStorehouses, company, verified } = user;
  const [selectedCompany, setSelectedCompany] = useState(company ? company.id : '');
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [companyOptions, setCompanyOptions] = useState([]);

  //const [selectedStorehouse, setSelectedStorehouse] = useState(company.storehouses ? company.storehouses.id : '');
  const [selectedStorehouse, setSelectedStorehouse] = useState('');
  const [showStorehouseForm, setShowStorehouseForm] = useState(false);
  const [storehouseOptions, setStorehouseOptions] = useState([]);

  useEffect(() => {
    // Get the id from localStorage
    const id = localStorage.getItem('id');

    // Get the JWT token from localStorage
    const token = localStorage.getItem('accessToken');

    // Make the API request with the updated endpoint and the JWT token
    axios.get(`http://192.168.43.148:8080/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {

        var tempArr = [];
        tempArr.push(response.data.company);
        setCompanyOptions(tempArr);
        setStorehouseOptions(response.data.company.storehouses);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   axios.get('http://192.168.43.148:8080/storehouse/all')
  //     .then(response => {
  //       setStorehouseOptions(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);

  // const updateStorehouseDisplay = () => {
  //   axios.get('http://192.168.43.148:8080/storehouse/all')
  //     .then(response => {
  //       setStorehouseOptions(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }


  const handleManageStorehouses = () => {
    // Implement logic for managing storehouses
    if (!managedStorehouses.name) {
      console.log("button working")
      setShowStorehouseForm(true);
    } else {
      // Implement logic for managing storehouses
    }
  };

  const handleManageCompany = () => {
    if (!company) {
      setShowCompanyForm(true);
    } else {
      // Implement logic for managing company
    }
  };

  const handleCompanySubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('accessToken');

    axios.post('http://192.168.43.148:8080/company/employee', {
      userId: id,
      companyId: selectedCompany
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Company assigned successfully');
        // updateStorehouseDisplay();
        // Implement any necessary state updates or other actions
      })
      .catch(error => {
        console.log('Error assigning company:', error);
        // Implement any necessary error handling
      });

    setShowCompanyForm(false);
  };

  const handleStorehouseSubmit = (event) => {
    const token = localStorage.getItem('accessToken');
    event.preventDefault();
    axios.post('http://192.168.43.148:8080/storehouse/user', {
      userEmail: email,
      storehouseId: selectedStorehouse
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response);
        console.log('Storehouse assigned successfully');
        // Implement any necessary state updates or other actions
      })
      .catch(error => {
        console.log('Error assigning storehouse:', error);
        // Implement any necessary error handling
      });
    setShowStorehouseForm(false);
  };



  const getRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  return (
    <div className="card">
      <div className="card-body">
        <p className="card-text">ID: {id}</p>
        <div className="avatar-name">
          <Avatar name={name + ' ' + surname} size="40" round={true} color={getRandomColor()} />
          <div className="name-surname">
            <h5 className="card-title">{name} {surname}</h5>
            {verified && <GoVerified className="verified-badge" />}
          </div>
        </div>
        <h2>{email}</h2>
        <h3>Current company: {company === null ? 'Not assigned' : company.name}</h3>
        <div className="storehouses-container">
          <h3>Current Storehouses:</h3>
          <ul className="storehouses-list">
            {company ? company.storehouses.map(storehouse => (
              <li key={storehouse.id}><h3>{storehouse.name}</h3></li>
            )) : 'Not assigned'}
          </ul>
        </div>
        <button className="btn btn-primary" onClick={handleManageStorehouses}>Manage Storehouses</button>
        <button className="btn btn-primary" onClick={handleManageCompany}>Manage Company</button>
        {showCompanyForm &&
          <form onSubmit={handleCompanySubmit}>
            <div className="form-group">
              <label htmlFor="companySelect">Select Company:</label>
              <select
                className="form-control"
                id="companySelect"
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
              >
                <option value="">Choose...</option>
                {companyOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        }
        {showStorehouseForm &&
          <form onSubmit={handleStorehouseSubmit}>
            <div className="form-group">
              <label htmlFor="storehouseSelect">Select Storehouse:</label>
              <select
                className="form-control"
                id="storehouseSelect"
                value={selectedStorehouse}
                onChange={(e) => setSelectedStorehouse(e.target.value)}
              >
                <option value="">Choose...</option>
                {storehouseOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        }

      </div>
    </div>
  );
};

export default UserCard;