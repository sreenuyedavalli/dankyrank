import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.css';
import TopNav from "./TopNav";
import {Container, Jumbotron} from "reactstrap";
import Footer from "./Footer";

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
            <h1 className="jumbotron-heading">Example Django + React Multi-page Application</h1>
            <p className="lead text-muted">Each Django-rendered page is a totally separate React component,
              using <em>window.initialState</em> to load the initial state of the page.
            </p>
            <p>
              <a href="#" className="btn btn-primary my-2">Wow</a>
              <a href="#" className="btn btn-secondary my-2">So cool!</a>
            </p>
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



