import { REQUEST_SINGER, 
		RECEIVE_SINGER, 
		FAIL_SINGER } 
from 'reduxd/actionCreators/getSingerListCreators';

import {requestSingerList, 
		receiveSingerList, 
		failSingerList}
from 'reduxd/reduceCreators/getSingerListReduceCreators';

const initailSingerList = {
	isFetching: false,
	isPosts: false,
	posts: []
}

//异步请求singerlist
function postsSingerList(state = initailSingerList, action) {
	switch(action.type) {
		case REQUEST_SINGER:
			return requestSingerList && requestSingerList(state);
		case RECEIVE_SINGER:
			return receiveSingerList && receiveSingerList(state, action);
		case FAIL_SINGER:
			return failSingerList && failSingerList(state);
		default:
			return state;
	}
}

function postsBySingerList(state={}, action){
	switch(action.type){
		case REQUEST_SINGER:
		case RECEIVE_SINGER:
		case FAIL_SINGER:
		return {
			...state,
			[action.singer]: postsSingerList(state[action.singer], action)
		}
		default:
		return state
	}
}

export default postsBySingerList;
