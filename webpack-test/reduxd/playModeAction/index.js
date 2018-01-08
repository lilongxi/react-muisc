import {Mode} from 'reduxd/common/config';
import {shuffle} from 'common/js/util';
/*
 * 歌曲播放的所有action设置
 */

/*
 * 设置歌曲播放状态
 */
function findIndex(list, song){
	return list.findIndex(item => {
		return item.id === song.id
	})
}

const initalNum = -1;

const dispatchOnSelectItem = data => {
	
	let {posts, index, action, reduce} = data;
	
	if(reduce.mode === Mode.random){
		//如果是随机播放，重新计算数组和当前曲目id
		//设置playlist
		let randomList = shuffle(posts);
		action.setPlayList(randomList);
		index = findIndex(randomList, posts[index]);
	}else{
		//设置playlist
		action.setPlayList(posts);
	}
	
	//mid
	//	action.setCurrentMid(mid);
	//设置SET_SEQUENCE_LIST
	action.setSequenceList(posts);
	//setCurrentIndex
	action.setCurrentIndex(index);
	//屏幕状态开启
	action.setFullScreen(true);
	//播放状态开启
	action.setPlayingState(true);
}

//收起
const dispatchOnSlideBack = action => {
	action.setFullScreen(false);
}

const dispatchOnSlideUp = action => {
	action.setFullScreen(true);
}

/*
 * 歌曲播放暂停
 */

const dispatchTogglePlaying = (action, playing) => {
	action.setPlayingState(!playing)
}


/*
 * 上一曲下一曲
 */

const dispatchOnSong = (action, index) => {
	action.setCurrentIndex(index);
}

/*
 * 歌曲mode
 */

const dispatchOnMode = (action, mode) => {
	action.setPlayMode(mode)
}

const dispatchOnPlayList = (action, list) => {
	action.setPlayList(list);
}

/*
 * musiclist设置random
 */

const dispatchOnRandom = (action, list) => {
	action.setPlayMode(Mode.random);
	//设置SET_SEQUENCE_LIST
	action.setSequenceList(list);
	//设置playlist
	action.setPlayList(shuffle(list));
	action.setCurrentIndex(0);
	action.setPlayingState(true);
	action.setFullScreen(true);
}


/*
 * 歌词设置
 */

const dispatchOnLyric = data => {
	let {action, mid} = data;
	action.setSinger(mid);
}

/*
 * 异步获取当前歌曲歌词
 */

const dispatchOnSingleLyric = data => {
	const {mid, action, post, callback} = data;
	action.fetchLyricPostsIfNeed(mid, post.mid, callback);
}

/*
 * 歌曲歌词播放状态
 */

const dispatchOnLyricFlag = (action, lyric) => {
	action.setLyricFlag(lyric);
}


const dispatchOnCurrentMid = (action, mid) => {
	action.setCurrentMid(mid);
}


/*
 * 歌曲的插入
 */

