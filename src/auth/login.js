import React from "react";
import "./login.css";
class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "s@s.pl",
      password: "1",
      authorized: false,
    };
    this.authorize = this.authorize.bind(this);
    this.logout = this.logout.bind(this);
  }

  authorize(e) {
    const password = e.target.querySelector('input[type="password"]').value;
    const auth = password === this.state.password;
    this.setState({
      authorized: auth,
    });
  }

  logout(e) {
    this.setState({
      authorized: false,
    });
  };


  render() {
    const login = (
      <div className="login-page">
        <div className="form">
          <h1>Login</h1>
          <br></br>
          <h5>See your growth and get support</h5>
          <br></br>
          <br></br>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <div className="login-input-container">
              <label htmlFor="username">Email</label>
              <br />
              <input
                type="text"
                name="username"
                id="username"/>
            </div>
            <div className="login-input-container">
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                name="password"
                id="password"/>
            </div>
            <br></br>
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
          <input type="submit" />
        </form>
      </div>
    );

    return (
      <div id="authorization">
        {/* <h1>{this.state.authorized ? "Contact" : "Enter the Password"}</h1> */}
        {this.state.authorized ? contactInfo : login}
      </div>
    );

  }
}

export default Contact;
// ReactDOM.render(<Contact />, document.getElementById("app"));
