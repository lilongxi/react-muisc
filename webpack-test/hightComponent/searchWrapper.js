
import {SEARCH_KEY, 
		SEARCH_MAX_LENGTH , 
		PLAY_KEY, 
		PLAY_MAX_LEN} from 'reduxd/common/cacheActionConfig.js';

const searchWrapper = keyType => WrapperComponent => class extends React.Component{
	
	constructor(props){
		super(props);
		this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {...keyType.state || {}}
	}
	
	
	_fetchSearchData(query, page){
		const {showSinger, prepage} = this.state;
		const {actions} = this.props;
		this.setState({query}, () => {
			if(query === '') return;
			actions.selectSubbrit(query);
			actions.setSearchHistory(query, SEARCH_KEY, SEARCH_MAX_LENGTH);
			actions.fetchSearchKeyIfNeed({
				query, 
				page, 
				showSinger,
				prepage,
				callback: this.checkDataIsMore && this.checkDataIsMore.bind(this),
			});
		})
	}
	
	checkDataIsMore(data, prepage){
		const song = data.song;
		const {query} = this.state;
		const {actions} = this.props;
		if(!song.list.length || (song.curnum + song.curpage * prepage) > song.totalnum){
			actions.setSubbritHasMore(query);
		}
	}
	
	initPageNumIfNeed(query){
		const {getSearchKeyReduce} = this.props;
		const posts = getSearchKeyReduce.subbritPosts[query];
		let setPage;
		//如果没有posts是首次请求,page设置为1否则从当前状态树中取出page
		!posts ? setPage = this.state.page : setPage = posts.page;
		this._fetchSearchData && this._fetchSearchData(query, setPage);
	}
	
	/*
	 * search-box
	 */
	onWatchPropsValue(query){
		this.initPageNumIfNeed && this.initPageNumIfNeed(query);
	}
	
	/*
	 * suggest
	 */
	onWatchScrollToEndF(){
		const {query, prepage} = this.state;
		const {actions, getSearchKeyReduce} = this.props;
		const posts = getSearchKeyReduce.subbritPosts[query];
		
		//检查是否更新完毕
		if(!posts.isMore)return;
		let postsPage = posts.page;
		//请求结束后执行toelement回调
		this._fetchSearchData && this._fetchSearchData(query, postsPage + 1);
		
	}
	onWatchSelectItem(item){
		if(item.type === this.TYPE_SINGER){
			const {actionPlayer, history} = this.props;
			const singer = new SingerClass({
				id: item.singerid,
				name: item.singername,
				mid: item.singermid
			});
			history.push({
			  	pathname: `/search/${singer.mid}`,
			  	query: {
			  		id: singer.mid,
					name: singer.name,
					avatar: singer.avatar
				}
			});
			actionPlayer.setCurrentMid(singer.mid);
		}else{
			
			const {getPlayModeReduce, actionPlayer} = this.props;
			const songItem = createSong(item);
			
			dispatchOnInsertItem && dispatchOnInsertItem({
				actionPlayer,
				getPlayModeReduce,
				item: songItem,
				callback: this.getPlayModeReduceFetch && this.getPlayModeReduceFetch.bind(this, songItem)
			})
		}
	}
	
	onWatchBeforeScrollStart(){
		//直接调用子组件方法
//		this.searchBox.state.onWatchToBlur && this.searchBox.state.onWatchToBlur();
	}
	
	
	render(){
		
		const props = {
			...this.props,
			state: {...this.state},
			onWatchPropsValue: this.onWatchPropsValue.bind(this)
		}
		
		return <WrapperComponent 
				{...props}
				key = {keyType.key}
				ref = {instanceComponent => this.instanceComponent = instanceComponent}
				/>

	}
	
}

export default searchWrapper;
