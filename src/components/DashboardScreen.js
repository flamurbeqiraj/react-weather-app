import React, { Component } from 'react'
import '../App.css';

import OwlCarousel from 'react-owl-carousel' //Using Owl for 5 day presentation
import 'owl.carousel/dist/assets/owl.carousel.min.css'
import 'owl.carousel/dist/assets/owl.theme.default.min.css'

import Swal from 'sweetalert2' //Toasting in a fancy way
import withReactContent from 'sweetalert2-react-content'

import moment from 'moment' //Using moment to format dates

import { CircularProgress } from '@material-ui/core'; //Getting spinner

const MySwal = withReactContent(Swal)

class DashboardScreen extends Component {
  constructor(props) {
    super(props)

    //Initialising location from localStorage
    this.state = { location: localStorage.getItem('location') }

    //Declaring methods
    this.fetchNewData = this.fetchNewData.bind(this);
    this.reLogin = this.reLogin.bind(this);

    //Validation
    if (localStorage.getItem('name') === null || localStorage.getItem('location') === null) {
      window.location.href = '/'
    } else {
      if (localStorage.getItem('fetchedAPI') === null) {
        this.state = { weather: null };
      } else {
        this.state = { weather: JSON.parse(localStorage.getItem('fetchedAPI')) }; //Passing API Response to the state
      }
    }
  }

  //Offering the user to change the inputs
  reLogin() {
    localStorage.removeItem('location')
    localStorage.removeItem('fetchedAPI')
    window.location.href = '/'
  }

  //Getting new data from the API Url, on reload it will just use the old data
  fetchNewData() {
    localStorage.removeItem('fetchedAPI')
    this.setState({ weather: null })
    fetch("http://api.openweathermap.org/data/2.5/forecast?q="+localStorage.getItem('location')+"&units=metric&appid=7bb34b62ee0b66660c23a77d7ad86eb1")
    .then(res => res.json())
    .then(json => {
      if (json.cod === '200') {
        this.setState({ weather: JSON.parse(localStorage.getItem('fetchedAPI')) })
        localStorage.setItem('today', Math.round(json.list[0].main.temp))
        var temporaryArray = [];
        for (let i = 0; i < json.list.length; i += 8) {
          temporaryArray.push(json.list[i])
        }
        localStorage.setItem('fetchedAPI', JSON.stringify(temporaryArray))
        this.setState({
          location: localStorage.getItem('location'),
          weather: JSON.parse(localStorage.getItem('fetchedAPI'))
        })
      } else {
        MySwal.fire({
          title: <p>Wrong location</p>
        }).then(() => {
          localStorage.removeItem('location')
          window.location.href = '/'
        })
      }
    })
  }

  componentDidMount() {
    if (this.state.weather === null) {
      fetch("http://api.openweathermap.org/data/2.5/forecast?q="+localStorage.getItem('location')+"&units=metric&appid=7bb34b62ee0b66660c23a77d7ad86eb1")
      .then(res => res.json())
      .then(json => {
        if (json.cod === "200") {
          var temporaryArray = [];
          // localStorage.setItem('today', Math.round(json.list[0].main.temp))
          localStorage.setItem('today', Math.round(json.list[0].main.temp))
          for (let i = 0; i < json.list.length; i += 8) {
            temporaryArray.push(json.list[i])
          }
          localStorage.setItem('fetchedAPI', JSON.stringify(temporaryArray))
          this.setState({ weather: JSON.parse(localStorage.getItem('fetchedAPI')) })
        } else {
          MySwal.fire({
            title: <p>Wrong location</p>,
            text: 'Please write the name of the city correctly',
            icon: 'warn'
          }).then(() => {
            localStorage.removeItem('location')
            window.location.href = '/'
          })
        }
      })
    }
  }

  render() {
    if (this.state.weather === null) {
      return (
        <div className="h-100 d-flex justify-content-center align-items-center">
          <div>
            <div className="d-flex justify-content-center mb-4">
              <CircularProgress />
            </div>
            <div className="">
              <h2>LOADING</h2>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="Dashboard d-flex justify-content-center align-items-center">
          <div className="w-100">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="dashboardBox p-4">
                    <div>
                      <div>
                        <h3 className="text-center">Hello, {localStorage.getItem('name')}</h3>
                      </div>
                      <div>
                        <h1 className="daily text-center mb-0">{localStorage.getItem('today')}°C</h1>
                      </div>
                      <div>
                        <h2 className="underInfo text-center mb-0">Now in {localStorage.getItem('location')} <button className="btn btn-danger btn-sm" onClick={this.reLogin}>X</button></h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-100 mt-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 col-12">
                    <OwlCarousel className='owl-theme' items={3} loop={false} margin={10} dots={false} nav={false} autoplay>
                      {this.state.weather.map((data, key) => (
                        <div className="item d-flex justify-content-center" key={key}>
                          <div className="text-center">
                            <h2>{Math.round(data.main.temp)}°C</h2>
                            <span className="d-block">{moment(Date.parse(data.dt_txt)).format('DD.MM.Y')}</span>
                            <span className="d-block">{moment(Date.parse(data.dt_txt)).format('LT')}</span>
                          </div>
                        </div>
                      ))}
                    </OwlCarousel>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-100 mt-3">
              <div className="container">
                <div className="row">
                  <div className="col-12 text-center">
                    <button className="btn btn-primary" onClick={this.fetchNewData}>UPDATE WEATHER</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )
    }
  }
}
export default DashboardScreen;