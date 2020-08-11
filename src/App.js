import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

// import data from './data'


class App extends React.Component{

  state = {
    display: false,
    allToys: [],
    newToy: {
      name: "",
      image: "",
      likes: 0
    }
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  componentDidMount(){
    fetch('http://localhost:3000/toys')
    .then(res=> res.json())
    .then(data => {
      this.setState({allToys: data})
    })
  }

  componentWillUnmount(){
    console.log("Component unmounted")
    
  }

  likeToy = (toy) => {
    let newArray = this.state.allToys.map(toyItem => {
      if(toyItem.id === toy.id){
        toyItem = {
          ...toyItem,
          likes: (toy.likes + 1)
        }
      }
      return toyItem
    })
    this.setState({
      allToys: newArray
    })
  }

  donateToy = (toy) => {
    let newArray = this.state.allToys.filter(toyItem => toyItem.id !== toy.id)
    this.setState({
      allToys: newArray
    })
  }

  createToy = (e) => {
    console.log(e.target.name)
    let newToy = {
      ...this.state.newToy,
      [e.target.name]: e.target.value
    }
    this.setState({
      newToy
    })
  }

  saveToy = (e) => {
    e.preventDefault()
    e.target.reset()
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.newToy)
    })
    .then(res=> res.json())
    .then(data => {
      this.setState({
        allToys: [...this.state.allToys, data],
        newToy: {
          name: "",
          image: "",
          likes: 0
      }})
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm createToy={this.createToy} saveToy={this.saveToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer allToys={this.state.allToys} likeToy={this.likeToy} donateToy={this.donateToy}/>
      </>
    );
  }

}

export default App;
