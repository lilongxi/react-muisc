import {normalizeSongs} from 'reduxd/common/normalize';

function requestSingerDeatil(state){
	return {
				...state,
				isFetching: true,
				didInvalidate: false,
				isPosts: false
	}
}

function receiveSingerDeatil(state, action){
	return{
				...state,
				isFetching: false,
				didInvalidate: false,
				isPosts: false,
				posts: normalizeSongs(action.posts),
				lastUpdate: action.lastUpdate
		}
}


function invalidateSingerDeatil(state){
	return {
				...state,
				didInvalidate: true
			}
}


function failSingerDeatil(state){
	return {
				...state,
				isPosts: true,
				isFetching: false,
				didInvalidate: false
			}
}

function updateSingerDetail(state){
	
}

export {requestSingerDeatil, 
		receiveSingerDeatil, 
		invalidateSingerDeatil, 
		failSingerDeatil}
