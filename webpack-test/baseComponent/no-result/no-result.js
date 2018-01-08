import {withRouter} from 'react-router-dom';
import noresult from 'baseComponent/no-result/no-result.css';

@withRouter
@ReactCssModules(noresult, {allowMultiple:true})
class NoResult extends React.Component{
	
	constructor(props){
		super(props);
	  	this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render(){
		const {history} = this.props;
		
		return (
			<div styleName="noresult">
				<span 
				onClick={() => { history.goBack()}}>
				sorry, 此栏目暂无曲目! 点击返回!
				</span>
			</div>
		)
	}
}


export default NoResult;