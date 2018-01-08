//节流函数
export function throttle(method, delay, duration){
		var timer = null,
			that = this,
			getStart = new Date();
		return function(){
			
			let context = that,
				args = arguments,
				getEnd = new Date();
			
			clearTimeout(timer);
			
			if(getEnd - getStart > duration){
				method.apply(context, args);
				getStart = getEnd;
			}else{
				timer = setTimeout(() => {
					method.apply(context, args);
				}, delay);
			}
			
		}
}

//防抖
export function debounce(method, delay, immediate){
	let timeout, result;
	let undebounced = function(){
		//this指向与事件类型
		let context = this,
			args = arguments;
		
		if(timeout)clearTimeout(timeout);
		//立即执行
		if(immediate){
			
			let callNow = !timeout;
			timeout = setTimeout(() => {
				timeout = null;
			},delay);
			if(callNow){
				result = method.apply(context, args);
			}
			
		}else{
			timeout=	setTimeout(() => {
				method.apply(context, args)
			}, delay);
		}
		
		return result;
	}
	
	undebounced.cancel = function(){
		clearTimeout(timeout);
		timeout = null;
	}
	
	return undebounced;
}