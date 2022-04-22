import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { weatherReducer } from './reducers/weather-reducer'

const reducers = combineReducers({
  weatherState: weatherReducer,
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export type RootState = ReturnType<typeof reducers>

export default store
