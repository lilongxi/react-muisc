
import confirm from 'baseComponent/confirm/confirm.css';

@ReactCssModules(confirm, {allowMultiple: true})
class ConfirmBox extends React.Component{
	
	constructor(props){
		super(props);
		this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			showFlag: false,
			showFunc: this.showFunc.bind(this),
			hideFunc: this.hideFunc.bind(this),
			text: this.props.text || 'confirm',
			cancelBtnText: this.props.cancelBtnText || '取消',
			confirmBtnText: this.props.confirmBtnText || '确定'
		}
	}
	
	showFunc(){
		this.setState({showFlag: true})
	}
	
	hideFunc(){
		this.setState({showFlag: false})
	}
	
	render(){
		
		const {showFlag, text, cancelBtnText, confirmBtnText} = this.state;
		const {onWatchCancelFunc, onWatchConfirmFunc} = this.props;
		
		return (
			<ReactAddonsCssTransitionGroup 
			  transitionName="example"
		      transitionAppear={true}
		      transitionAppearTimeout={350}
		      transitionEnterTimeout={500}
  			  transitionLeaveTimeout={300}
			>
				{
					showFlag && 
					<div styleName="confirm">
				      <div styleName="confirm-wrapper">
				        <div styleName="confirm-content">
				          <p styleName="text">{text}</p>
				          <div styleName="operate">
				            <div 
				            styleName="operate-btn left" 
				            onClick={onWatchCancelFunc && onWatchCancelFunc.bind(this)}>{cancelBtnText}</div>
				            <div 
				            styleName="operate-btn"
				            onClick={onWatchConfirmFunc && onWatchConfirmFunc.bind(this)}
				            >{confirmBtnText}</div>
				          </div>
				        </div>
				      </div>
				    </div>
				}
				
		    </ReactAddonsCssTransitionGroup>
		)
		
	}
	
}
export default ConfirmBox;