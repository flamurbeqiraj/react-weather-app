import '../App.css';

import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.min.css'
import 'owl.carousel/dist/assets/owl.theme.default.min.css'


function DashboardScreen() {
  if (localStorage.getItem('name') === null) {
    window.location.href = '/'
  }

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
                <OwlCarousel className='' items={3} loop={false} margin={10} nav={false} autoplay>
                  <div className="item d-flex justify-content-center">
                    <div>
                      <h2 class="text-center">13°C</h2>
                      <span>13.03.2021</span>
                    </div>
                  </div>
                  <div className="item d-flex justify-content-center">
                    <div>
                      <h2 class="text-center">15°C</h2>
                      <span>14.03.2021</span>
                    </div>
                  </div>
                  <div className="item d-flex justify-content-center">
                    <div>
                      <h2 class="text-center">18°C</h2>
                      <span>15.03.2021</span>
                    </div>
                  </div>
                  <div className="item d-flex justify-content-center">
                    <div>
                      <h2 class="text-center">11°C</h2>
                      <span>16.03.2021</span>
                    </div>
                  </div>
                  <div className="item d-flex justify-content-center">
                    <div>
                      <h2 class="text-center">25°C</h2>
                      <span>17.03.2021</span>
                    </div>
                  </div>
                </OwlCarousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardScreen;