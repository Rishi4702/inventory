import { Component } from 'react';
import React from 'react';
import { FaSignOutAlt,FaBars, FaChartLine, FaShoppingCart, FaBoxOpen, FaListAlt } from 'react-icons/fa';
import {BsFillCartPlusFill} from 'react-icons/bs';
import{HiOutlineUserGroup} from 'react-icons/hi'
import Avatar from 'react-avatar';
import "./navbar.css";
import  UserList from "../users/userList";
import ProductList from "../../pages/product/product";



class Navbar extends Component {
  constructor(props) {
    super(props);
    // const { history } = props;
    this.state = {
      isPanelOpen: false,
      showUserList: false,
      showProductList: false
    };
    this.handlePanelToggle = this.handlePanelToggle.bind(this);

  }

  handleUserListToggle = () => {
    this.setState((prevState) => ({
      showProductList: false,
      showUserList: !prevState.showUserList,
      isPanelOpen: !prevState.isPanelOpen
    }));
  }

  handleProuductListToggle = () => {
    this.setState((prevState) => ({
      showUserList: false,
      showProductList: !prevState.showProductList,
      isPanelOpen: !prevState.isPanelOpen
    }));
  }

  handlePanelToggle() {
    this.setState((prevState) => ({
      isPanelOpen: !prevState.isPanelOpen,
    }));
  }
  handleLogout = () => {
    // remove access token and user information from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('name');
    localStorage.removeItem('surname');
    localStorage.removeItem('email');
    window.location.href='/login';
   
    // redirect user to Login page
    // this.props.history.push('/login');
    
  };
  
  render() {
    const { isPanelOpen, showUserList,showProductList  } = this.state;
    const name = localStorage.getItem('name');
    const surname = localStorage.getItem('surname');
    if (!localStorage.getItem('accessToken')) {
      window.location.href='/login';
      return null;
    }
    return (
    <div>
      <div className="navbar">
        <div className="navbar-left">
          <button className="navbar-btn" onClick={this.handlePanelToggle}>
            <FaBars />
          </button>
        </div>
        <div className="navbar-right">
        <Avatar name={name + ' ' + surname} size="40" round={true} />
        <span className="navbar-username">{name+' '+surname}</span>
          <div className="navbar-dropdown">
            <a href="#">Edit Profile</a>
            <a href="#" onClick={this.handleLogout}><FaSignOutAlt />Logout</a>
          </div>
        </div>
        </div>
        {isPanelOpen && (
          <div className="navbar-panel">
            <ul>
              <li><FaChartLine style={{color: 'blue'}} /><a href="#">Dashboard</a></li>
              <li><FaBoxOpen style={{color: 'blue'}} /><a href="#">In Stock</a></li>
              <li><FaShoppingCart style={{color: 'blue'}}/><a href="#"  onClick={this.handleProuductListToggle}>Products</a></li>
              <li><FaListAlt style={{color: 'blue'}}/><a href="#">Sales</a></li>
              <li><BsFillCartPlusFill style={{color: 'blue'}}/><a href="#">Orders</a></li>
             { localStorage.getItem('roles')==='ROLE_ADMIN'&&<li><HiOutlineUserGroup style={{color: 'blue'}}/><a href="#"  onClick={this.handleUserListToggle}>Users</a></li>}
            </ul>
          </div>
        )}
          {showUserList &&  <div style={{ display: 'flex', justifyContent: 'left', marginLeft: '220px', marginTop: '20px', height: '500px', width: '800px' }}><UserList /> </div>}
          {showProductList &&  <div style={{ display: 'flex', justifyContent: 'left', marginLeft: '220px', marginTop: '20px', height: '500px', width: '800px' }}><ProductList /> </div>}
 
    </div>
    );
  }
}


export default Navbar;
