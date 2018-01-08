
import ConfirmBox from './confirm';

class ConfirmPortal extends React.Component{
	
	constructor(props){
		super(props);
		this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
	}
	
	render(){
		
		return ReactDom.createPortal(
			<ConfirmBox {...this.props} ref={confirmBox => this.confirmBox = confirmBox} />,
			document.getElementById('portal')
		)
		
	}
	
}

export default ConfirmPortal;