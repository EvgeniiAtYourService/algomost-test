import React from 'react'
import { WeatherData } from '../../redux/types/weather'
import styles from './CurrentWeather.module.css'

interface Props {
  weatherData: WeatherData
  getImgSrc: (icon: string, size: string) => string
}

const CurrentWeather = ({ weatherData, getImgSrc }: Props): JSX.Element => {
  return (
    <div>
      <p className={styles.currentTemp}>
        {Math.round(weatherData.main.temp)}
        <sup>o</sup>
      </p>
      <p>
        Ощущается как {Math.round(weatherData.main.feels_like)}
        <sup>o</sup>
      </p>
      <img src={getImgSrc(weatherData.weather[0].icon, '4')} alt="Weather" />
      <p className="weatherDescr">{weatherData.weather[0].description}</p>
      <div className={styles.weatherInfo}>
        <div>
          <span>Ветер:</span>{' '}
          <span>{Math.round(weatherData.wind.speed)} м/c</span>
        </div>
        <div>
          <span>Давление:</span> <span>{weatherData.main.pressure} гПа</span>
        </div>
        <div>
          <span>Влажность:</span> <span>{weatherData.main.humidity}%</span>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather
