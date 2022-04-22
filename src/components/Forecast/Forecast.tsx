import React from 'react'
import { Weather3HData } from '../../redux/types/weather'
import styles from './Forecast.module.css'
import cn from 'classnames'

interface Props {
  weatherData3h: Weather3HData
  getImgSrc: (icon: string, size: string) => string
  timeStep: number
  isFirstForecast?: boolean
}

const Forecast = ({
  weatherData3h,
  getImgSrc,
  timeStep,
  isFirstForecast,
}: Props): JSX.Element => {
  return (
    <div className={cn({ [styles.firstForecast]: isFirstForecast })}>
      <p>Погода в {weatherData3h.list[timeStep].dt_txt.substring(11, 16)} </p>
      <p>
        {Math.round(weatherData3h.list[timeStep].main.temp)}
        <sup>o</sup>
      </p>
      <img
        src={getImgSrc(weatherData3h.list[timeStep].weather[0].icon, '2')}
        alt="Weather"
      />
      <p className="weatherDescr">
        {weatherData3h.list[timeStep].weather[0].description}
      </p>
    </div>
  )
}

export default Forecast
