import {Base64} from 'js-base64';
import {
	SET_SINGER, 
	CLEAR_SINGER,
	REQUEST_SINGER_LYRIC,
	RECEIVE_SINGER_LYRIC,
	FAIL_SINGER_LYRIC
	} from 'reduxd/actionCreators/getLyricActionCreators';

/*
 * 异步请求singer lyric
 */

/*
 * lyric url
 */

import {getLyric} from 'api/getLyric';
import {ERR_OK} from 'common/url/config';

function shouldResetSinger(getState, singer){
	
	const singerState = getState.getPlayModeReduce.singer;
	
	if(!singerState[singer]){
		return true;
	}else{
		return false;
	}
}

function postSetSinger(singer){
	return {
		type: SET_SINGER,
		singer
	}
}

const setSinger = singer => (dispatch, getState) => {
	if(shouldResetSinger(getState(), singer)){
		return dispatch(postSetSinger(singer))
	}else{
		Promise.resolve();
	}
}

//清空所有singer

function clearSinger(){
	return {
		type: CLEAR_SINGER
	}
}

/*
 * mid 歌手对应id，
 * id：歌手列表下歌曲对应id
 */


//fetch 数据
//const fetchSingerLyric = 

//发起请求
function requestSingerLyric(mid, id){
	return {
		type: REQUEST_SINGER_LYRIC,
		mid,
		id
	}
}

//接收请求
function receiveSingerLyric(data, mid, id){
	return {
		type: RECEIVE_SINGER_LYRIC,
		mid,
		id,
		posts: data,
		lastUpdate: Date.now()
	}
}

//请求失败
function failSingerLyric(mid, id){
	return {
		type: FAIL_SINGER_LYRIC,
		mid,
		id
	}
}

function shouldFecthLyric(state={}, {mid, id}){
	const posts = state.getPlayModeReduce.singer[mid];
	const is = posts && posts[id];
	
	if(!is){
		return true;
	}else if(is.isFetching){
		return false;
	}
	
}

const fetchLyricPosts = (mid, id, callback) => (dispatch, getState) => {
	dispatch(requestSingerLyric(mid, id));
	IsomorphicFetch(getLyric && getLyric(id))
	.then(respones => respones.json())
	.then(res => {
		if(res.code === ERR_OK){
			let post = Base64.decode(res.lyric);
			dispatch(receiveSingerLyric(post, mid, id));
			return callback;
		}
	})
	.then(callback => {
		callback && callback();
	})
	.catch(e => dispatch(failSingerLyric(mid, id)))
}

const fetchLyricPostsIfNeed = (mid, id, callback) => (dispatch, getState) => {
	if(shouldFecthLyric(getState(), {mid, id})){
		return dispatch(fetchLyricPosts(mid, id, callback))
	}else{
		Promise.resolve(callback && callback())
	}
}

export {
	setSinger,
	clearSinger,
	fetchLyricPostsIfNeed
}
