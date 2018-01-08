//高阶
import * as ActionCreateors from 'reduxd/action/getRecommendAction';
import component from 'css/component.css';

import Loading from 'baseComponent/loading/loading';
import BScroll from 'baseComponent/scroll/scroll';
//dumb
import {PostsRecommend, PostsDiscList} from 'component/recommend';

const mapStateToProps = state => {
	const {Recommend, getDiscList} = state.getRecommendReduce
	return {
		Recommend,
		getDiscList
	}
}

const mapDispatchToProps = dispatch => {
	return {
		actions: Redux.bindActionCreators(ActionCreateors, dispatch)
	}
}

@ReactRedux.connect(mapStateToProps, mapDispatchToProps)
@ReactCssModules(component, {allowMultiple:true})
class Recommend extends React.Component {
  constructor(){
	  super();
	  this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
  }
  
  componentWillMount(){
  	this._getRecommend();
  }
  
  _getRecommend(){
  	const {actions} = this.props;
//	不同的action
  	actions.fetchPostsIfNeed('Recommend');
  	actions.fetchPostsIfNeed('getDiscList');
  }
  
  render() {
  	
	const {Recommend, getDiscList} = this.props;
	const {isFetching: isFetchingRecommend , posts: postsRecommend} = Recommend || {isFetching: true, posts:[]};
	const {isFetching: isFetchingDiscList , posts: postsDiscList} = getDiscList || {isFetching: true, posts:[]};
	const isEmptyRecommend = postsRecommend.length === 0;
	const isEmptyDiscList = postsDiscList.length === 0;
	
	const props = {
		className: component.listview
	}
  	
    return (
    		<div>
    		{
    			(!isEmptyRecommend && !isEmptyDiscList) ?
    			<BScroll {...props}>
		      	<div styleName="partside">
		      		{
		      			<PostsRecommend  postsRecommend={postsRecommend} />
		      		}
		      		<h3>获取热门歌单</h3>
			      	{	
			      		!isFetchingDiscList &&
			      		<PostsDiscList postsDiscList={postsDiscList} />
			      	}
		      	</div>
		     </BScroll> :
		     <Loading />
    		}
    		</div>
    );
  }
}

export default Recommend;