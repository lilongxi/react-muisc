
/*
 * 组织同步reduce
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

function syncActionPlayMode(state={}, action){
	switch(action.type){
		case SET_PLAYING_STATE:
		return {
			...state,
			playing: action.playing
		}
		case SET_FULL_SCREEN:
		return {
			...state,
			fullScreen: action.fullScreen
		}
		case SET_PLAYLIST:
			return {
				...state,
				playlist: action.playlist
			}
		case SET_SEQUENCE_LIST:
		 	return {
				...state,
				sequenceList: action.sequenceList
			}
		case SET_PALY_MODE:
		return {
			...state,
			mode: action.mode
		}
		case SET_CURRENT_INDEX:
		return {
			...state,
			currentIndex: action.currentIndex
		}
		case SET_CURRENT_MID:
		return {
			...state,
			currentMid: action.currentMid
		}
		case SET_LYRIC_FLAG:
		return {
			...state,
			lyric: action.lyric
		}
		default:
		return state;
	}
	
}


/*
 * 组织异步reduce
 */

import {postsBySingerLyric} from 'reduxd/reduceCreators/getLyricReduce';
import {
	SET_SINGER, 
	CLEAR_SINGER,
	REQUEST_SINGER_LYRIC,
	RECEIVE_SINGER_LYRIC,
	FAIL_SINGER_LYRIC
	} from 'reduxd/actionCreators/getLyricActionCreators';

function asyncActionGetLyric(state = {}, action){
	switch(action.type){
		case SET_SINGER:
		return {
			...state,
			singer: {
				...state.singer,
				[action.singer]: {}
			}
		}
		
		case CLEAR_SINGER:
		return {
			...state,
			singer: {}
		}
		
		case REQUEST_SINGER_LYRIC:
		case RECEIVE_SINGER_LYRIC:
		case FAIL_SINGER_LYRIC:
		
		/*
		 * mid 对应歌手id
		 * id: 歌手对应歌曲id
		 */
		const {mid, id} = action;
		const idp = state.singer[mid];
		
		return {
				...state,
				singer: {
					...state.singer,
					[action.mid]: {
						...state.singer[mid],
						[action.id]: postsBySingerLyric(idp[id], action)
					}
				}
			}
		default:
		return state
	}
}

export {syncActionPlayMode, asyncActionGetLyric}