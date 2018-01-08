import SingerClass from 'common/js/singer';
import {createSong} from 'common/js/song';

const HOT_NAME = '热门',
	  HOT_LENGTH = 10,
	  TYPE_SINGER = 'singer';
	  
function normalizeSinger(posts){
	
  	let map = {
  		hot: {
  			title: HOT_NAME,
  			items: []
  		}
  	}
  	
  	posts.forEach((item, index) => {
  		if(index < HOT_LENGTH){
  			map.hot.items.push(new SingerClass({
  				id: item.Fsinger_id,
  				name: item.Fsinger_name,
  				mid: item.Fsinger_mid
  			}))
  		}
  		
  		//与map中数据对比
  		const key = item.Findex;
  		
  		if(!map[key]){
  			map[key] = {
  				title: key,
  				items: []
  			}
  		}
  		
  		map[key].items.push(new SingerClass({
  				id: item.Fsinger_id,
  				name: item.Fsinger_name,
  				mid: item.Fsinger_mid
  			}));
  	}); 	
  	
  	//获取有序列表
	let hot = [],
		ret = [];
	
	for (let key in map) {
		let val = map[key]
		if(val.title.match(/[a-zA-Z]/)){
			ret.push(val)
		}else if(val.title === HOT_NAME){
			hot.push(val)
		}
	}
	
	//ret排序,字母排序
	ret.sort((a,b) => {
		return a.title.charCodeAt(0) - b.title.charCodeAt(0)
	})
	
	return hot.concat(ret);
  	
}

function normalizeSongs(posts){
	let ret = [];
	posts.forEach((item) => {
		let {musicData} = item;
		if(musicData.songid && musicData.albummid){
			ret.push(createSong(musicData))
		}
	});
	return ret;
}

function normalizeRank(posts){
	let ret = [];
	posts.forEach((item) => {
		let musicData = item.data;
		if(musicData.songid && musicData.albummid){
			ret.push(createSong(musicData))
		}
	});
	return ret;
}

function getResult(posts){
	
	let ret = [];
	
	if(posts.zhida && posts.zhida.singerid){
		ret.push({
			...posts.zhida,
			...{type: TYPE_SINGER}
		})
		
	}
	
	if(posts.song){
		ret = ret.concat( posts.song.list)
	}
	
	return ret;
	
}

function _normalizeResult(list){
	let ret = [];
	list.forEach(musicData => {
		if(musicData.sondid && musicData.albumid){
			ret.push(createSong(musicData))
		}
	})
	
	return ret;
}

export {normalizeSinger, normalizeSongs, normalizeRank, getResult}
