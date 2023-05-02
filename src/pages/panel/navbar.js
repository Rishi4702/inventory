import { Component } from 'react';
import { FaSignOutAlt,FaBars, FaChartLine, FaShoppingCart, FaBoxOpen, FaUsers, FaListAlt } from 'react-icons/fa';
import Avatar from 'react-avatar';
import "./navbar.css";
import { withRouter } from "react-router-dom";


class Navbar extends Component {
  constructor(props) {
    super(props);
    // const { history } = props;
    this.state = {
      isPanelOpen: false,
    };
    this.handlePanelToggle = this.handlePanelToggle.bind(this);

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
  
    // redirect user to Login page
    this.props.history.push('/login');
  };
  
  render() {
    const { isPanelOpen } = this.state;
    const name = localStorage.getItem('name');
    const surname = localStorage.getItem('surname');

    return (
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
        {isPanelOpen && (
          <div className="navbar-panel">
            <ul>
              <li><FaChartLine /><a href="#">Dashboard</a></li>
              <li><FaBoxOpen /><a href="#">In Stock</a></li>
              <li><FaShoppingCart /><a href="#">Products</a></li>
              <li><FaListAlt /><a href="#">Sales</a></li>
              <li><FaUsers /><a href="#">Orders</a></li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Navbar);
