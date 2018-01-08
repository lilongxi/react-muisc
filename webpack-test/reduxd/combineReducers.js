import getRecommendReduce from 'reduxd/reduce/getRecommendReduce';
import getSingerListReduce from 'reduxd/reduce/getSingerListReduce';
import {postsBySingerDetail} from 'reduxd/reduce/getSingerDetailReduce';
import getPlayModeReduce from 'reduxd/reduce/getPlayModeReduce';
import getRankListReduce from 'reduxd/reduce/getRankListReduce'; 
import getHotKeyReduce from 'reduxd/reduce/getHotKeyReduce';
import getSearchKeyReduce from 'reduxd/reduce/getSearchKeyReduce';


export default Redux.combineReducers({
	getRecommendReduce,
	getSingerListReduce,
	postsBySingerDetail,
	getPlayModeReduce,
	getRankListReduce,
	getHotKeyReduce,
	getSearchKeyReduce
})
