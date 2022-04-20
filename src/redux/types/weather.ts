export interface Weather {
  description: string
  icon: string
  id: number
  main: string
}

export interface WeatherData {
  base: string
  clouds: {
    all: number
  }
  code: number
  coord: {
    lon: number
    lat: number
  }
  dt: number
  id: number
  main: {
    feels_like: number
    humidity: number
    pressure: number
    temp: number
    temp_max: number
    temp_min: number
  }
  name: string
  sys: {
    country: string
    message: number
    id: number
    sunrise: number
    sunset: number
    type: number
  }
  timezone: number
  visibility: number
  weather: Weather[]
  wind: {
    speed: number
    deg: number
  }
}

export interface WeatherError {
  cod: string
  message: string
}

export interface CityData {
  id: string
  geonameId: number
  type: string
  name: string
  population: number
  elevation: number
  timezoneId: string
  country: {
    id: string
    geonameId: number
    name: string
  }
  adminDivision1?: {
    id: string
    geonameId: number
    name: string
  }
  adminDivision2?: {
    id: string
    geonameId: number
    name: string
  }
  score: number
  coordinates: {
    latitude: number
    longitude: number
  }
}

export enum WeatherActionTypes {
  GET_WEATHER = 'GET_WEATHER',
  GET_CITIES = 'GET_CITIES',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  SET_ALERT = 'SET_ALERT',
}

export interface WeatherState {
  citiesData: Array<CityData> | null
  weatherData: WeatherData | null
  loading: boolean
  error: string | null
}

interface GetWeatherAction {
  type: WeatherActionTypes.GET_WEATHER
  payload: WeatherData
}

interface GetCities {
  type: WeatherActionTypes.GET_CITIES
  payload: CityData[]
}

interface SetLoadingAction {
  type: WeatherActionTypes.SET_LOADING
}

interface SetError {
  type: WeatherActionTypes.SET_ERROR
  payload: string | null
}

export type WeatherAction =
  | GetWeatherAction
  | SetLoadingAction
  | SetError
  | GetCities

export interface AlertAction {
  type: WeatherActionTypes.SET_ALERT
  payload: string
}

export interface AlertState {
  message: string
}
