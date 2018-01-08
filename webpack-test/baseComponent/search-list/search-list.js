
import searchlist from 'baseComponent/search-list/search-list.css';

@ReactCssModules(searchlist,{allowMultiple: true})
class SearchList extends React.Component{
	
	constructor(props){
		super(props);
		this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
	}
	
	render(){
		
		const {searchKey, onWatchDeleteSearchKey, onWatchSelectItemKey} = this.props;
		
		return (
			<div styleName="search-list" >
			  {
			  	searchKey.length !== 0 &&
			  	searchKey.map((item, index) => (
			  		<li key="item" styleName="search-item">
				        <span 
				        styleName="text"
				        onClick = {onWatchSelectItemKey && onWatchSelectItemKey.bind(this, item)}
				        >{item}</span>
				        <span 
				        styleName="icon"
				        onClick = {onWatchDeleteSearchKey && onWatchDeleteSearchKey.bind(this,item)}
				        >
				          <i styleName="icon-delete">x</i>
				        </span>
				    </li>
			  	))
			  }
			</div>
		)
		
	}
	
}


export default SearchList;