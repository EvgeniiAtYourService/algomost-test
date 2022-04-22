import {
  CityData,
  WeatherAction,
  WeatherActionTypes,
  WeatherState,
} from '../types/weather'

const initialState: WeatherState = {
  citiesData: null,
  isFetchingCities: true,
  weatherData: null,
  weatherData3h: null,
  isFetchingWeather: false,
  isFetchingWeather3h: false,
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
        isFetchingWeather: false,
        error: null,
      }
    case WeatherActionTypes.GET_WEATHER_3H:
      return {
        ...state,
        weatherData3h: action.payload,
        isFetchingWeather3h: false,
        error: null,
      }
    case WeatherActionTypes.GET_CITIES:
      let citiesData = [...action.payload]

      // для этих городов нет локализованных названий в API
      for (let city of citiesData) {
        switch (city.name) {
          case 'Queens':
            city.localizedName = 'Куинс'
            break
          case 'Seongnam-si':
            city.localizedName = 'Соннам'
            break
          case 'Goyang-si':
            city.localizedName = 'Коян'
            break
          case 'Gustavo Adolfo Madero':
            city.localizedName = 'Густаво Адольфо Мадеро'
            break
          case 'León':
            city.localizedName = 'Леон-де-лос-Альдама'
            break
          case 'Ecatepec de Morelos':
            city.localizedName = 'Экатепек-де-Морелос'
            break
          default:
            break
        }
      }

      // получить массив локализованных названий и сортировать в алфавитном порядке
      const cityNamesRu = citiesData.map((city) => city.localizedName)
      const collator = new Intl.Collator('ru')
      cityNamesRu.sort(collator.compare)

      // сортировать массив городов на основе массива локализованных названий
      const result: Array<CityData> = []
      cityNamesRu.forEach((nameRu) => {
        let found = false
        citiesData = citiesData.filter((city) => {
          if (!found && city.localizedName === nameRu) {
            result.push(city)
            found = true
            return false
          } else return true
        })
      })

      return {
        ...state,
        citiesData: result,
        isFetchingCities: false,
        error: null,
      }
    case WeatherActionTypes.SET_FETCHING_WEATHER:
      return {
        ...state,
        isFetchingWeather: action.payload,
      }
    case WeatherActionTypes.SET_FETCHING_WEATHER_3H:
      return {
        ...state,
        isFetchingWeather3h: action.payload,
      }
    case WeatherActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isFetchingWeather: false,
        isFetchingCities: false,
      }
    default:
      return state
  }
}
