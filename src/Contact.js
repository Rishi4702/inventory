import React from "react";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "1",
      authorized: false,
    };
    this.authorize = this.authorize.bind(this);
    this.logout =this.logout.bind(this);
  }

  authorize(e) {
    const password = e.target.querySelector('input[type="password"]').value;
    const auth = password == this.state.password;
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
      <form action="#" onSubmit={this.authorize}>
        <input type="password" placeholder="Password" />
        <input type="submit" />
      </form>
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
        <h1>{this.state.authorized ? "Contact" : "Enter the Password"}</h1>
        {this.state.authorized ? contactInfo : login}
      </div>
    );

  }
}

export default Contact;
// ReactDOM.render(<Contact />, document.getElementById("app"));
