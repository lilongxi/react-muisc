import {REQUEST_HOTKEY,
		RECEIVE_HOTKEY,
		FAIL_HOTKEY} from 'reduxd/actionCreators/getHotKeyActionCreators';


const initialHotKey = {
	isFetching: false,
	isPosts: false,
	posts: []
}


function postsByHotKey(state=initialHotKey, action){
	
	switch(action.type){
		case REQUEST_HOTKEY:
		return {
			...state,
			isFetching: true
		}
		
		case RECEIVE_HOTKEY:
		return {
			...state,
			isFetching: false,
			isPosts: false,
			posts: action.posts,
			lastUpdate: action.lastUpdate
		}
		
		case FAIL_HOTKEY:
		return {
			...state,
			isFetching: false,
			isPosts: true
		}
		default:
		return state;
	}
	
}

export default postsByHotKey;