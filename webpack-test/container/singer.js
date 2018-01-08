import * as ActionCreateors from 'reduxd/action/getSingerListAction';
import {setCurrentMid} from 'reduxd/action/getPlayModeAction';
import singer from 'css/singer.css';

//dumb
import SingerList from 'component/singer';
import Loading from 'baseComponent/loading/loading';

import {	FAVORITE_KEY} from 'reduxd/common/cacheActionConfig';
import {getSearchHistory} from 'reduxd/action/getSearchKeyAction';

const mapStateToProps = state => {
	const {getSearchKeyReduce, getSingerListReduce} = state;
	
	return {
		SingerList: getSingerListReduce.SingerList,
		getSearchKeyReduce
	}
}

const mapDispatchToProps = dispatch => {
	return {
		actions: Redux.bindActionCreators(ActionCreateors, dispatch),
		currentMidAction: (id) => {
			dispatch(setCurrentMid(id))
		},
		getSearchHistory: (state, KEY) => {
			dispatch(getSearchHistory(state, KEY));
		}
	}
}

@ReactRedux.connect(mapStateToProps, mapDispatchToProps)
@ReactCssModules(singer, {allowMultiple:true})
class Singer extends React.Component {
  constructor(props){
		super(props);
		this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
  }
  
  componentWillMount(){
  	 this.props.getSearchHistory( this.props.getSearchKeyReduce, FAVORITE_KEY);
  }
  
  componentDidMount(){
  	 this._getSingerList();
  }
  
  _getSingerList(){
  	const {actions} = this.props;
  	actions.fetchSingerIfNeed('SingerList');
  }
  
  
  _setSingerMid(id){
  	this.props.currentMidAction(id);
  }
  
  render() {
  	
  	const {isFetching, isPosts, posts} = this.props.SingerList || {isFetching: true, isPosts: false, posts: []}
  	const isEmpty = posts.length === 0;
  	
  	const singerProps = {
  		...this.props,
  		singerProps: posts,
  		_setSingerMid: this._setSingerMid.bind(this)
  	}
  	
    return (
      <div styleName="partsinger">
		{
			isFetching ?
			<Loading /> :
			<SingerList {...singerProps} />
		}
      </div>
    );
  }
}

export default Singer;