import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../bootstrap.css';

class ViewGroups extends Component {

  constructor(props) {
    super(props);
    this.state = window.initialState;
  }

  render() {
    return (
      <div className="App">
        <a href={this.state.login_link}>Login with Spotify</a>
      </div>
    );
  }
}

export default ViewGroups;

let root = document.getElementById(('react'));
if (root) {
  ReactDOM.render(<ViewGroups/>, document.getElementById('react'));
}



