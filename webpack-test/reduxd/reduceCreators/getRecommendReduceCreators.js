
function requestRecommend(state){
	return {
		...state,
		isFetching: true
	}
}

function receiveRecommend(state, action){
	return {
		...state,
		isFetching: false,
		isPosts: false,
		posts: action.posts,
		lastUpdate: action.lastUpdate
	}
}

function failRecommend(state){
	return {
		...state,
		isPosts:true
	}
}

export {requestRecommend, receiveRecommend, failRecommend}
