//action
import {REQUEST_RECOMMEND, 
		RECEIVE_RECOMMEND, 
		FAIL_RECOMMEND} 
from 'reduxd/actionCreators/getRecommendCreators';

//split reduce
import {requestRecommend, 
		receiveRecommend,
		failRecommend}
from 'reduxd/reduceCreators/getRecommendReduceCreators';

//初始
/*
 * isFetching:请求状态
 * isPosts:请求失败的状态。false成功，true失败
 */
const initalRecommend = {
	isFetching: false,
	isPosts: false,
	posts:[]
};

//异步请求recommend
function postsRecommend(state = initalRecommend, action){
	switch(action.type){
		case REQUEST_RECOMMEND:
			return requestRecommend && requestRecommend(state);
		case RECEIVE_RECOMMEND:
			return receiveRecommend && receiveRecommend(state, action);
		case FAIL_RECOMMEND:
			return failRecommend && failRecommend(state);
		default:
			return state;
	}
}

function postsByRecommend(state={}, action){
	switch(action.type){
		case REQUEST_RECOMMEND:
		case RECEIVE_RECOMMEND:
		case FAIL_RECOMMEND:
		return {
			...state,
			[action.recommends]:postsRecommend(state[action.recommends], action) 
		}
		default:
			return state;
	}
}

export default postsByRecommend;
