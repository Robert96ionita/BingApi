import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import UserReducers from './reducers/UserReducers';

const store = createStore(UserReducers, applyMiddleware(thunkMiddleware,), devToolsEnhancer());

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root')
);