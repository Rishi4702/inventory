import React from "react";
import "./register.css";
import axios from "axios";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      surname: "",
      error: "",
      response: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    console.log(name, value);
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://192.168.43.148:8080/auth/register/admin", {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        surname: this.state.surname
      })
      .then((response) => {
        console.log(response);
        this.setState({
          response: response.data,
          error: "",
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          response: "",
          error: "Error registering user",
        });
      });
  }

  render() {
    const login = (
      <div className="login-page">
        <div className="form">
          <h1>Register</h1>
          <br/>
          <form className="login-form" onSubmit={this.handleSubmit}>
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
              <label htmlFor="name">Name</label>
              <br />
              <input
                type="text"
                name="name"
                id="name"
                value={this.state.name}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="login-input-container">
              <label htmlFor="surname">Surname</label>
              <br />
              <input
                type="text"
                name="surname"
                id="surname"
                value={this.state.surname}
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
            <a href="/login" >Already a user?</a>
            <br />
            <br/>
            <button type="submit" className="login-button">
              Register
            </button>
          </form>
        </div>
      </div>
    );

    const successMessage = (
      <div className="success-message">
        User created successfully!
      </div>
    );

    return (
      <div id="authorization">
      {this.state.response && successMessage}
      {login}
      </div>
    );
  }
}

export default Register;
