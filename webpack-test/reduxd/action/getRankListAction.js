import {
	REQUEST_RANKLIST,
	RECEIVE_RANKLIST,
	FAIL_RANKLIST
} from 'reduxd/actionCreators/getRankListCreators';

import {getTopList} from 'api/getRank';
import {ERR_OK} from 'common/url/config';

function RequestRanklist(rank){
	return {
		type: REQUEST_RANKLIST,
		rank
	}
}


function ReceiveRanklist(data, rank){
	return {
		type: RECEIVE_RANKLIST,
		rank,
		posts: data,
		lastUpdate: Date.now()
	}
}


function FailRanklist(rank){
	return {
		type: FAIL_RANKLIST,
		rank
	}
}


const fetchRankList = rank => (dispatch, getState) => {
	dispatch(RequestRanklist(rank));
	getTopList()
	.then(response => {
		response.code === ERR_OK && dispatch(ReceiveRanklist(response.data.topList, rank));
	})
	.catch(e => dispatch(FailRanklist(rank)));
}

function shouldUpdateRank(rank, state = {}){
	
	const posts = state.getRankListReduce[rank];
	
	if(!posts){
		return true;
	}else if(posts.isFetching){
		return posts.isFetching;
	}
	
}


export const fetchRankListIfNeed = rank => (dispatch, getState) => {
	
	if(shouldUpdateRank(rank, getState())){
		return dispatch(fetchRankList(rank))
	}else{
		Promise.resolve();
	}
	
}
