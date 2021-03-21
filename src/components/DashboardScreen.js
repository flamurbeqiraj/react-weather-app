import React, { Component } from 'react'
import '../App.css';

import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.min.css'
import 'owl.carousel/dist/assets/owl.theme.default.min.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import moment from 'moment'

const MySwal = withReactContent(Swal)

class DashboardScreen extends Component {
  constructor(props) {
    super(props)

    this.state = { location: localStorage.getItem('location') }

    this.fetchNewData = this.fetchNewData.bind(this);
    this.reLogin = this.reLogin.bind(this);

    if (localStorage.getItem('name') === null || localStorage.getItem('location') === null) {
      window.location.href = '/'
    } else {
      if (localStorage.getItem('fetchedAPI') === null) {
        this.state = { weather: null };
      } else {
        this.state = { weather: JSON.parse(localStorage.getItem('fetchedAPI')) };
      }
    }
  }

  reLogin() {
    localStorage.removeItem('location')
    localStorage.removeItem('fetchedAPI')
    window.location.href = '/'
  }

  fetchNewData() {
    localStorage.removeItem('fetchedAPI')
    this.setState({ weather: null })

    // fetch("http://api.openweathermap.org/data/2.5/forecast?q="+localStorage.getItem('location')+"&units=metric&appid=7bb34b62ee0b66660c23a77d7ad86eb1")
    // .then(res => res.json())
    // .then(json => {
    //   if (json.cod === '200') {
    //     this.setState({ weather: JSON.parse(localStorage.getItem('fetchedAPI')) })
    //     var temporaryArray = [];
    //     for (let i = 0; i < json.list.length; i += 8) {
    //       temporaryArray.push(json.list[i])
    //     }
    //     localStorage.setItem('fetchedAPI', JSON.stringify(temporaryArray))
    //     this.setState({
    //       location: localStorage.getItem('location'),
    //       weather: JSON.parse(localStorage.getItem('fetchedAPI'))
    //     })
    //   } else {
    //     MySwal.fire({
    //       title: <p>Wrong location</p>
    //     }).then(() => {
    //       localStorage.removeItem('location')
    //       window.location.href = '/'
    //     })
    //   }
    // })
  }

  componentDidUpdate() {
    console.log("Did update")
  }

  componentDidMount() {
    if (this.state.weather === null) {
      fetch("http://api.openweathermap.org/data/2.5/forecast?q="+localStorage.getItem('location')+"&units=metric&appid=7bb34b62ee0b66660c23a77d7ad86eb1")
      .then(res => res.json())
      .then(json => {
        if (json.cod === "200") {
          var temporaryArray = [];
          for (let i = 0; i < json.list.length; i += 8) {
            temporaryArray.push(json.list[i])
          }
          localStorage.setItem('fetchedAPI', JSON.stringify(temporaryArray))
          this.setState({ weather: JSON.parse(localStorage.getItem('fetchedAPI')) })
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
  }

  render() {
    if (this.state.weather === null) {
      return (
        <div className="h-100 d-flex justify-content-center align-items-center">
          <h1>Loading</h1>
        </div>
      )
    } else {
      return (
        <div className="Dashboard d-flex justify-content-center align-items-center">
          <div className="w-100">
            <div className="w-100 d-flex justify-content-center">
              <div className="dashboardBox">
                <div>
                  <div>
                    <h2 className="text-center">Hello, {localStorage.getItem('name')}</h2>
                  </div>
                  <div>
                    <h1 className="daily text-center mb-0">30°C</h1>
                  </div>
                  <div>
                    <h1 className="underInfo text-center">Today</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-100 mt-5">
              <h1 className="text-center">Weather in</h1>
              <h1 className="text-center">{localStorage.getItem('location')} <button className="btn btn-danger btn-sm" onClick={this.reLogin}>X</button></h1>
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
                    <button className="btn btn-primary btn-sm" onClick={this.fetchNewData}>FETCH DATA</button>
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