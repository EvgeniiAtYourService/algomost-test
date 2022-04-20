import {
  WeatherAction,
  WeatherActionTypes,
  WeatherState,
} from '../types/weather'

const initialState: WeatherState = {
  citiesData: null,
  weatherData: null,
  loading: false,
  error: null,
}

export const weatherReducer = (
  state = initialState,
  action: WeatherAction
): WeatherState => {
  switch (action.type) {
    case WeatherActionTypes.GET_WEATHER:
      return {
        ...state,
        weatherData: action.payload,
        loading: false,
        error: null,
      }
    case WeatherActionTypes.GET_CITIES:
      return {
        ...state,
        citiesData: action.payload,
        loading: false,
        error: null,
      }
    case WeatherActionTypes.SET_LOADING:
      return {
        ...state,
        loading: true,
      }
    case WeatherActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}
