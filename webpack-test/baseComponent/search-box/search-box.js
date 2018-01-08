import searchbox from 'baseComponent/search-box/search-box.css';
import {debounce} from 'common/js/util';

@ReactCssModules(searchbox, {allowMultiple:true})
class SearchBox extends React.Component{
	
	constructor(props){
		super(props);
	  	this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
	  	this.state = {
	  		placeholder: this.props.placeholder || '搜索歌曲、歌手',
	  		value: '',
	  		onWatchToBlur: this.onWatchToBlur.bind(this)
	  	}
	}
	
	componentDidMount(){
		const {query: value} = this.props;
		if(value) this.setState({value}, () => {
			this.def.value = value;
		});
	}
	
	componentWillReceiveProps(nextProps){
		if(!nextProps.query) return;
		const value = nextProps.query.trim();
		this.setState({value}, () => {
			this.def.value = value;
		});
	}

	inputContent(){
		this.onChangeContent && this.onChangeContent(this.def.value);
	}
	
	clearContent(){
		this.onChangeContent && this.onChangeContent('');
	}
	
	onChangeContent(value){
		const {onWatchPropsValue} = this.props;
		this.setState({value}, () => {
			this.def.value = value;
			onWatchPropsValue && onWatchPropsValue(value);
		});
	}
	
	onWatchToBlur(){
		this.def.blur();
	}
	
	render(){
		
		const {placeholder, value} = this.state;
		
		return (
			<div styleName="search-box">
			    <i styleName="icon-search">🔍</i>
			    <input 
			    ref={def => this.def = def}
			    onKeyDown = { debounce( () => { this.inputContent() } , 500) }
			    styleName="box" 
			    placeholder={placeholder} />
			    {
			    	 value !== '' &&  <i onClick={this.clearContent.bind(this)} styleName="icon-dismiss">✘</i>
			    }
			  </div>
		)
	}
}


export default SearchBox;