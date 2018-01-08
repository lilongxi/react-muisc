import {getLyric} from 'reduxd/common/lyric';
/*
 * 播放状态action
 */
import {dispatchOnSelectItem,
		dispatchOnRandom, 
		dispatchOnLyric,
		dispatchOnSingleLyric,
		dispatchOnSlideUp,
		dispatchOnCurrentMid,
		dispatchOnLyricFlag} from 'reduxd/playModeAction';

const musicWrapper = KeyType => WrapperComponent => class extends React.Component{
	
	constructor(props){
	  	super(props);
	  	this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
	  	this.state = {
	  		query: {}
	  	}
	}
	
	getMusicListDeatil(actionType, query){
		const {actions, actionPlayer} = this.props;
		actions[actionType](query.id);
		this.setState({query}, () => {
			dispatchOnLyric({
				action: actionPlayer,
				mid: query.id
			})
		});
	}
	
	
	
	onSelectItemList(posts, index){
		const {query} = this.state;
		const Qid = query.id;
		const {actionPlayer, getPlayModeReduce} = this.props;
		const {playlist, currentIndex} = getPlayModeReduce;
		
		if(query && Qid){
			
			if(playlist[currentIndex] && posts[index]){
				if(playlist[currentIndex].id === posts[index].id){
					dispatchOnSlideUp(actionPlayer);
					return
				}
			}
			
			//开始播放曲目
			dispatchOnSelectItem({
				posts: posts,
				index: index,
				action: actionPlayer,
				reduce: getPlayModeReduce
			});
			
			
			//获取当前曲目歌词
			dispatchOnSingleLyric({
				action: actionPlayer,
				mid: Qid,
				post: posts[index] || {},
				callback: getLyric && getLyric.bind(this, actionPlayer, posts[index])
			});
			
		}
	}
	
	onRandomPlayList(data){
		/*
		 * 控制musiclist内随机播放, musiclist为dumb组件不做任何与数据相关的工作
		 */
		const {actionPlayer, postsBySingerDetail, getPlayModeReduce} = this.props;
		
		const {query} = this.state;
		const id = query.id;
		dispatchOnCurrentMid(actionPlayer, id);
		data ? dispatchOnRandom(actionPlayer, data.posts) : dispatchOnRandom(actionPlayer, [])
		
		setTimeout(() => {
			const {getPlayModeReduce} = this.props;
			const rendomPosts = getPlayModeReduce.playlist;
			const rendomIndex = getPlayModeReduce.currentIndex;
			
			dispatchOnSingleLyric({
				action: actionPlayer,
				mid: id,
				post: rendomPosts[rendomIndex] || {},
				callback: getLyric && getLyric.bind(this, actionPlayer, rendomPosts[rendomIndex])
			});
		})
	}
	
	render(){
		
		/*
		 * 函数统一处理
		 */
		
		const props = {
			...this.props,
			getMusicListDeatil: this.getMusicListDeatil.bind(this),
			onSelectItemList: this.onSelectItemList.bind(this),
			onRandomPlayList: this.onRandomPlayList.bind(this)
		}
		
		return <WrapperComponent {...props} 
		key = {KeyType.key}
		ref={instanceComponent => this.instanceComponent = instanceComponent} />
		
	}
	
	
}


export default musicWrapper;