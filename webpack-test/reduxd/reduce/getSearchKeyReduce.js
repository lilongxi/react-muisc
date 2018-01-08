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


import {fetchSerachKey,
		fetchSubbrit,
		fetchSubbritPage,
		fetchSubbritHasMore,
		fetchSeatchQuery,
		searchHistory} from 'reduxd/reduceCreators/getSearchKeyReduceCreators';
		

const initail = {
	search: [],
	play: [],
	favorite: [],
	subbrit: null,
	query: '',
	subbritPosts: {}
}

function postBySearchKeyQuery(state=initail, action){
	switch(action.type){
		case REQUEST_SEARCH_KEY:
		case RECEIVE_SEARCH_KEY:
		case FAIL_SEARCH_KEY:
		case INVALIDATE_SEARCH_KEY:
		
		return fetchSerachKey && fetchSerachKey(state, action);
		
		case SELECT_SEARCH_KEY:
		
		return fetchSubbrit && fetchSubbrit(state, action);
		
		case SET_SUBBRIT_PAGE:
		
		return fetchSubbritPage && fetchSubbritPage(state, action);
		
		case SET_SUBBRIT_HASMORE:
		
		return fetchSubbritHasMore && fetchSubbritHasMore(state, action);
		
		case SET_SEARCH_QUERY:
		
		return fetchSeatchQuery && fetchSeatchQuery(state, action);
		
		case SET_SEARCH_HISTORY:
		case GET_SEARCH_HISTORY:
		case DELETE_SEARCH_HISTORY:
		case CLEAR_SEARCH_HISTORY:
		
		return searchHistory && searchHistory(state, action);
		
		default:
		return state;
		
	}
}


export default postBySearchKeyQuery;
