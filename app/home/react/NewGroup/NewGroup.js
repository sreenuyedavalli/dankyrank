import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../bootstrap.css';
import TopNav from "./../TopNav";
import {Container, Jumbotron} from "reactstrap";
import Footer from "./../Footer";

const options = [];

class NewGroup extends Component {

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
            <form action="" method="post">
              <h1 className="jumbotron-heading">create a new group</h1>
              <input name="name" placeholder="Enter Group Name"></input>
              <button type="submit">Create Group</button>
            </form>
          </Container>
        </Jumbotron>
        <Footer/>
      </div>
    );
  }
}

export default NewGroup;

let root = document.getElementById(('react'));
if (root) {
  ReactDOM.render(<NewGroup/>, document.getElementById('react'));
}



