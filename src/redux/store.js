// store.js
import { combineReducers, createStore } from 'redux';
import surahReducer  from './reducers';

const rootReducer = combineReducers({
  surah: surahReducer
});

const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;






