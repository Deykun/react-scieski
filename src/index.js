import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Scieski from './pages/Scieski';

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
    <Scieski />
</Provider>
, document.getElementById('root'));