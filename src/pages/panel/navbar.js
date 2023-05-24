import { Component } from 'react';
import React from 'react';
import { FaSignOutAlt, FaBars, FaChartLine, FaShoppingCart, FaBoxOpen, FaListAlt } from 'react-icons/fa';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { HiOutlineUserGroup } from 'react-icons/hi'
import Avatar from 'react-avatar';
import "./navbar.css";
import UserList from "../users/userList";
import ProductList from "../../pages/product/product";
import WarehouseSelection from "../../pages/storehouse/storehouse";
import Order from "./../order/order";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPanelOpen: false,
      selectedPage: ''
    };
    this.handlePanelToggle = this.handlePanelToggle.bind(this);
    this.togglePage = this.togglePage.bind(this);
    this.renderSwitch = this.renderSwitch.bind(this);
  }

  togglePage = (pageName) => {
    this.setState({ selectedPage: pageName });
  }

  renderSwitch = () => {
    const pageName = this.state.selectedPage;
    switch (pageName) {
      case 'users':
        return <div style={{ display: 'flex', justifyContent: 'left', marginLeft: '220px', marginTop: '20px', height: '500px', width: '800px' }}><UserList /> </div>;
      case 'products':
        return <div style={{ display: 'flex', justifyContent: 'left', marginLeft: '220px', marginTop: '20px', height: '500px', width: 'fit-content' }}><ProductList /> </div>;
      case 'stock':
        return <div style={{ display: 'flex', justifyContent: 'left', marginLeft: '220px', marginTop: '20px', height: '500px', width: 'fit-content' }}><WarehouseSelection /> </div>;
      case 'orders':
        return <div style={{ display: 'flex', justifyContent: 'left', marginLeft: '220px', marginTop: '20px', height: '500px', width: 'fit-content' }}><Order /> </div>;
      default:
        return null;
    }
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
    localStorage.removeItem('id');
    window.location.href = '/login';
  };

  render() {
    //const { isPanelOpen, showUserList, showProductList, showWarehouseList } = this.state;
    const name = localStorage.getItem('name');
    const surname = localStorage.getItem('surname');
    if (!localStorage.getItem('accessToken')) {
      window.location.href = '/login';
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
            <span className="navbar-username">{name + ' ' + surname}</span>
            <div className="navbar-dropdown">
              <a href="#">Edit Profile</a>
              <a href="#" onClick={this.handleLogout}><FaSignOutAlt />Logout</a>
            </div>
          </div>
        </div>
        {this.state.isPanelOpen && (
          <div className="navbar-panel">
            <ul>
              <li><FaChartLine style={{ color: 'blue' }} /><a href="#">Dashboard</a></li>
              <li><FaBoxOpen style={{ color: 'blue' }} /><a href="#" onClick={() => this.togglePage('stock')}>In Stock</a></li>
              <li><FaShoppingCart style={{ color: 'blue' }} /><a href="#" onClick={() => this.togglePage('products')}>Products</a></li>
              <li><FaListAlt style={{ color: 'blue' }} /><a href="#">Sales</a></li>
              <li><BsFillCartPlusFill style={{ color: 'blue' }} /><a href="#" onClick={() => this.togglePage('orders')}>Orders</a></li>
              {localStorage.getItem('roles') === 'ROLE_ADMIN' &&
                <li><HiOutlineUserGroup style={{ color: 'blue' }} /><a href="#" onClick={() => this.togglePage('users')}>Users</a></li>
              }
            </ul>
          </div>
        )}
        {this.renderSwitch()}
      </div>
    );
  }
}


export default Navbar;
