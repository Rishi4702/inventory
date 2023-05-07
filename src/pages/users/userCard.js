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

  const [selectedStorehouse, setSelectedStorehouse] = useState(managedStorehouses ? managedStorehouses.id : '');
  const [showStorehouseForm, setShowStorehouseForm] = useState(false);
  const [storehouseOptions, setStorehouseOptions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/company/all')
      .then(response => {
        setCompanyOptions(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/storehouse/all')
      .then(response => {
        setStorehouseOptions(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


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
    axios.post('http://localhost:8080/company/employee', {
      userId: id,
      companyId: selectedCompany
    })
      .then(response => {
        console.log('Company assigned successfully');
        // Implement any necessary state updates or other actions
      })
      .catch(error => {
        console.log('Error assigning company:', error);
        // Implement any necessary error handling
      });
    setShowCompanyForm(false);
  };

  const handleStorehouseSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/storehouse/user', {
      userId: id,
      storehouseId: selectedStorehouse
    })
      .then(response => {
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
        <h3>Current company: {company == null ? 'Not assigned' : company.name}</h3>
       <div className="storehouses-container">
        <h3>Current Storehouses:</h3>
        <ul className="storehouses-list">
          {managedStorehouses == null ? 'Not assigned' : managedStorehouses.map(storehouse => (
            <li key={storehouse.id}><h3>{storehouse.name}</h3></li>
          ))}
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
