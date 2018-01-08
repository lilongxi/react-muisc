import {Mode} from 'reduxd/common/config';
import {syncActionPlayMode, asyncActionGetLyric} from 'reduxd/reduceCreators/getPlayModeReduceCreators';

/*
 * 同步action， 控制音乐状态
 */
import { 
	SET_PLAYING_STATE, 
	SET_FULL_SCREEN,
	SET_PLAYLIST,
	SET_SEQUENCE_LIST,
	SET_PALY_MODE,
	SET_CURRENT_INDEX,
	SET_CURRENT_MID,
	SET_LYRIC_FLAG,
	SET_SONG_LIKE
	} from 'reduxd/actionCreators/getPlayModeCreators'; 

/*
 * 异步action 获取歌词
 */

import {
	SET_SINGER, 
	CLEAR_SINGER,
	REQUEST_SINGER_LYRIC,
	RECEIVE_SINGER_LYRIC,
	FAIL_SINGER_LYRIC
	} from 'reduxd/actionCreators/getLyricActionCreators';


const initailModeState = {
	singer: {},
	playing: false,
	fullScreen: false,
	lyric: null,
	playlist: [],
	sequenceList: [],
	mode: Mode.sequence,
	currentIndex: -1,
	currentMid: -1
}

function getPlayModeReduce(state = initailModeState, action){
	switch(action.type){
		case SET_PLAYING_STATE:
		case SET_FULL_SCREEN:
		case SET_PLAYLIST:
		case SET_SEQUENCE_LIST:
		case SET_PALY_MODE:	
		case SET_CURRENT_INDEX:
		case SET_CURRENT_MID:
		case SET_LYRIC_FLAG:
		case SET_SONG_LIKE:
		
		return syncActionPlayMode && syncActionPlayMode(state, action);
		
		case SET_SINGER:
		case CLEAR_SINGER:
		case REQUEST_SINGER_LYRIC:
		case RECEIVE_SINGER_LYRIC:
		case FAIL_SINGER_LYRIC:
		
		return asyncActionGetLyric && asyncActionGetLyric(state, action);
		
		default:
		return state
	}
}

export default getPlayModeReduce;
