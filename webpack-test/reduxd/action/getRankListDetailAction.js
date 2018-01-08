
import {
	REQUEST_RANKLIST_DETAIL,
	RECEIVE_RANKLIST_DETAIL,
	FAIL_RANKLIST_DETAIL
} from 'reduxd/actionCreators/getRankListCreators';

import {getTopid} from 'api/getRank';
import {ERR_OK} from 'common/url/config';
import {normalizeRank} from 'reduxd/common/normalize';

function requestRanklistDetail(rankId){
	return {
		type: REQUEST_RANKLIST_DETAIL,
		rankId
	}
}


function receiveRanklistDetail(data, rankId){
	return {
		type: RECEIVE_RANKLIST_DETAIL,
		rankId,
		posts: data,
		lastUpdate: Date.now()
	}
}


function failRanklistDetail(rankId){
	return {
		type: FAIL_RANKLIST_DETAIL,
		rankId
	}
}


const fetchRanklistDetail = rankId => (dispatch, getState) => {
	dispatch(requestRanklistDetail(rankId))
	getTopid(rankId)
	.then(response => {
		response.code === ERR_OK &&
		dispatch(receiveRanklistDetail(normalizeRank(response.songlist), rankId));
	})
	.catch(e => dispatch(failRanklistDetail(rankId)));
}


function shouldFetchRanklistDetail(rankId, state){
	
	const {rankListDetail} = state.getRankListReduce;
	const posts = rankListDetail[rankId];
	
	if(!posts){
		return true;
	}else if(posts.isFetching){
		return posts.isFetching;
	}
	
}


export const fetchRanklistDetailIfNeed = rankId => (dispatch, getState) => {
	
	if(shouldFetchRanklistDetail(rankId, getState())){
		return dispatch(fetchRanklistDetail(rankId))
	}else{
		Promise.resolve();
	}
	
}
