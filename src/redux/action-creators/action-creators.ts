import { CityData } from './../types/weather'
import {
  WeatherAction,
  WeatherData,
  WeatherError,
  WeatherActionTypes,
  AlertAction,
} from '../types/weather'
import { Dispatch } from 'redux'

declare var process: {
  env: {
    REACT_APP_X_RAPID_API_HOST: string
    REACT_APP_X_RAPID_API_KEY: string
    REACT_APP_OPEN_WEATHER_API_KEY: string
  }
}

export const getCities = () => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': process.env.REACT_APP_X_RAPID_API_HOST,
      'X-RapidAPI-Key': process.env.REACT_APP_X_RAPID_API_KEY,
    },
  }
  return async (dispatch: Dispatch<WeatherAction>) => {
    try {
      const res = await fetch(
        // 'https://spott.p.rapidapi.com/places?type=CITY&country=CZ&limit=10',
        'https://spott.p.rapidapi.com/places?type=CITY&language=%20ru&country=RU%2CUA%2CBY%2CKZ%2CDE%2CFR%2CIT%2CES%2CPT%2CCZ%2CPL%2CMD%2CRO%2CUS%2CCA%2CMX%2CBR%2CAU%2CAT%2CEG%2CZA%2CKR&limit=100',
        options
      )

      if (!res.ok) {
        const resData: WeatherError = await res.json()
        console.log(resData.message)
        throw new Error(resData.message)
      }

      const resData: CityData[] = await res.json()
      console.log(resData)
      dispatch({
        type: WeatherActionTypes.GET_CITIES,
        payload: resData,
      })
    } catch (error) {
      dispatch({
        type: WeatherActionTypes.SET_ERROR,
        payload: 'Ошибка при загрузке данных городов',
      })
      console.log(error)
    }
  }
}

export const getWeather = (city: string) => {
  const units = 'metric'
  return async (dispatch: Dispatch<WeatherAction>) => {
    console.log(city)
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=${units}`
      )
      // await fetch(
      //   `https://api.openweathermap.org/data/2.5/weather?q=surgut&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=${units}`
      // )

      if (!res.ok) {
        const resData: WeatherError = await res.json()
        console.log(resData.message)
        throw new Error(resData.message)
      }

      const resData: WeatherData = await res.json()
      console.log(resData)
      dispatch({
        type: WeatherActionTypes.GET_WEATHER,
        payload: resData,
      })
    } catch (error) {
      dispatch({
        type: WeatherActionTypes.SET_ERROR,
        payload: 'Ошибка при загрузке данных погоды',
      })
      console.log(error)
    }
  }
}

export const setLoading = (): WeatherAction => {
  return {
    type: WeatherActionTypes.SET_LOADING,
  }
}

export const setError = (): WeatherAction => {
  return {
    type: WeatherActionTypes.SET_ERROR,
    payload: null,
  }
}

export const setAlert = (message: string): AlertAction => {
  return {
    type: WeatherActionTypes.SET_ALERT,
    payload: message,
  }
}
