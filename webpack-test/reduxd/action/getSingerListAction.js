import {REQUEST_SINGER, 
		RECEIVE_SINGER, 
		FAIL_SINGER } 
from 'reduxd/actionCreators/getSingerListCreators';

import {getSingerList} from 'api/getSingerList';
import {ERR_OK} from 'common/url/config';


//请求歌曲列表
function requestsSingerList(singer){
	return {
		type: REQUEST_SINGER,
		singer
	}
}

//接收歌曲列表
function receiveSingerList(singer, data){
	return{
		type: RECEIVE_SINGER,
		singer,
		posts: data,
		lastUpdate: Date.now()
	}
}


function failSingerList(singer){
	return {
		type: FAIL_SINGER,
		singer
	}
}

//歌曲列表响应式缓存
function shouldFetchPosts(state = {}, singer){
	const posts = state.getSingerListReduce[singer];
	if(!posts){
		return true
	}else if(posts.isFetching){
		return false;
	}
}

const  fetchSinger = singer => (dispatch, getState) => {
	//请求
	dispatch(requestsSingerList(singer));
	return getSingerList()
		   .then(response => {
		   	  response.code === ERR_OK && dispatch(receiveSingerList(singer, response.data.list));
		   })
		   .catch(e => {
		   	  dispatch(failSingerList(singer));
		   })
}

export const fetchSingerIfNeed = singer => (dispatch, getState) => {
	
	if(shouldFetchPosts(getState(), singer)){
		return dispatch(fetchSinger(singer));
	}else{
		Promise.resolve();
	}

}
