import {REQUEST_SINGER_DETAIL, 
		RECEIVE_SINGER_DETAIL,
		FAIL_SINGER_DETAIL,
		INVALIDATE_SINGER_DETAIL,
		UPDATE_SINGET_DETAIL}
from 'reduxd/actionCreators/getSingerDetailCreators';

import {getSingerDetail} from 'api/getSingerList';
import {ERR_OK} from 'common/url/config';

//更新歌曲

function updateSingerDeatil(posts, mid){
	return {
		type: UPDATE_SINGET_DETAIL,
		posts,
		mid
	}
}

//请求歌曲信息
function requestsSingerDetail(mid){
	return {
		type: REQUEST_SINGER_DETAIL,
		mid
	}
}

//接受信息
function receiveSingerDetail(mid, data){
	return {
		type: RECEIVE_SINGER_DETAIL,
		mid,
		posts: data || [],
		lastUpdate: Date.now()
	}
}

//刷新
function invalidateSingerDetail(mid){
	return {
		type: INVALIDATE_SINGER_DETAIL,
		mid
	}
}

function failSingerDetail(mid){
	return {
		type: FAIL_SINGER_DETAIL,
		mid
	}
}

function shouldFetchPosts(state = {}, mid){

	const posts = state.postsBySingerDetail[mid];
	if(!posts){
		return true
	}else if(posts.isFetching){
		return false
	}else{
		return posts.didInvalidate
	}
}

const fetchDetail = mid => (dispatch, getState) => {
	dispatch(requestsSingerDetail(mid));
	return getSingerDetail(mid)
			.then(response => {
				response.code === ERR_OK && dispatch(receiveSingerDetail(mid, response.data.list));
			})
			.catch(e => {
				dispatch(failSingerDetail(mid))
			})
}

const fetchDetailIfNeed = mid => (dispatch, getState) => {
	if(shouldFetchPosts(getState(), mid)){
		return dispatch(fetchDetail(mid))
	}else{
		Promise.resolve();
	}
}

export {fetchDetailIfNeed, updateSingerDeatil}
