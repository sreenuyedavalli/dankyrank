import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../bootstrap.css';
import TopNav from "./../TopNav";
import {Container, Jumbotron} from "reactstrap";
import Footer from "./../Footer";
import Select from 'react-select';

const options = [
   
  ];

class NewGroup extends Component {
    opt = {
        selectedOption: null,
    }
  constructor(props) {
    super(props);
    this.state = window.initialState;
    this.access_token = window.accessToken;
    this.playlists = [];
    this.handleChange = this.handleChange.bind(this);
    this.createGroup = this.createGroup.bind(this);
    this.selectedOption = {}
    this.getPlaylists = this.getPlaylists.bind(this);
    this.getPlaylists()
  }


  getPlaylists(){
    this.state.playlists.items.forEach(element => {
        options.push({value : element.id, label : element.name})
    });
  }

  handleChange(selectedOption){
    this.selectedOption = selectedOption;
    console.log(`Option selected:`, selectedOption);
  }

  
  handleGroupChange(event){
    this.groupName = event.target.value; 
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
            <Select
                value={this.selectedOption.name}
                onChange={this.handleChange}
                options={options}
            />
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



