import logger from 'redux-logger';
import RootReduce from 'reduxd/combineReducers';
import thunk from 'redux-thunk';

const {createStore, applyMiddleware} = Redux;
var env = process.env.NODE_ENV;
var middleWare = [thunk];

if(env === 'dev'){
	middleWare = [...middleWare, logger]
}

export const store = applyMiddleware(...middleWare)(createStore)(RootReduce);

