//通过jsonp获取轮播图

import {jsonp, param} from 'common/jsonp/jsonp';
import {jsonpUrl, getDiscListUrl, getSongListUrl} from 'common/url/url';
import {commonParams, options} from 'common/url/config';

export function getRecommend(){
	const data = {
		platform: 'h5', 
		uin: 0, 
		needNewCode: 1,
		format: 'jsonp', 
		...commonParams
	}
	return jsonp(jsonpUrl, data, options)
}


export function getDiscList(){
	
	let url = getDiscListUrl;
	
	const data = {
		platform: 'yqq',
		hostUin: 0,
		format: 'json',
		sin: 0,
		ein: 29,
		sortId: 5,
		needNewCode: 0,
		categoryId: 10000000,
		rnd: 0.05959762305335237,
		...commonParams
	}
	
	 url += (url.indexOf('?')<0 ? '?' : '&') + param(data);
	 
	 return url;
}


export function getSongList(disstid){
	let url = getSongListUrl;
	
	const data = {
		disstid,
		format:'jsonp',
		type:1,
		json:1,
		utf8:1,
		onlysong:0,
		platform: 'yqq',
		hostUin:0,
		needNewCode: 0,
		...commonParams
	}
	
	url += (url.indexOf('?')<0 ? '?' : '&') + param(data);
	
	return url;
	
}
