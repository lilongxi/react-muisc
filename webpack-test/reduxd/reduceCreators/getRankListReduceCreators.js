
/*
 * split reduce for ranklist
 */


function requestRankList(state = {}){
	return {
		...state,
		isFetching: true
	}
}


function receviceRankList(state = {}, action){
	return {
			...state,
			isFetching: false,
			isPosts: false,
			posts: action.posts,
			lastUpdate: action.lastUpdate
		}
}


function failRankList(state = {}){
	return {
		...state,
		isPosts: true,
		isFetching: false
	}
}


export {requestRankList, receviceRankList, failRankList}
