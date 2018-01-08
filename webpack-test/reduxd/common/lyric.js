import {dispatchOnLyricFlag} from 'reduxd/playModeAction';
import {PLAY_KEY, PLAY_MAX_LEN} from 'reduxd/common/cacheActionConfig';

function getLyric(action, post){
	/*
		 * 接收两个参数
		 * 当前触发的歌曲
		 * 获取歌曲lineNum和txt的回调
		 * 
		 */
		
		if(!post) return;
		const {getPlayModeReduce, setSearchHistory} = this.props;
		const {currentMid, singer, lyric} = getPlayModeReduce;
		const id = post.mid;
		const poster = singer[currentMid];
		
		if(poster){
			setSearchHistory && setSearchHistory(post, PLAY_KEY, PLAY_MAX_LEN);
			dispatchOnLyricFlag(action, poster[id]);	
		}
}

export {getLyric};
