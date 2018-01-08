import goodStorage from 'good-storage';
import {SEARCH_KEY, 
		PLAY_KEY, 
		FAVORITE_KEY} from 'reduxd/common/cacheActionConfig';

function insertArray(arr, val, compare, maxlen){
	
	const index = arr.findIndex(compare);
	
	if(index === 0) return;
	
	if(index > 0) {
		arr.splice(index, 1);
	}
	arr.unshift(val);
	
	if(maxlen && arr.length > maxlen) arr.pop();
	
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

function saveStorage(query, type, length){
	
	let searches = goodStorage.get(type, []);
	
	switch(type){
		
		default:
		case SEARCH_KEY:
			insertArray(searches, query, item => {
				return item === query
			}, length);
			break;
		case PLAY_KEY:
		case FAVORITE_KEY:
			insertArray(searches, query, item => {
				return item.id === query.id
			}, length);
			break;
		
	}
	
	goodStorage.set(type, searches);
	
	return searches;
	
}


function getStorage(type){
	
	let searches = goodStorage.get(type, []);
	
	return searches;
}

function deleteSearch(query, type) {
  let searches = goodStorage.get(type, [])
  
  switch(type){
		
		default:
		case SEARCH_KEY:
			 deleteFromArray(searches, item => {
			    return item === query
			  })
			break;
		case PLAY_KEY:
		case FAVORITE_KEY:
			 deleteFromArray(searches, item => {
			    return item.id === query.id
			  })
			break;
		
	}
 
  goodStorage.set(type, searches);
  return searches
}
 
 
function clearSearch(type) {
  goodStorage.remove(type);
  return []
}



export {saveStorage, 
		getStorage, 
		clearSearch, 
		deleteSearch}
