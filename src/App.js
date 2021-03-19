import React, { Component } from 'react'
import './App.css';
import {Route, BrowserRouter as Router} from  "react-router-dom"
// import OwlCarousel from 'react-owl-carousel'
// import 'owl.carousel/dist/assets/owl.carousel.min.css'
// import 'owl.carousel/dist/assets/owl.theme.default.min.css'
import LoginScreen from './components/LoginScreen'
import DashboardScreen from './components/DashboardScreen'

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={LoginScreen} />
        <Route path="/dashboard" component={DashboardScreen} />
      </Router>
    )
  }
}

export default App;