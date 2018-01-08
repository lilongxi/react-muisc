import MusicList from 'component/musicList';
import {withRouter} from 'react-router-dom';
import Loading from 'baseComponent/loading/loading';
import NoResult from 'baseComponent/no-result/no-result';
import rank from 'css/rank.css';
import * as ActionCreateors from 'reduxd/action/getRankListDetailAction';
import * as ActionCreateorsPlayer from 'reduxd/action/getPlayModeAction';
import {setSearchHistory} from 'reduxd/action/getSearchKeyAction';
/*
 * 高阶
 */
import AnimateWrapper from 'hightComponent/animateWrapper';
import MusicWrapper from 'hightComponent/musicWrapper';

const mapStateToProps = state => {
	const {getPlayModeReduce, getRankListReduce} = state;
	const {rankListDetail} = getRankListReduce;
	return {
		getPlayModeReduce,
		rankListDetail
	}
}

const mapDispatchToProps = dispatch => {
	return {
		actions: Redux.bindActionCreators(ActionCreateors, dispatch),
		actionPlayer: Redux.bindActionCreators(ActionCreateorsPlayer, dispatch),
		setSearchHistory: (query, KEY, MAX_LEN) => {
			dispatch(setSearchHistory(query, KEY, MAX_LEN));
		}
	}
}

@withRouter
@ReactRedux.connect(mapStateToProps, mapDispatchToProps)
@MusicWrapper({key: 'ranklist'})
@AnimateWrapper({type:'fadeInRight', key:'ranklist'})
@ReactCssModules(rank, {allowMultiple:true})
class RankList extends React.Component{
	
	constructor(props){
		super(props);
		this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
	}
	
	componentWillMount(){
		const {history, getMusicListDeatil} = this.props;
		const {query} = history.location;
		!query ? history.goBack() : 
		getMusicListDeatil && getMusicListDeatil('fetchRanklistDetailIfNeed', query);
	}
	
	render(){
		const {location, rankListDetail, history,onSelectItemList, onRandomPlayList} = this.props;
		
		const {topTitle, picUrl, id} = location.query || {topTitle: '', picUrl:'', id: -1}
		const {isFetching, posts} = rankListDetail[id] || {isFetching: true, posts: []}
		const isEmpty = posts.length === 0;
		
		const props = {
			rank: true,
			query:{name: topTitle, avatar: picUrl, id},
			data: rankListDetail[id],
			history: history,
			_onSelectItem: onSelectItemList,
			_onRandomPlay: onRandomPlayList
		}
		
		return (
			<div styleName="ranklist">
				{
					!isEmpty ? !isFetching && <MusicList {...props} /> : isFetching ? <Loading /> : <NoResult />
				}
			</div>
		)
		
	}
	
}

export default RankList;