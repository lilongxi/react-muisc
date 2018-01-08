
import load from 'baseComponent/loading/loading.css';

@ReactCssModules(load, {allowMultiple:true})
class Loading extends React.Component{
	
	constructor(){
		super();
	  	this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
	}
	
	render(){
		return (
			<div styleName="loading">
				正在载入...
			</div>
		)
	}
}


export default Loading;