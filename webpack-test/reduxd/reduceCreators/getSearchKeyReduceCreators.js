
import * as getSearchKeyAction from 'reduxd/actionCreators/getSearchKeyActionCreators';

const {REQUEST_SEARCH_KEY,
		RECEIVE_SEARCH_KEY,
		FAIL_SEARCH_KEY,
		INVALIDATE_SEARCH_KEY,
		SELECT_SEARCH_KEY,
		SET_SUBBRIT_PAGE,
		SET_SUBBRIT_HASMORE,
		SET_SEARCH_QUERY,
		GET_SEARCH_HISTORY,
		SET_SEARCH_HISTORY,
		DELETE_SEARCH_HISTORY,
		CLEAR_SEARCH_HISTORY} =  getSearchKeyAction;

import {saveStorage, 
		getStorage, 
		clearSearch, 
		deleteSearch} from 'reduxd/common/cache';

import {SEARCH_KEY,
		PLAY_KEY,
		FAVORITE_KEY} from 'reduxd/common/cacheActionConfig';
		
const initialSearch = {
	isFetching: false,
	isPosts: false,
	didInvalidate: false,
	page: 0,
	isMore: true,
	posts: []
}


function postsSearchKeyReduce(state = initialSearch, action){
	
	switch(action.type){
		
		case REQUEST_SEARCH_KEY:
		return {
			...state,
			isFetching: true
		}
		case RECEIVE_SEARCH_KEY:
		return {
			...state,
			isFetching: false,
			isPosts: false,
			didInvalidate: false,
			posts: action.posts,
			page: action.page,
			lastUpdate: action.lastUpdate
		}
		case FAIL_SEARCH_KEY:
		return {
			...state,
			isFetching: false,
			isPosts: true,
			didInvalidate: false,
		}
		case INVALIDATE_SEARCH_KEY:
		return {
			...state,
			didInvalidate: true,
		}
		default:
		return state;
	}
	
}

function fetchSerachKey(state = {}, action){
	
	return {
			...state,
			subbritPosts: {
				...state.subbritPosts,
				[action.keyword]: postsSearchKeyReduce(state[action.keyword], action)
			}
		}
	
}


function fetchSubbrit(state={}, action){
	return {
			...state,
			subbrit: action.subbrit
		}
}

function fetchSubbritPage(state={}, action){
	return {
			...state,
			subbritPosts: {
				...state.subbritPosts,
				[action.keyword]: {
					...state.subbritPosts[action.keyword],
					page: action.page
				}
			}
		}
}

function fetchSubbritHasMore(state={}, action){
	return {
			...state,
			subbritPosts: {
				...state.subbritPosts,
				[action.keyword]: {
					...state.subbritPosts[action.keyword],
					isMore: false
				}
			}
		}
}


function fetchSeatchQuery(state={}, action){
	
	return {
		...state,
		query: action.query
	}
	
}

/*
 * storage reduce
 */


function searchHistory(state={}, action){
	
	switch(action.type){
		
		case SET_SEARCH_HISTORY:
		
			return fetchSearchHistory && fetchSearchHistory(state, action);
		
		case GET_SEARCH_HISTORY:
		
			return fetchGetSearchHistory && fetchGetSearchHistory(state, action);
			
		case DELETE_SEARCH_HISTORY:
			
			return fetchDelSearchHistory && fetchDelSearchHistory(state, action);
		
		case CLEAR_SEARCH_HISTORY:
		
			return fetchClrSearchHistory && fetchClrSearchHistory(state, action);
		
		default:
			
			return state;
		
	}
	
}

function fetchDelSearchHistory(state={}, action){
	
	switch(action.get_type){
		case SEARCH_KEY:
		case PLAY_KEY:
		case FAVORITE_KEY:
			return {
				...state,
				[action.get_type]: deleteSearch && deleteSearch(action.keyword, action.get_type)
			}
		default:
			return state;
	}
}

function fetchClrSearchHistory(state={}, action){
	switch(action.get_type){
		case SEARCH_KEY:
		case PLAY_KEY:
		case FAVORITE_KEY:
			return {
				...state,
				[action.get_type]: clearSearch && clearSearch(action.get_type)
			}
		default:
			return state;
	}
}


function fetchSearchHistory(state={}, action){
	
	const {keyword, get_type, get_length} = action;
	
	switch(get_type){
		case SEARCH_KEY:
		case PLAY_KEY:
		case FAVORITE_KEY:
			return {
				...state,
				[get_type]: saveStorage && saveStorage(keyword, get_type , get_length)
			}
		default:
			return state;
	}
	 
}

function fetchGetSearchHistory(state={}, action){
	switch(action.get_type){
		case SEARCH_KEY:
		case PLAY_KEY:
		case FAVORITE_KEY:
			return {
				...state,
				[action.get_type]: getStorage && getStorage(action.get_type)
			}
		default:
			return state;
	}
}



export {fetchSerachKey, 
		fetchSubbrit, 
		fetchSubbritPage,
		fetchSubbritHasMore,
		fetchSeatchQuery,
		searchHistory};
