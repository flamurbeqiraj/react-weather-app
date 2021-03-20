import React, { Component } from 'react'
import '../App.css';

import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.min.css'
import 'owl.carousel/dist/assets/owl.theme.default.min.css'
// http://api.openweathermap.org/data/2.5/forecast?q=Pristina&units=metric&appid=7bb34b62ee0b66660c23a77d7ad86eb1

class DashboardScreen extends Component {
  constructor(props) {
    super(props)
    if (localStorage.getItem('fetchedAPI') === null) {
      this.state = { weather: null };
    } else {
      this.state = { weather: JSON.parse(localStorage.getItem('fetchedAPI')) };
    }
  }

  DashboardScreen() {
    if (localStorage.getItem('name') === null) {
      window.location.href = '/'
    }
  }

  componentDidMount() {
    if (this.state.weather === null) {
      fetch("http://api.openweathermap.org/data/2.5/forecast?q=Pristina&units=metric&appid=7bb34b62ee0b66660c23a77d7ad86eb1")
      .then(res => res.json())
      .then(json => {
        // this.setState({ weather: json })
        var temporaryArray = [];
        for (let i = 4; i < json.list.length; i += 8) {
          temporaryArray.push(json.list[i])
        }
        localStorage.setItem('fetchedAPI', JSON.stringify(temporaryArray))
        this.setState({ weather: JSON.parse(localStorage.getItem('fetchedAPI')) })
      })
    }
  }

  render() {
    if (this.state.weather === null) {
      return (
        <div>
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
                    <h1 className="daily text-center">30°C</h1>
                  </div>
                  <div>
                    <h1 className="underInfo text-center">Today</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-100 mt-5">
              <h1 className="text-center">Weather in {localStorage.getItem('location')}</h1>
            </div>

            <div className="w-100 mt-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 col-12">
                    <OwlCarousel className='owl-theme' items={3} loop={false} margin={10} nav={false} autoplay>
                      {this.state.weather.map((data, key) => (
                        <div className="item d-flex justify-content-center">
                          <div>
                            <h2 className="text-center" id={key}>{data.main.temp}°C</h2>
                            <span>{data.dt_txt}</span>
                          </div>
                        </div>
                      ))}
                    </OwlCarousel>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-100 mt-3">
              <button className="btn btn-primary btn-sm">FETCH DATA</button>
            </div>

          </div>
        </div>
      )
    }
  }
}
export default DashboardScreen;