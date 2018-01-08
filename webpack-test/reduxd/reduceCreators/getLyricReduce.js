
import { 
	REQUEST_SINGER_LYRIC,
	RECEIVE_SINGER_LYRIC,
	FAIL_SINGER_LYRIC
	} from 'reduxd/actionCreators/getLyricActionCreators';

const initalLyric = {
	isFetching: false,
	isPosts: false,
	posts: null
}

function postsBySingerLyric(state = initalLyric , action){
	switch(action.type){
		case REQUEST_SINGER_LYRIC:
			return {
				...state,
				isFetching: true
			}
		case RECEIVE_SINGER_LYRIC:
			return {
				...state,
				isFetching: false,
				isPosts: false,
				posts: action.posts,
				id: action.id,
				lastUpdate: action.lastUpdate
			}
		case FAIL_SINGER_LYRIC:
			return {
				...state,
				isPosts: true
			}
		default:
			return state;
	}
}

export {postsBySingerLyric}
