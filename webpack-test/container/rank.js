import * as ActionCreateors from 'reduxd/action/getRankListAction';
import Loading from 'baseComponent/loading/loading';
import DumbRank from 'component/rank';
import {setCurrentMid} from 'reduxd/action/getPlayModeAction';

const mapStateToProps = state => {
	const {topList} = state.getRankListReduce;
	return {
		topList
	}
}

const mapDispatchToProps = dispatch => {
	return {
		actions: Redux.bindActionCreators(ActionCreateors, dispatch),
		currentMidAction: (id) => {
			dispatch(setCurrentMid(id))
		}
	}
}

@ReactRedux.connect(mapStateToProps, mapDispatchToProps)
class Rank extends React.Component {
	constructor(props){
		super(props);
		this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
	}
	
	componentWillMount(){
		this._getRankListData && this._getRankListData();
	}
	
	_getRankListData(){

		const {actions} = this.props;
		actions.fetchRankListIfNeed('topList');
		
	}
	
	_setSingerMid(id){
	  	this.props.currentMidAction(id);
	  }
	
  render() {
  	
  	const {topList} = this.props;
  	const {isFetching, posts} = topList || {isFetching: true, posts: []}
  	const isEmpty = posts.length === 0;
  	
  	const props = {
  		ranklist: posts,
  		_setSingerMid: this._setSingerMid.bind(this)
  	}
  	
    return !isEmpty ? !isFetching && <DumbRank {...props} /> : <Loading />
  }
}

export default Rank;