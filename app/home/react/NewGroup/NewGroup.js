import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../bootstrap.css';
import TopNav from "./../TopNav";
import {Container, Jumbotron} from "reactstrap";
import Footer from "./../Footer";

class NewGroup extends Component {

  constructor(props) {
    super(props);
    this.state = window.initialState;
    this.state.groupName = '';
    this.handleChange = this.handleChange.bind(this);
    this.createGroup = this.createGroup.bind(this);
  }

  handleChange(event){
    this.setState({groupName: event.target.value});
  }
  
  createGroup(){
      alert(this.state.groupName)
  }

  render() {
    return (
        <div className="App">
        <TopNav/>
        <Jumbotron>
          <Container>
            <h1 className="jumbotron-heading">Danky Rank Create Group</h1>
            <input onChange={this.handleChange} placeholder="Enter Group Name"></input>
            <button onClick={this.createGroup}>Create Group</button>
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



