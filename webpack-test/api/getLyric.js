import {commonParams} from 'common/url/config';
import {param} from 'common/jsonp/jsonp';
import {getLyricUrl} from 'common/url/url';

export function getLyric(mid){
	
	let url = getLyricUrl;
	
	const data = {
		format: 'json',
		songmid: mid, 
		platform:'yqq',
		hostUin: 0,
		needNewCode: 0,
		categoryId: 10000000,
		pcachetime: +new Date(),
		...commonParams
	}
	
	url += (url.indexOf('?')<0 ? '?' : '&') + param(data);
	 
	return url;
	
}
