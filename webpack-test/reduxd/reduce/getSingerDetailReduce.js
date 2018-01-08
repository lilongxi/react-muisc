import {REQUEST_SINGER_DETAIL, 
		RECEIVE_SINGER_DETAIL,
		FAIL_SINGER_DETAIL,
		INVALIDATE_SINGER_DETAIL,
		UPDATE_SINGET_DETAIL}
from 'reduxd/actionCreators/getSingerDetailCreators';

import {requestSingerDeatil, 
		receiveSingerDeatil, 
		invalidateSingerDeatil, 
		failSingerDeatil} from 'reduxd/reduceCreators/getSingerDetailReduceCreator';

const initailSingerDetail = {
	isFetching: false,
	isPosts: false,
	didInvalidate: false,
	posts: []
}

function postsSingerDetail(state = initailSingerDetail, action){
	switch(action.type){
		case REQUEST_SINGER_DETAIL:
			return requestSingerDeatil && requestSingerDeatil(state)
		case RECEIVE_SINGER_DETAIL:
			return receiveSingerDeatil && receiveSingerDeatil(state, action)
		case INVALIDATE_SINGER_DETAIL:
			return invalidateSingerDeatil && invalidateSingerDeatil(state);
		case FAIL_SINGER_DETAIL:
			return failSingerDeatil && failSingerDeatil(state);
		default:
			return state
	}
}


function postsBySingerDetail(state = {}, action){
	switch(action.type){
		case REQUEST_SINGER_DETAIL:
		case RECEIVE_SINGER_DETAIL:
		case INVALIDATE_SINGER_DETAIL:
		case FAIL_SINGER_DETAIL:
		return {
			...state,
			[action.mid]: postsSingerDetail(state[action.mid], action)
		}
		case UPDATE_SINGET_DETAIL:
		
		return {
			...state,
			[action.mid]:{
				...state[action.mid],
				posts: action.posts
			}
		}
		
		default:
		return state;
	}
}


export {postsBySingerDetail};