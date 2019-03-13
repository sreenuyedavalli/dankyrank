import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../bootstrap.css';
import TopNav from "./../TopNav";
import {Container, Jumbotron} from "reactstrap";
import Footer from "./../Footer";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = window.initialState;

  }

  render() {
    return (
      <div className="App">
        <TopNav/>
        <Jumbotron>
          <Container>
            <h1 className="jumbotron-heading">Danky Rank</h1>
            <button>Create New Group</button>
            <button>Join Existing Group</button>
            <button>View My Groups</button>
          </Container>
        </Jumbotron>
        <Footer/>
      </div>
    );
  }
}

export default Home;

let root = document.getElementById(('react'));
if (root) {
  ReactDOM.render(<Home/>, document.getElementById('react'));
}



