import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import combineReducers from './reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootSaga from './sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = composeWithDevTools({ trace:true })

const store = createStore(
  combineReducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(rootSaga, store.dispatch)

export default store
