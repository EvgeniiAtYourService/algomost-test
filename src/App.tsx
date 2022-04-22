import React, { useEffect, useState } from 'react'
import {
  getCities,
  getWeather,
  getWeather3h,
  setFetchingWeather,
  setFetchingWeather3h,
} from './redux/action-creators/action-creators'
import './App.css'
import { useDispatch } from 'react-redux'
import { CityData } from './redux/types/weather'
import { useTypedSelector } from './hooks/useTypedSelector'
import HoverBtn from './components/HoverBtn/HoverBtn'
import CityList from './components/CityList/CityList'
import WeatherBlock from './components/WeatherBlock/WeatherBlock'
import Forecast from './components/Forecast/Forecast'
import CurrentWeather from './components/CurrentWeather/CurrentWeather'
import Loader from './components/Loader/Loader'

function App(): JSX.Element {
  const [cityRu, setCityRu] = useState<string>('')
  const [localTime, setLocalTime] = useState<Date>(new Date())
  const [timezone, setTimezone] = useState<string>('')
  const [listActive, setListActive] = useState<boolean>(false)
  const dispatch = useDispatch()
  const {
    citiesData,
    weatherData,
    weatherData3h,
    isFetchingCities,
    isFetchingWeather,
    isFetchingWeather3h,
  } = useTypedSelector((state) => state.weatherState)

  useEffect(() => {
    dispatch<any>(getCities())
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLocalTime(new Date())
    }, 1000)
  }, [localTime])

  const fetchWeather = (city: CityData) => {
    dispatch(setFetchingWeather(true))
    dispatch(setFetchingWeather3h(true))
    dispatch<any>(getWeather(city.name))
    dispatch<any>(getWeather3h(city.name))
    setLocalTime(new Date())
    setCityRu(city.localizedName)
    setTimezone(city.timezoneId)
  }
  const getImgSrc = (icon: string, size: string): string =>
    `https://openweathermap.org/img/wn/${icon}@${size}x.png`

  const getLocalTime = () => {
    let time = localTime.toLocaleString('en-EN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: timezone,
    })
    const hours = time.substring(0, 2)
    if (hours === '24') {
      time = '00' + time.substring(2)
      return time
    } else {
      return time
    }
  }
  const firstWeatherFetching =
    !weatherData && !weatherData3h && isFetchingWeather && isFetchingWeather3h
  return (
    <div className="App">
      {isFetchingCities ? (
        <div className="btnLoaderWrapper">
          <Loader isOn={isFetchingCities} />
        </div>
      ) : (
        <>
          <div className="btnLoaderWrapper">
            <HoverBtn setListActive={setListActive} />
          </div>
          {firstWeatherFetching && (
            <div className="btnLoaderWrapper">
              <Loader isOn={firstWeatherFetching} />
            </div>
          )}
          {listActive && (
            <CityList
              listActive={listActive}
              citiesData={citiesData}
              fetchWeather={fetchWeather}
              setListActive={setListActive}
            />
          )}

          {weatherData && weatherData3h ? (
            <>
              <h3 className="cityName">
                {cityRu}{' '}
                <span className="weatherLoader">
                  <Loader isOn={isFetchingWeather || isFetchingWeather3h} />
                </span>
              </h3>
              <div className="wrapper">
                <WeatherBlock>
                  <CurrentWeather
                    getImgSrc={getImgSrc}
                    weatherData={weatherData}
                  />
                </WeatherBlock>
                <WeatherBlock>
                  <div className="forecastWrapper">
                    <Forecast
                      isFirstForecast
                      weatherData3h={weatherData3h}
                      getImgSrc={getImgSrc}
                      timeStep={1}
                    />
                    <Forecast
                      weatherData3h={weatherData3h}
                      getImgSrc={getImgSrc}
                      timeStep={2}
                    />
                  </div>
                </WeatherBlock>
                <WeatherBlock>
                  <div className="localTimeWrapper">
                    <h2>
                      <p>{getLocalTime()}</p>
                    </h2>
                  </div>
                </WeatherBlock>
              </div>
            </>
          ) : null}
        </>
      )}
    </div>
  )
}

export default App
