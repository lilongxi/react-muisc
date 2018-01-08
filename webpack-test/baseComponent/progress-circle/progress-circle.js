
import progress_circle from 'baseComponent/progress-circle/progress-circle.css';

@ReactCssModules(progress_circle, {allowMultiple:true})
class ProgressCircle extends React.Component{
	
	constructor(props){
		super(props);
		this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
	}
	
	render(){
		
		const {children: slot, radius, precent} = this.props;
		const dasharray = Math.PI * 100 | 0;
		const dashoffset = (1 - precent) * dasharray;
		
		return (
			<div styleName="progress-circle">
			    <svg width={radius} height={radius} viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
			      <circle styleName="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
			      <circle styleName="progress-bar" r="50" cx="50" cy="50" fill="transparent" 
			      		  stroke-dasharray={dasharray}
			              stroke-dashoffset={dashoffset} />
			    </svg>
			    {slot}
			</div>
		)
	}
}

export default ProgressCircle;
