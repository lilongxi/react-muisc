import {REQUEST_RECOMMEND, 
		RECEIVE_RECOMMEND, 
		FAIL_RECOMMEND} from 'reduxd/actionCreators/getRecommendCreators';

//jsonp获取轮播
import {getRecommend, getDiscList} from 'api/getRecommend';
import {ERR_OK} from 'common/url/config';

//发起请求
function requestsRecommend(recommends){
	return {
		type: REQUEST_RECOMMEND,
		recommends
	}
}

//接收
function receiveRecommend(data, recommends){
	return {
		recommends,
		type: RECEIVE_RECOMMEND,
		posts: data,
		lastUpdate: Date.now()
	}
}

//请求失败
function failRecommend(recommends){
	return {
		type: FAIL_RECOMMEND,
		recommends
	}
}

function shouldFetchPosts(state = {}, recommend){
	const posts = state.getRecommendReduce[recommend];
	if(!posts){
		return true
	}else if(posts.isFetching){
		return false
	}
}

//获取recommend
const fetchRecommendData = (recommend, dispatch) => {
	getRecommend()
	  .then(res => {
	  	//成功
		res.code === ERR_OK && dispatch(receiveRecommend(res.data.slider, recommend));
	   })
	  .catch(err => {
	  	//失败
	  	dispatch(failRecommend(recommend))
	  })
}

//获取歌单
const fetchgetDiscListData = (recommend, dispatch) => {
	IsomorphicFetch(getDiscList && getDiscList())
		.then(response => response.json())
	   	.then(res => res.code === ERR_OK && dispatch(receiveRecommend(res.data.list, recommend)) )
	   	.catch(e => {
	   		dispatch(failRecommend(recommend))
	   	})
}

const fetchPosts = recommend => (dispatch, getState) => {
	dispatch(requestsRecommend(recommend));
	switch(recommend){
		case 'Recommend':
			fetchRecommendData(recommend, dispatch);
			break;
		case 'getDiscList':
			fetchgetDiscListData(recommend, dispatch);
			break;
		default:
			break;
	}
}

export const fetchPostsIfNeed = recommend => (dispatch, getState) => {
	if(shouldFetchPosts(getState(), recommend)){
		return dispatch(fetchPosts(recommend))
	}else{
		Promise.resolve();
	}
}
