
import songlist from 'baseComponent/songList/songList.css';

@ReactCssModules(songlist, {allowMultiple: true})
class SongList extends React.Component{
	
	constructor(props){
		super(props);
		this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			rank: this.props.rank || false
		}
	}
	
	render(){
		/*
		 * _onSelectItem数据相关操作在smart组件执行,见singerDetailView
		 */
		const {data, _onSelectItem} = this.props;
		const {isFetching, didInvalidate, posts} = data;
		const {rank} = this.state;
		
		return (
			<div styleName="song-list">
		    <ul>
		    		{
		    			!isFetching && 
		    			posts.map((item, index) => (
	    					<li onClick={_onSelectItem.bind(this, posts, index)} styleName="item" key={item.id}>
	    						{
	    							rank && 
	    							<div styleName="rank">
						          <span styleName={index <= 2 ? `icon icon${index}` : `text`}>
						          	 {index > 2 ? index + 1 : `ABC`.charAt(index) }
						          </span>
						        </div>
	    						}
					        <div styleName="content">
					          <h2 styleName="name">{item.name}</h2>
					          <p styleName="desc">
					          	{item.singer}{`.`}{item.album}
					          </p>
					        </div>
					     </li>
		    			))
		    		}
		      
		    </ul>
		  </div>
		)
	}
}

export default SongList;
