import React from "react";
import "./login.css";
import axios from "axios";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      authorized: false,
      error: "",
    };
    this.authorize = this.authorize.bind(this);
    this.logout = this.logout.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  }

  authorize(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8080/auth/login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((response) => {
        console.log(response);
        this.setState({
          authorized: true,
          error: "",
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          authorized: false,
          error: "Invalid email or password",
        });
      });
  }

  logout(e) {
    e.preventDefault();
    this.setState({
      authorized: false,
      email: "",
      password: "",
      error: "",
    });
  }

  render() {
    const login = (
      <div className="login-page">
        <div className="form">
          <h1>Login</h1>
          <br />
          <h5>See your growth and get support</h5>
          <br />
          <br />
          <form className="login-form" onSubmit={this.authorize}>
            <div className="login-input-container">
              <label htmlFor="username">Email</label>
              <br />
              <input
                type="text"
                name="email"
                id="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="login-input-container">
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                name="password"
                id="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </div>
            {this.state.error && (
              <div className="error">{this.state.error}</div>
            )}
            <br />
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    );

    const contactInfo = (
      <div>
        <ul>
          <li>client@example.com</li>
          <li>555.555.5555</li>
        </ul>
        <form action="#" onSubmit={this.logout}>
          <input type="submit" value="Logout" />
        </form>
      </div>
    );

    return (
      <div id="authorization">
        {this.state.authorized ? contactInfo : login}
      </div>
    );
  }
}

export default Contact;
