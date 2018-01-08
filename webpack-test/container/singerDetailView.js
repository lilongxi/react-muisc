import {withRouter} from 'react-router-dom';
//处理歌单列表数据
import * as ActionCreateors from 'reduxd/action/gerSingerDetailAction'; 
//处理音乐播放
import * as ActionCreateorsPlayer from 'reduxd/action/getPlayModeAction';
//播放记录
import {setSearchHistory} from 'reduxd/action/getSearchKeyAction';
import Loading from 'baseComponent/loading/loading';
import NoResult from 'baseComponent/no-result/no-result';
import singer from 'css/singer.css';
import MusicList from 'component/musicList';
import AnimateWrapper from 'hightComponent/animateWrapper';
import MusicWrapper from 'hightComponent/musicWrapper';


const mapStateToProps = state => {
	const {postsBySingerDetail, getPlayModeReduce, getSearchKeyReduce} = state;
	return {
		postsBySingerDetail,
		getPlayModeReduce,
		getSearchKeyReduce
	}
}

const mapDispatchToProps = dispatch => {
	return {
		actions:Redux.bindActionCreators(ActionCreateors, dispatch),
		actionPlayer: Redux.bindActionCreators(ActionCreateorsPlayer, dispatch),
		setSearchHistory: (query, KEY, MAX_LEN) => {
			dispatch(setSearchHistory(query, KEY, MAX_LEN));
		}
	}
}


@withRouter
@ReactRedux.connect(mapStateToProps, mapDispatchToProps)
@MusicWrapper({key: 'detailist'})
@AnimateWrapper({type:'fadeInRight', key:'detail'})
@ReactCssModules(singer, {allowMultiple:true})
class singerDetailView extends React.Component{
	
	constructor(props){
		super(props);
		this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
	}
	
	componentWillMount(){
		const {history, getMusicListDeatil} = this.props;
		if(!history.location.query){
			history.goBack()
		}else{
			getMusicListDeatil && getMusicListDeatil('fetchDetailIfNeed', history.location.query);
		}
	}
	
	
	render(){
		const {postsBySingerDetail, getPlayModeReduce, history, location, onSelectItemList, onRandomPlayList} = this.props;
		const {name, avatar, id} = location.query || {name: '', avatar:'', id: -1}
		
		const {isFetching, posts} = postsBySingerDetail[id] || {isFetching: true, posts: []};
		const isEmpty = posts.length === 0;
		
		const props = { data: postsBySingerDetail[id], 	
						query:{name, avatar, id}, 
						history,
						_onSelectItem: onSelectItemList,
						_onRandomPlay: onRandomPlayList
						}
		
		return (
			<div styleName="singer-detail">
				{
					!isEmpty ? !isFetching && <MusicList {...props} /> : isFetching ? <Loading /> : <NoResult />
				}
			</div>
		)
	}
}

export default singerDetailView;