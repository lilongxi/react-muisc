
export function jsonp(url, data, option = {}){
	
	//判断？
	url += (url.indexOf('?')<0 ? '?' : '&') + param(data);
	
	return new Promise((resolve, reject) => {
		Jsonp(url, option, (err, data) => {
			!err ? resolve(data) : reject(err);
		})
	})
	
}


export function param(data){
	let url = "";
	for (var k in data) {
		let value = data[k] !== undefined ? data[k] : '';
		url += `&${k}=${encodeURIComponent(value)}`
	}
	
	return url ? url.substring(1) : ''; 
}
