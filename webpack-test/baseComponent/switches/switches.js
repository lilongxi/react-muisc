
import switches from 'baseComponent/switches/switches.css';


@ReactCssModules(switches, {allowMultiple: true})
class Switches extends React.Component{
	
	constructor(props){
		super(props)
		this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
	}

	
	render(){
		
		const {switches, currentIndex, onWatchSwitchesTab} = this.props || {switches: [], currentIndex: 0};
		
		return (
			
			<ul styleName="switches">
				{
					switches.length !== 0 &&
					switches.map((item, index) => (
						<li styleName={currentIndex === index ? `active switch-item` : `switch-item`} 
							key={index}
							onClick = {onWatchSwitchesTab && onWatchSwitchesTab.bind(this, index)}
							>
					      <span>{item.name}</span>
					    </li>
					))
				}
			 </ul>
			
		)
	}
	
}

export default Switches