import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search_icon.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind_speed.png'
import a_01 from '../assets/01.png'
import a_02 from '../assets/02.png'
import a_03 from '../assets/03.png'
import a_04d from '../assets/04d.png'
import a_04n from '../assets/04n.png'
import a_09 from '../assets/09.png'
import a_10 from '../assets/10.png'
import a_11 from '../assets/11.png'
import a_13 from '../assets/13.png'
import a_50 from '../assets/50.png'

const Weather = () => {

    const inputRef = useRef()

    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": a_01,
        "02d": a_02,
        "03d": a_03,
        "04d": a_04d,
        "09d": a_09,
        "10d": a_10,
        "11d": a_11,
        "13d": a_13,
        "50d": a_50,
        "01n": a_01,
        "02n": a_02,
        "03n": a_03,
        "04n": a_04n,
        "09n": a_09,
        "10n": a_10,
        "11n": a_11,
        "13n": a_13,
        "50n": a_50,
    }

    const search = async (city)=>{
        if(city === ""){
            alert("Enter City Name");
            return;
        }
        try {
            const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            
            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }

            console.log(data);
            const icon = allIcons[data.weather[0].icon] || a_01;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })

        } catch (error) {
            setWeatherData(false);
            console.error("Error in fetching data");
        }
    }

    useEffect(()=>{
        search("New York")
    },[])

  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search' />
            <img src={search_icon} alt="search_icon.png" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData?<>
            <img src={weatherData.icon} alt="clear_icon.png" className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.windSpeed} Km/H</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
        </>:<></>}
    </div>
  )
}

export default Weather