import suggest from 'css/suggest.css';
import {filterSinger} from 'common/js/song';
import AnimateWrapper from 'hightComponent/animateWrapper';
import BScroll from 'baseComponent/scroll/scroll';

@AnimateWrapper({type:'example', key:'suggest'})
@ReactCssModules(suggest, {allowMultiple: true})
class Suggest extends React.Component{
	
	constructor(props){
		super(props);
		this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
		this.TYPE_SINGER = 'singer';
		this.state = {
			pullup: true,
			beforeScroll: true,
			buffer: 500
		}
	}
	
	render(){
		
		const { posts, 
				isMore,
				onWatchSelectItem, 
				onWatchBeforeScrollStart, 
				onWatchScrollToEndF} = this.props
		
		/*
		 * scroll状态派发
		 */
		
		const {pullup, buffer, beforeScroll} = this.state;
		const pullupScroll = {
			pullup,
			buffer,
			beforeScroll,
			onWatchScrollToEnd: onWatchScrollToEndF,
			onWatchBeforeScrollStart:onWatchBeforeScrollStart
		}
		
		return (
				<BScroll 
				ref={suggest => this.suggest = suggest} 
				styleName="suggest" {...pullupScroll}>
				<ul 
				ref={suggestUl => this.suggestUl = suggestUl} 
				styleName="suggest-list">
				  {
				  	posts.map((item, index) => (
				  		<li styleName="suggest-item" 
				  			onClick={onWatchSelectItem && onWatchSelectItem.bind(this, item)}>
					        <div styleName="icon">
					          <i>
					          	{item.type === this.TYPE_SINGER ? '😁': '🎵'}
					          </i>
					        </div>
					        <div styleName="name">
					          <p styleName="text">
					          	{item.type === this.TYPE_SINGER ? 
					          	item.singername : 
					          	`${item.songname}-${filterSinger(item.singer)}`}
					          </p>
					        </div>
					    </li>
				  	))
				  }
				  {
				  	!isMore && <li styleName="suggest-item suggest-nomore">没有更多啦</li>
				  }
			    </ul>
			    </BScroll>
		)
	}
	
}

export default Suggest