const dispatchOnInsertItem = data => {
	
	const {actionPlayer, getPlayModeReduce, item, callback} = data;
	let {playlist, sequenceList, currentIndex} = getPlayModeReduce;
	
	//记录当前歌曲
	
	let currentSong = playlist[currentIndex];
	
	//判断如果是相同歌曲则不做计算
	
	if(currentSong && item){
		if(currentSong.id === item.id){
			actionPlayer.setFullScreen(true);
			return
		}
	}
	
	//查找当前列表中待插入的索引
	let fpIndex = findIndex(playlist, item);
	
	//插入歌曲将索引加1
	currentIndex++;
	//插入到这搜歌的当前索引位置
	playlist.splice(currentIndex, 0, item);
	//歌曲是否存在
	if(fpIndex > -1){
		//如果当前索引大于列表中的序号
		if(currentIndex > fpIndex){
			playlist.splice(fpIndex, 1);
			currentIndex--;
		}else{
			playlist.splice(fpIndex + 1, 1);
		}
	}
	
	
	let currentSIndex = findIndex(sequenceList, currentSong) + 1;
	let fsIndex = findIndex(sequenceList, item);
	sequenceList.splice(currentSIndex, 0, item);
	
	if(fsIndex > -1){
		
		if(currentSIndex > fsIndex){
			sequenceList.splice(fsIndex, 1);
		}else{
			sequenceList.splice(fsIndex + 1, 1);
		}
		
	}
	
	
	
	let mid = item.source[0] || '',
		itemMid = item.mid;
	
	actionPlayer.setPlayList(playlist);
	actionPlayer.setSequenceList(sequenceList);
	actionPlayer.setSinger(mid);
	actionPlayer.setCurrentMid(mid);
	actionPlayer.setCurrentIndex(currentIndex);
	actionPlayer.setFullScreen(true);
	actionPlayer.fetchLyricPostsIfNeed(mid, itemMid, () => {
		
		let sourceData = callback && callback();
		let sourcePost = sourceData.singer[mid];
		
		actionPlayer.setLyricFlag(sourcePost[itemMid]);
		actionPlayer.setPlayingState(true);
	});
	
	
}


//删除歌曲
const dispatchOnDeleteItem = data => {
	
	let {item, actions, playlist, sequenceList, currentIndex, currentMid, callback} = data;
	let playListRange = [...playlist];
	let sequenceListRange = [...sequenceList];
	let pIndex = findIndex(playListRange, item);
	let sIndex = findIndex(sequenceListRange, item);
	let songmid;
	playListRange.splice(pIndex, 1);
	sequenceListRange.splice(sIndex, 1);
	
	if(currentIndex > pIndex || currentIndex === playListRange.length){
		currentIndex--;
	}
	
	
	actions.setPlayList(playListRange);
	actions.setSequenceList(sequenceListRange);
	actions.setCurrentIndex(currentIndex);
	//如果列表被删完

	if(!playListRange.length){
		actions.setPlayingState(false);
		return;
	}
	songmid = playListRange[currentIndex].mid;
	actions.fetchLyricPostsIfNeed(currentMid, songmid, () => {
		let sourceData = callback && callback();
		let sourcePost = sourceData.singer[currentMid];
		
		actions.setLyricFlag(sourcePost[songmid]);
		actions.setPlayingState(true);
	})
	
}


const dispatchOnDeleteAll = data => {
	data.actions.setPlayList([]);
	data.actions.setSequenceList([]);
	data.actions.setPlayingState(false);
	data.actions.setCurrentIndex(initalNum);
}


//设置喜欢歌曲
const dispatchOnSongLike = data => {
	
	const {actions, getPlayModeReduce, item, updateSingerDeatil} = data;
	const likeFunc = function(list){
		return list.map(song => {
				if(item.id !== song.id) return song;
				return {
					...song,
					like: !song.like
				}
			});
	}
	let playListRange = null;
	let sequenceListRange = null;
	let Range = likeFunc && likeFunc(getPlayModeReduce.sequenceList);
	
	if(getPlayModeReduce.mode === Mode.random){
		playListRange = likeFunc && likeFunc(getPlayModeReduce.playlist);
	}else{
		playListRange = [...Range];
	}
	
	sequenceListRange = [...Range];
	
	actions.setPlayList(playListRange);
	actions.setSequenceList(sequenceListRange);
	updateSingerDeatil && updateSingerDeatil(sequenceListRange, getPlayModeReduce.currentMid);
	
}

export {dispatchOnSelectItem, 
		dispatchOnSlideBack, 
		dispatchOnSlideUp, 
		dispatchTogglePlaying,
		dispatchOnSong,
		dispatchOnMode,
		dispatchOnPlayList,
		dispatchOnRandom,
		dispatchOnLyric,
		dispatchOnSingleLyric,
		dispatchOnLyricFlag,
		dispatchOnCurrentMid,
		dispatchOnInsertItem,
		dispatchOnDeleteItem,
		dispatchOnDeleteAll,
		dispatchOnSongLike}
