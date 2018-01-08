import {withRouter} from 'react-router-dom';
import search from 'css/search.css';
import BScroll from 'baseComponent/scroll/scroll';
import SearchBox from 'baseComponent/search-box/search-box';
import {fetchHotKeyIfNeed} from 'reduxd/action/getHotKeyAction';
import {HotKeyItem, HistoryKeyItem} from 'component/search';
import DumbSuggest from 'component/suggest';
import * as ActionCreators from 'reduxd/action/getSearchKeyAction';
import * as ActionCreatorsPlay from 'reduxd/action/getPlayModeAction';
import SingerClass from 'common/js/singer';
import {createSong} from 'common/js/song';
import {dispatchOnInsertItem} from 'reduxd/playModeAction';
import Loading from 'baseComponent/loading/loading';
import SearchList from 'baseComponent/search-list/search-list';
import ConfirmPortalBox from 'baseComponent/confirm/confirmPortal';

import {SEARCH_KEY, 
		SEARCH_MAX_LENGTH , 
		PLAY_KEY, 
		PLAY_MAX_LEN} from 'reduxd/common/cacheActionConfig.js';

const mapStateToProps = state => {
	const {getHotKeyReduce, getSearchKeyReduce, getPlayModeReduce} = state;
	return {
		getHotKeyReduce,
		getSearchKeyReduce,
		getPlayModeReduce
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchHotKeyIfNeed: (getHotKeyReduce) => {
			fetchHotKeyIfNeed && fetchHotKeyIfNeed(dispatch, getHotKeyReduce);
		},
		actions: Redux.bindActionCreators(ActionCreators, dispatch),
		actionPlayer: Redux.bindActionCreators(ActionCreatorsPlay, dispatch)
	}
}

