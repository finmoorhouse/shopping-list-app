import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import itemsReducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(itemsReducers,composeEnhancers( applyMiddleware(thunk)))
console.log(store.getState())
console.log("Id is: ", localStorage.getItem('id'))
const unsubscribe = store.subscribe(() => console.log(store.getState()))

unsubscribe();

export default () => {
  return store;
};

