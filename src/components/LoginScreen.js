import React, { Component } from 'react'
import '../App.css';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    //Declared empty states
    this.state = {location: ''}

    //Suggesting to use the same username
    if (localStorage.getItem('name') !== null) {
      this.state = {username: localStorage.getItem('name')}
    }

    //Validating if name isset to redirect on Dashboard
    if (localStorage.getItem('name') !== null && localStorage.getItem('location') !== null) {
      window.location.href = '/dashboard'
    }

    //Handling activities
    this.handleUsername = this.handleUsername.bind(this)
    this.handleLocation = this.handleLocation.bind(this)
    this.handleLogin    = this.handleLogin.bind(this)
  }

  handleUsername(event) {
    this.setState({username: event.target.value});
  }

  handleLocation(event) {
    this.setState({location: event.target.value});
  }

  //Actions after clicking the login button
  handleLogin() {
    localStorage.setItem('name', this.state.username)
    localStorage.setItem('location', this.state.location)
    window.location.href = '/dashboard'
  }

  render() {
    return (
      <div className="App">
        <div className="identifyBox">
          <h4 className="identify-title">IDENTIFY YOURSELF</h4>
          <input type="text" className="form-control mb-2" value={this.state.username} onChange={this.handleUsername} placeholder="Your name" />
          <input type="text" className="form-control mb-2" value={this.state.location} onChange={this.handleLocation} placeholder="Your location" />
          <button className="btn btn-success w-100" onClick={this.handleLogin}>LOGIN</button>
        </div>
      </div>
    );
  }
}
export default LoginScreen;