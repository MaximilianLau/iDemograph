import React, { Component } from 'react';
import Nav from './components/navigation/Navigation.js'
import Logo from './components/Logo.js'
import Footer from './components/Footer/Footer.js'
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.js"
import Leaderboards from "./components/Leaderboards/Leaderboards.js"
import Particles from "react-particles-js"
import Clarifai from 'clarifai'
import Demographics from './components/Demographics/Demographics.js'
import Login from './components/Login/Login.js'
import Register from './components/Register/Register.js'

import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;

const app = new Clarifai.App({
  apiKey: API_KEY
})

const particlesConfig = {
  "particles": {
    "number": {
      "value": 60,
      "density": {
        "enable": true,
        "value_area": 1500
      }
    },
    "line_linked": {
      "enable": true,
      "opacity": 0.02
    },
    "move": {
      "direction": "right",
      "speed": 0.05
    },
    "size": {
      "value": 1
    },
    "opacity": {
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0.05
      }
    }
  },
  "interactivity": {
    "events": {
      "onclick": {
        "enable": true,
        "mode": "push"
      }
    },
    "modes": {
      "push": {
        "particles_nb": 1
      }
    }
  },
  "retina_detect": true
  }

class App extends Component {
  constructor () {
    super();
    this.state = {
      input: '',
      imageUrl:'',
      box: {},
      boxAll: [],
      route: 'signIn',
      isSignedIn: false,
      user: {
        id:'',
        name:'',
        email:'',
        entries:0,
        joined:''
      },
      resultInfo:{
        demograph:{
          name:'',
          value:''
        },
        age: {
          name:'',
          value:''
        },
        sex: {
          name:'',
          value:''
        },
        resultAll: []
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined:data.joined
      }
    })
  }

  facialLocation = (data) => {
    const alienFace = data.outputs[0].data.regions;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    const boxArray = alienFace.map(region =>{
      return (
        { 
          leftCol: region.region_info.bounding_box.left_col * width,
          topRow: region.region_info.bounding_box.top_row * height + 250,
          rightCol: width - (region.region_info.bounding_box.right_col * width),
          bottomRow: height - (region.region_info.bounding_box.bottom_row * height)
        }
      )
    })
    return boxArray;
  }

  displayFace = (data) => {
    this.setState ({
      boxAll:data
    })
  }

  facialInformation = (data) => {
    const demograph = data.outputs[0].data.regions;
    const demoArray = demograph.map(region => {
      return (
        {
          demograph: region.data.concepts[22],
          age: region.data.concepts[0],
          sex: region.data.concepts[20]
        }
      )
    })
    return demoArray
  }
  displayInformation = (data) => {
    this.setState ({
      resultAll:data
    })
  }
  
  onInputChange = (event) => {
    this.setState ({
      input: event.target.value
    })
  }

  onSubmit = () => {
    this.setState ({ 
      imageUrl: this.state.input
    })
    app.models
      .predict("c0c0ac362b03416da06ab3fa36fb58e3", this.state.input)
      .then (response => { 
        if (response) {
          fetch('https://protected-ravine-28114.herokuapp.com/image', {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({
              id:this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {
              entries:count
            })
            )
          })
          .catch(console.log)
        }
        this.displayFace(this.facialLocation(response),
        this.displayInformation(this.facialInformation(response))
        )
      })
      .catch (err => console.log(err))
  }

  onRouteChange = (route) => {
    if (route === 'signOut') {
      this.setState ({
        isSignedIn:false
      })
    } else if (route === 'home') {
      this.setState ({
        isSignedIn:true
      })
    }
    this.setState ({
      route:route
    })
  }

  render() {
    return (
      <div className="App">
        <div className="contentWrapper">
        <Particles className="particles"
          params={particlesConfig} 
        />
        <Nav onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        { this.state.route === 'home'
        ? <div>
            <Leaderboards name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onSubmit} />
            <Demographics boxAll={this.state.boxAll} imageUrl={this.state.imageUrl} resultAll={this.state.resultAll} />
          </div>
        : ( 
          this.state.route === 'signIn'
              ? <div><Logo /><Login onRouteChange={this.onRouteChange} loadUser={this.loadUser} /></div>
              : <div><Logo /><Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} /></div>
        )
        }
        </div>
        <Footer />
      </div>
    )
  }
}

export default App;