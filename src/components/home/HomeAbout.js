import React from 'react'
import WeatherPlatformImage from '../../assets/homeAbout/stockChart.jpg';
import HedgingContractsImage from '../../assets/homeAbout/weather_related_risk.jpg';
import WeatherMonitoringImage from '../../assets/homeAbout/data_analytics.jpg';
import AutomaticPayoutsImage from '../../assets/homeAbout/contract_creation.jpg';
import "../../styles/home/HomeAbout.css";

function HomeAbout() {
  return (
    <div>
        <div className='d-flex mt-5'>
            <div className='col-5 mx-auto d-flex homeAboutSingleDiv'>
                <img src={WeatherPlatformImage} alt="Weather Platform"className='homeImageAbout'/>
                <p className=' px-2 d-flex align-items-center '>WeathHedge is a Weather derivatives trading platform that empowers users to hedge against weather-related financial risks effectively, reducing exposure to unpredictable elements.</p>
            </div>
            <div className='col-5 mx-auto d-flex homeAboutSingleDiv'>
                <img src={HedgingContractsImage} alt="Hedging Contracts" className='homeImageAbout' />
                <p className=' px-2 d-flex align-items-center'>The platform owner creates and lists hedging contracts, allowing users to easily purchase them by paying the specified premium. Funds from buyers are securely stored in a vault, reducing risk.</p>
            </div>
        </div>

        <div className='d-flex mt-5'>
            <div className='col-5 mx-auto d-flex homeAboutSingleDiv'>
                <img src={WeatherMonitoringImage} alt="Weather Monitoring" className='homeImageAbout'/>
                <p className=' px-2 d-flex align-items-center'>The platform continuously monitors relevant weather data to determine contract conditions, ensuring precise risk management.</p>
            </div>
            <div className='col-5 mx-auto d-flex homeAboutSingleDiv'>
                <img src={AutomaticPayoutsImage} alt="Automatic Payouts" className='homeImageAbout'/>
                <p className=' px-2 d-flex align-items-center'>When conditions are met, automatic payouts are calculated and distributed to buyers, offering a transparent and secure way to hedge against the unpredictability of weather.</p>
            </div>
        </div>
    </div>

  )
}

export default HomeAbout