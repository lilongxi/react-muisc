
import {normalizeSinger} from 'reduxd/common/normalize';

function requestSingerList(state){
	return {
		...state,
		isFetching: true
	}
}

function receiveSingerList(state, action){
	return {
		...state,
		isFetching: false,
		isPosts: false,
		posts: normalizeSinger(action.posts),
		lastUpdate: action.lastUpdate
	}
}

function failSingerList(state){
	return {
		...state,
		isPosts:true
	}
}

export {requestSingerList, receiveSingerList, failSingerList}
