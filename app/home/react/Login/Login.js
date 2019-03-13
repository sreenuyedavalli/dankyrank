import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../bootstrap.css';
import './Login.css';
import Logo from '../logo.jpg';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = window.initialState;
  }

  render() {
    return (
      <div className="container">
        <div className="login-page">
          <div className="form">
            <form className="login-form">
              <img src={Logo}
                   alt="dankyrank"/>
              <a className="btn btn-primary" href={this.state.login_link}>login with spotify</a>
            </form>
          </div>
        </div>

      </div>
    );
  }
}

export default Login;

let root = document.getElementById(('react'));
if (root) {
  ReactDOM.render(<Login/>, document.getElementById('react'));
}



