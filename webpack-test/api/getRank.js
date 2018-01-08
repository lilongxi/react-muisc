import {jsonp, param} from 'common/jsonp/jsonp';
import {getTopListUrl, getTopidUrl} from 'common/url/url';
import {commonParams, options} from 'common/url/config';

function getTopList(){
	let url = getTopListUrl;
	
	const data = {
		format: 'jsonp',
		uin: 0,
		needNewCode: 1,
		platform: 'h5',
		...commonParams
	}
	
	return jsonp(url, data, options);
	
}

function getTopid(topid){
	let url = getTopidUrl;
	
	const data = {
		format: 'jsonp',
		topid,
		needNewCode: 1,
		uin: 0,
		tpl: 3,
		page: 'detail',
		type: 'top',
		platform: 'h5',
		...commonParams
	}
	
	return jsonp(url, data, options);
	
}

export {getTopList, getTopid}
