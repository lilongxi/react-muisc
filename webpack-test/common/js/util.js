/*
 * 洗牌算法shuffle
 */


function getRandom(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffle(arr){
	let current = [].concat(arr);
	for(let i = 0; i < current.length; i++){
		let j = getRandom(0, i);
		[current[j], current[i]] = [current[i], current[j]]
	}
	return current;
}


function debounce(func, delay){
	
	let timer;
	
	return function(...args){
		
		if(timer){
			clearTimeout(timer);
		} 
		
		timer = setTimeout(() => {
			func && func.apply(this, args);
		}, delay)
		
	}
	
}


export {shuffle, debounce}
