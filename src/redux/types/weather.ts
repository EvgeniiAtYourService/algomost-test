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

interface Weather3HDescr {
  id: number
  main: string
  description: string
  icon: string
}

interface Weather3H {
  dt: number
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    sea_level: number
    grnd_level: number
    humidity: number
    temp_kf: number
  }
  weather: Weather3HDescr[]
  clouds: {
    all: number
  }
  wind: {
    speed: number
    deg: number
    gust: number
  }
  visibility: number
  pop: number
  sys: {
    pod: string
  }
  dt_txt: string
}

export interface Weather3HData {
  cod: string
  message: 0
  cnt: number
  list: Weather3H[]
  city: {
    id: string
    name: string
    coord: {
      lon: number
      lat: number
    }
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }
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
  localizedName: string
  coordinates: {
    latitude: number
    longitude: number
  }
}

export enum WeatherActionTypes {
  GET_WEATHER = 'GET_WEATHER',
  GET_CITIES = 'GET_CITIES',
  SET_FETCHING_WEATHER = 'SET_FETCHING_WEATHER',
  SET_ERROR = 'SET_ERROR',
  SET_ALERT = 'SET_ALERT',
  GET_WEATHER_3H = 'GET_WEATHER_3H',
  SET_FETCHING_WEATHER_3H = 'SET_FETCHING_WEATHER_3H',
}

export interface WeatherState {
  citiesData: Array<CityData> | null
  weatherData: WeatherData | null
  weatherData3h: Weather3HData | null
  isFetchingCities: boolean
  isFetchingWeather: boolean
  isFetchingWeather3h: boolean
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

interface SetFetchingWeatherAction {
  type: WeatherActionTypes.SET_FETCHING_WEATHER
  payload: boolean
}

interface SetError {
  type: WeatherActionTypes.SET_ERROR
  payload: string | null
}

interface getWeather3h {
  type: WeatherActionTypes.GET_WEATHER_3H
  payload: Weather3HData
}

interface setFetchingWeather3h {
  type: WeatherActionTypes.SET_FETCHING_WEATHER_3H
  payload: boolean
}

export type WeatherAction =
  | GetWeatherAction
  | SetFetchingWeatherAction
  | SetError
  | GetCities
  | getWeather3h
  | setFetchingWeather3h
