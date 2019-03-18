import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'; 
import thunk from 'redux-thunk';

import reducerTracks from './store/reducers/reducerTracks'; 
import reducerMap from './store/reducers/reducerMap'; 

const rootReducer = combineReducers({
    rTracks: reducerTracks,
    rMap: reducerMap
});

const store = createStore(rootReducer, applyMiddleware(thunk));


ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
