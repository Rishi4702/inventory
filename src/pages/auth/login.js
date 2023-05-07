import React from "react";
import "./login.css";
import axios from "axios";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      authorized: false,
      error: "",
    };
    this.authorize = this.authorize.bind(this);
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

        // save the access token and user information to localStorage
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("surname", response.data.surname);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("roles",response.data.roles);
        localStorage.setItem("id", response.data.id);
        window.location.href ="/nav"
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          authorized: false,
          error: "Invalid email or password",
        });
      });
  }


  render() {
    const { authorized } = this.state;
    const { location } = this.props;
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
            <a href="/register">Not registered yet!</a>
            <br />
            <br />
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  
    return (
      <div id="authorization">
        {(
          <div className="login-page">
            {login}            
          </div>
        )}
      </div>
    );
  }
  
}

export default Login;
