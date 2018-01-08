import {jsonp, param} from 'common/jsonp/jsonp';
import {getSingerListUrl, getSingerDetailUrl} from 'common/url/url';
import {commonParams, options} from 'common/url/config';

export function getSingerList(){
	const data = {
		format:'jsonp',
		channel:'singer',
		page:'list',
		key:'all_all_all',
		pagesize:100,
		pagenum:1,
		hostUin:0,
		needNewCode:0,
		platform:'yqq',
		...commonParams
	}
	
	return jsonp(getSingerListUrl, data, options);
}


export function getSingerDetail(singerId){
	const data = {
		hostUin:0,
		needNewCode:0,
		platform:'yqq',
		order:'listen',
		begin: 0,
		num: 100,
		songstatus: 1,
		singermid: singerId,
		...commonParams
	}
	
	return jsonp(getSingerDetailUrl, data, options);
}
