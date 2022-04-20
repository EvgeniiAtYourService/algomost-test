import { AlertState, AlertAction, WeatherActionTypes } from '../types/weather'

const initialState: AlertState = {
  message: '',
}

const alertReducer = (
  state = initialState,
  action: AlertAction
): AlertState => {
  switch (action.type) {
    case WeatherActionTypes.SET_ALERT:
      return {
        message: action.payload,
      }
    default:
      return state
  }
}

export default alertReducer
