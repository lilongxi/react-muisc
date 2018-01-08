import {REQUEST_HOTKEY,
		RECEIVE_HOTKEY,
		FAIL_HOTKEY} from 'reduxd/actionCreators/getHotKeyActionCreators';
		
import {getHotKey} from 'api/getHotKey';
import {ERR_OK} from 'common/url/config';

function requestHotKey(){
	return {
		type: REQUEST_HOTKEY,
	}
}

function receiveHotKey(data){
	return{
		type: RECEIVE_HOTKEY,
		posts: data,
		lastUpdate: Date.now()
	}
}


function failHotKey(){
	return{
		type: FAIL_HOTKEY,
	}
}


const fetchHotKeyIfNeed = (dispatch, state) => {
	
	if(state.posts.length === 0){
		
		dispatch(requestHotKey && requestHotKey());
		
		getHotKey()
		.then(response => {
			ERR_OK === response.code && dispatch(receiveHotKey && receiveHotKey(response.data.hotkey))
		})
		.catch(e => dispatch(failHotKey && failHotKey()))
		
	}else{
		Promise.resolve()
	}
	
}

export {fetchHotKeyIfNeed};