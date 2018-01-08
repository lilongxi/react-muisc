import {commonParams, options} from 'common/url/config';
import {jsonp} from 'common/jsonp/jsonp';
import {getHotKeyUrl, getSearchUrl} from 'common/url/url';

export function getHotKey(){
	let url = getHotKeyUrl;
	
	const data = {
		uin: 0,
		needNewCode: 1,
		platform: 'h5',
		format: 'jsonp',
		...commonParams
	}
	
	return jsonp(url, data, options);
	
}


export function getSearch({query, page ,showSinger, prepage}){
	
	let url = getSearchUrl;
	
	const data = {
		format: 'jsonp',
		w: query,
		p: page,
		perpage: prepage,
		n: prepage,
		catZhida: showSinger ? 1 : 0,
		zhidaqu: 1,
		t:0,
		flag: 1,
		ie: 'utf-8',
		sem: 1,
		aggr: 0,
		remoteplace: 'txt.mqq.all',
		uin: 0,
		needNewCode: 1,
		platform: 'h5',
		...commonParams
	}
	
	return jsonp(url, data, options);
	
}