@withRouter
@ReactRedux.connect(mapStateToProps, mapDispatchToProps)
@ReactCssModules(search, {allowMultiple: true})
class Search extends React.Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
		this.TYPE_SINGER = 'singer';
		this.state = {
			query: '',
			page: 1,
			showSinger: true,
			prepage: 20
		}
	}
	
	componentWillMount(){
		const {getHotKeyReduce, fetchHotKeyIfNeed, getSearchKeyReduce, actions} = this.props;
		const query = getSearchKeyReduce.query;
		fetchHotKeyIfNeed && fetchHotKeyIfNeed(getHotKeyReduce);
		//获取历史记录
		actions.getSearchHistory(getSearchKeyReduce, SEARCH_KEY);
		//检查store中的query值.数据持久化
		if(query) this.setState({query});
	}
	
	componentWillUnmount(){
		this.props.actions.setSearchQuery(this.state.query);
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
	
	onWatchPropsValue(query){
		this.initPageNumIfNeed && this.initPageNumIfNeed(query);
	}
	
	addQuery(query){
		this.initPageNumIfNeed && this.initPageNumIfNeed(query);
	}
	
	initPageNumIfNeed(query){
		const {getSearchKeyReduce} = this.props;
		const posts = getSearchKeyReduce.subbritPosts[query];
		let setPage;
		//如果没有posts是首次请求,page设置为1否则从当前状态树中取出page
		!posts ? setPage = this.state.page : setPage = posts.page;
		this._fetchSearchData && this._fetchSearchData(query, setPage);
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
	
	getPlayModeReduceFetch(item){
		const {actions, getPlayModeReduce} = this.props;
		actions.setSearchHistory(item, PLAY_KEY, PLAY_MAX_LEN);
		//重新获取props
		return getPlayModeReduce;
	}
	
	onWatchBeforeScrollStart(){
		//直接调用子组件方法
		this.searchBox.state.onWatchToBlur && this.searchBox.state.onWatchToBlur();
	}
	
	onWatchClearSearchKey(){
		//show confirm
		const {showFunc} = this.confirmPortalBox.confirmBox.state;
		showFunc && showFunc();
	}
	
	onWatchDeleteSearchKey(item){
		const {actions} = this.props;
		actions.delSearchHistory(item, SEARCH_KEY);
	}
	
	onWatchSelectItemKey(item){
		this.initPageNumIfNeed && this.initPageNumIfNeed(item);
	}
	
	onWatchCancelFunc(){
		const {hideFunc} = this.confirmPortalBox.confirmBox.state;
		hideFunc && hideFunc();
	}
	
	onWatchConfirmFunc(){
		const {actions} = this.props;
		const {hideFunc} = this.confirmPortalBox.confirmBox.state;
		actions.clearSearchHistory(SEARCH_KEY);
		hideFunc && hideFunc();
	}
	
	render() {
		
		const {getHotKeyReduce, getSearchKeyReduce} = this.props;
		const {query} = this.state;
		
		const searchBoxProps = {
			placeholder: '搜索歌手',
			query, 
			onWatchPropsValue: this.onWatchPropsValue.bind(this)
		}
		
		const hotKeyProps = {
			itemName: search.item,
			data: getHotKeyReduce.posts,
			slice: 10,
			addQuery: this.addQuery.bind(this)
		}
		
		const {subbritPosts, subbrit, search: searchKey} = getSearchKeyReduce;
		const {posts, isFetching, isMore} = subbritPosts[subbrit] || {posts: [], isFetching: true, isMore: true}
		const isEmpty = posts.length === 0;
		
		const searchKeyProps = {
			posts,
			isMore,
			onWatchScrollToEndF: this.onWatchScrollToEndF.bind(this),
			onWatchSelectItem: this.onWatchSelectItem.bind(this),
			onWatchBeforeScrollStart: this.onWatchBeforeScrollStart.bind(this)
		}
		
		const searchKeyHistoryPorps = {
			searchKey,
			onWatchDeleteSearchKey: this.onWatchDeleteSearchKey.bind(this),
			onWatchSelectItemKey: this.onWatchSelectItemKey.bind(this)
		}
		
		const confirmProps = {
			text: '是否清空',
			onWatchCancelFunc: this.onWatchCancelFunc.bind(this),
			onWatchConfirmFunc: this.onWatchConfirmFunc.bind(this)
		}
		
		return(
			<div styleName="search">
			    <div styleName="search-box-wrapper">
			      <SearchBox 
			      	ref={searchBox => this.searchBox = searchBox} 
			      	{...searchBoxProps}></SearchBox>
			    </div>
			    {
			    		
			    		query === '' ?
			    		<div ref="shortcutWrapper" styleName="shortcut-wrapper">
				      <BScroll ref="shortcut" styleName="shortcut" >
				        <div>
				          <div styleName="hot-key">
				            <h1 styleName="title">热门搜索</h1>
				            <HotKeyItem  {...hotKeyProps} />
				          </div>
				          {
				          	searchKey.length !== 0 &&
				          	<div styleName="search-history">
					            <h1 styleName="title">
					              <span styleName="text">搜索历史</span>
					              <span 
					              styleName="clear" 
					              onClick = {this.onWatchClearSearchKey.bind(this)}
					              >
					                <i styleName="icon-clear">垃圾桶</i>
					              </span>
					            </h1>
					           {<SearchList {...searchKeyHistoryPorps} />}
					         </div>
				          }
				          
				        </div>
				      </BScroll>
				    </div> :
				    <div styleName="search-result">
				    		{
				    			(isEmpty || isFetching) ?
				    			<Loading /> :
				    			<DumbSuggest 
					        	ref = {dumbSuggest => this.dumbSuggest = dumbSuggest} 
					        	{...searchKeyProps} />
				    		}
				    </div>
			    }
		<ConfirmPortalBox 
		{...confirmProps}
		ref={confirmPortalBox => this.confirmPortalBox = confirmPortalBox} />
  		</div>
		);
	}
}

export default Search;