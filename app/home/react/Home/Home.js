import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../bootstrap.css';
import TopNav from "./../TopNav";
import {ButtonGroup, Container, Jumbotron} from "reactstrap";
import Footer from "./../Footer";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = window.initialState;

  }

  render() {
    return (
      <div className="container bg-dark">
        <TopNav/>
        <Jumbotron>
          <Container>
            <h1 className="jumbotron-heading text-center">welcome to dankyrank</h1>
            <p className="lead text-primary text-center">
              dankyrank lets you create collaborative ranked playlists with your friends.
            </p>
            <ul className="lead text-muted">
              <li>
                simply create a group or join an existing group to get started
              </li>
              <li>
                once you join a group, a playlist will be created on your spotify account that you can add songs to.
              </li>
              <li>
                come back to dankyrank and click <span className="text-primary">update </span>
                and the master playlist (a separate playlist owned by the group's owner) will be updated to reflect
                everyone in the group's songs and rankings.
              </li>
            </ul>
            <ButtonGroup className="w-100 d-flex">
              <a href="#" className="btn btn-primary my-2 w-100">create group</a>
              <a href="#" className="btn btn-secondary my-2 w-100">join group</a>
              <a href="#" className="btn btn-primary my-2 w-100">my groups</a>
            </ButtonGroup>
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



