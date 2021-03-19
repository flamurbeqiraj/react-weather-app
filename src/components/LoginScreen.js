import React, { Component } from 'react'
import '../App.css';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', location: ''}

    if (localStorage.getItem('name') !== null) {
      window.location.href = '/dashboard'
    }

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
          <input type="text" className="form-control" value={this.state.username} onChange={this.handleUsername} placeholder="Your name" />
          <input type="text" className="form-control" value={this.state.location} onChange={this.handleLocation} placeholder="Your location" />
          <button className="btn btn-success w-100" onClick={this.handleLogin}>LOGIN</button>
        </div>
      </div>
    );
  }
}
export default LoginScreen;