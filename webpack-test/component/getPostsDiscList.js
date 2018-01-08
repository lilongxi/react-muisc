import {withRouter} from 'react-router-dom';
import component from 'css/component.css';
import LazyLoad from 'react-lazyload';

@withRouter
@ReactCssModules(component, {allowMultiple:true})
class PostsDiscList extends React.Component{
	
	constructor(props){
	  super(props);
	  this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
  	}
	
	onPushSongList(item){
		return
		const {history} = this.props;
		history.push({
		  	pathname: `/recommend/${item.dissid}`,
		  	query:item
		  })
	}
	
	render(){
		
		const {postsDiscList} = this.props;
		
		return (
	
  			<div styleName="partul">
  				{
  					postsDiscList.map((item, i) => (
	      					<p styleName="partli" 
	      					   key={item.dissid} 
	      					   onClick={this.onPushSongList.bind(this, item)}>
			      				<p styleName="partimg">
			      					<img src={item.imgurl} />
			      				</p>
			      				<p styleName="partcontent">
			      					<p>{item.creator.name}</p>
			      					<p>{item.dissname}</p>
			      				</p>
			      			</p>
      				))
  				}
      		</div>
		)
	}
}

export default PostsDiscList;