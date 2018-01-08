import {REQUEST_SEARCH_KEY,
		RECEIVE_SEARCH_KEY,
		FAIL_SEARCH_KEY,
		INVALIDATE_SEARCH_KEY,
		SELECT_SEARCH_KEY,
		SET_SUBBRIT_PAGE,
		SET_SUBBRIT_HASMORE,
		SET_SEARCH_QUERY,
		SET_SEARCH_HISTORY,
		GET_SEARCH_HISTORY,
		DELETE_SEARCH_HISTORY,
		CLEAR_SEARCH_HISTORY} from 'reduxd/actionCreators/getSearchKeyActionCreators';
		

import {getSearch} from 'api/getHotKey';
import {getResult} from 'reduxd/common/normalize'
import {ERR_OK} from 'common/url/config';

function requestSearchKey(keyword){
	return {
		type: REQUEST_SEARCH_KEY,
		keyword
	}
}


function receiveSearchKey(data, keyword, page){
	return {
		type: RECEIVE_SEARCH_KEY,
		keyword,
		posts: data,
		page: page,
		lastUpdate: Date.now()
	}
}

function invalidateSearchKey(keyword){
	return {
		type: INVALIDATE_SEARCH_KEY,
		keyword
	}
}

function failSearchKey(keyword){
	return {
		type: FAIL_SEARCH_KEY,
		keyword
	}
}

function selectSubbrit(subbrit){
	return {
		type: SELECT_SEARCH_KEY,
		subbrit
	}
}

/*
 * 设置page
 */

function setSubbritPage(keyword, page){
	return {
		type: SET_SUBBRIT_PAGE,
		keyword,
		page
	}
}

/*
 * 是否存在剩余歌曲检查
 */

function setSubbritHasMore(keyword){
	return {
		type: SET_SUBBRIT_HASMORE,
		keyword,
	}
}

/*
 * 设置当前页面query
 */

function needSetSearchQuery(query){
	return {
		type: SET_SEARCH_QUERY,
		query
	}
}

const setSearchQuery = newQuery => (dispatch, getState) => {
	
	const {query} = getState().getSearchKeyReduce;
	
	newQuery !== query ? dispatch(needSetSearchQuery(newQuery)) : Promise.resolve();
	
}

/*
 * 设置搜索历史
 */

function setSearchHistory(keyword, GET_TYPE, GET_LENGTH){
	return {
		type: SET_SEARCH_HISTORY,
		keyword,
		get_type: GET_TYPE,
		get_length: GET_LENGTH
	}
}


function delSearchHistory(keyword, GET_TYPE){
	return {
		type: DELETE_SEARCH_HISTORY,
		keyword,
		get_type: GET_TYPE
	}
}

function clearSearchHistory(GET_TYPE){
	return {
		type: CLEAR_SEARCH_HISTORY,
		get_type: GET_TYPE
	}
}


function getIfNeedSearchHistory(GET_TYPE){
	return {
		type: GET_SEARCH_HISTORY,
		get_type: GET_TYPE
	}
}

//function getSearchHistory(GET_TYPE){
//	return {
//		type: GET_SEARCH_HISTORY,
//		get_type: GET_TYPE
//	}
//}

const getSearchHistory = (state, GET_TYPE) => (dispatch) => {
	
	if(state[GET_TYPE] && state[GET_TYPE].length === 0){
		
		return dispatch(getIfNeedSearchHistory(GET_TYPE));
		
	}else{
		
		Promise.resolve();
		
	}
	
}

function shouldFetchPosts(state = {}, data){
	
	const {subbritPosts} = state.getSearchKeyReduce;
	const posts = subbritPosts[data.query];
	
	if(!posts){
		return true;
	}else if(posts.page !== data.page){
		return true;
	}else if(posts.isFetching){
		return posts.isFetching;
	}else{
		return posts.didInvalidate;
	}

}


const fetchSearchKey = data => (dispatch, getState) => {
	
	const {query, prepage, callback , page} = data;
	const preStatePosts = getState().getSearchKeyReduce.subbritPosts[query];
	
	dispatch(requestSearchKey(query));
	getSearch(data)
	.then(response => {
		if(response.code === ERR_OK){
			/*
			 * 如果preStatePosts存在，则证明下拉刷新
			 */
			if(!preStatePosts){
				dispatch(receiveSearchKey(getResult && getResult(response.data), query, page));
			}else{
				/*
				 * 添加新数据
				 */
				let statePosts = getResult && getResult(response.data);
				
				if(statePosts[0].singername && statePosts[0].singerid){
					statePosts = statePosts.slice(1, statePosts.length);
				}
				
				let nextStatePosts = preStatePosts.posts.concat(statePosts);
				dispatch(receiveSearchKey(nextStatePosts, query, page));
				
			}
			
			/*
			 * 处理获取数据回传的callback
			 */
			
			callback && callback(response.data, prepage);
	
		}
	})
	.catch(e => dispatch(failSearchKey(query)))
	
}

const fetchSearchKeyIfNeed = data => (dispatch, getState) => {
	
	if(shouldFetchPosts(getState(), data)){
		
		return dispatch(fetchSearchKey(data))
		
	}else{
		Promise.resolve()
	}
	
	
}


export {fetchSearchKeyIfNeed, 
		selectSubbrit, 
		setSubbritPage, 
		setSubbritHasMore,
		setSearchQuery,
		setSearchHistory,
		getSearchHistory,
		delSearchHistory,
		clearSearchHistory};


