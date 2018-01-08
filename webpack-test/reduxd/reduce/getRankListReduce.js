
import {
	REQUEST_RANKLIST,
	RECEIVE_RANKLIST,
	FAIL_RANKLIST,
	REQUEST_RANKLIST_DETAIL,
	RECEIVE_RANKLIST_DETAIL,
	FAIL_RANKLIST_DETAIL
} from 'reduxd/actionCreators/getRankListCreators';


import {requestRankList, 
		receviceRankList, 
		failRankList} from 'reduxd/reduceCreators/getRankListReduceCreators';

const initailRankList = {
	isFetching: false,
	isPosts: false,
	posts: []
}

const initailRank = {
	rankListDetail:{}
}

const initailRankListDetail = {...initailRankList};

function postsRankList(state = initailRankList, action){
	switch(action.type){
		case REQUEST_RANKLIST:
		return requestRankList && requestRankList(state);
		case RECEIVE_RANKLIST:
		return receviceRankList && receviceRankList(state, action);
		case FAIL_RANKLIST:
		return failRankList && failRankList(state);
		default:
		return state;
	}
}


function postsRankListDetail(state = initailRankListDetail, action){
	
	switch(action.type){
		case REQUEST_RANKLIST_DETAIL:
		return requestRankList && requestRankList(state);
		case RECEIVE_RANKLIST_DETAIL:
		return receviceRankList && receviceRankList(state, action);
		case FAIL_RANKLIST_DETAIL:
		return failRankList && failRankList(state);
		default:
		return state;
	}
	
}

function postsByRankList(state = initailRank, action){
	
	switch(action.type){
		case REQUEST_RANKLIST:
		case RECEIVE_RANKLIST:
		case FAIL_RANKLIST:
		return {
			...state,
			[action.rank]: postsRankList(state[action.rank],action)
		}
		case REQUEST_RANKLIST_DETAIL:
		case RECEIVE_RANKLIST_DETAIL:
		case FAIL_RANKLIST_DETAIL:
		return {
			...state,
			rankListDetail: {
				...state.rankListDetail,
				[action.rankId]: postsRankListDetail(state.rankListDetail[action.rankId],action)
			}
		}
		default:
		return state;
	}

}


export default postsByRankList;