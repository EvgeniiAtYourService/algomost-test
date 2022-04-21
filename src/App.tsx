import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCities, getWeather } from './redux/action-creators/action-creators'
import './App.css'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'

function App(): JSX.Element {
  const [city, setCity] = useState<string>('')
  const dispatch = useDispatch()
  const citiesData = useSelector(
    (state: RootState) => state.weatherState.citiesData
  )
  const weatherData = useSelector(
    (state: RootState) => state.weatherState.weatherData
  )
  useEffect(() => {
    dispatch<any>(getCities())
  }, [])

  const fetchWeather = () => {
    console.log(city)
    dispatch<any>(getWeather(city))
  }

  return (
    <div className="App">
      <p>select: {city}</p>
      <div className="dropdown">
        <button className="dropbtn">Dropdown</button>
        {/* <div className="dropdown-content"> */}
        {citiesData?.map((city) => (
          <p
            key={city.id}
            onClick={() => {
              setCity(city.name)
            }}
          >
            <strong>{city.country.name}</strong> {city.localizedName}
          </p>
        ))}
        {/* </div> */}
      </div>
      <h3>
        TEMPERATURE: {weatherData?.main.temp} <sup>o</sup>С
      </h3>
      <br />
      <br />
      <br />
      <p>get weather:</p>
      <button onClick={fetchWeather} style={{ marginLeft: '200px' }}>
        Get Weather
      </button>
      <br />
      <br />
      <br />
      <p>now:</p>
      <br />
      <br />
      <br />
      <p>in 3h: </p>
      <br />
      <br />
      <br />
      <p>time:</p>
    </div>
  )
}

export default App
