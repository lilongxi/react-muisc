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
 * 引入异步action, 获取歌曲歌词
 */

import {setSinger,
		fetchLyricPostsIfNeed} from 'reduxd/action/getLyricAction';

/*
 * 同步action
 */

function setPlayingState(playing){
	return {
		type: SET_PLAYING_STATE,
		playing
	}
}


function setFullScreen(fullScreen){
	return {
		type: SET_FULL_SCREEN,
		fullScreen
	}
}

function setPlayList(playlist){
	return {
		type: SET_PLAYLIST,
		playlist
	}
}


function setSequenceList(sequenceList){
	return {
		type: SET_SEQUENCE_LIST,
		sequenceList
	}
}

function setPlayMode(mode){
	return {
		type: SET_PALY_MODE,
		mode
	}
}

function setCurrentIndex(currentIndex){
	return {
		type: SET_CURRENT_INDEX,
		currentIndex
	}
}


function setCurrentMid(currentMid){
	return {
		type: SET_CURRENT_MID,
		currentMid
	}
}

/*
 * 是否重新获取歌词
 */

function setLyricFlag(lyric){
	return {
		type: SET_LYRIC_FLAG,
		lyric
	}
}

/*
 * 喜欢
 */

function setSongLike(like){
	return {
		type: SET_SONG_LIKE,
		like
	}
}

export {
	setSinger,
	setPlayingState,
	setFullScreen,
	setPlayList,
	setSequenceList,
	setPlayMode,
	setCurrentIndex,
	setCurrentMid,
	setLyricFlag,
	fetchLyricPostsIfNeed,
	setSongLike
}
