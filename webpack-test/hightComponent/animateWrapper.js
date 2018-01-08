import 'css/transition.css';

const animateWrapper = animateType => WrapperComponent => class extends React.Component{
	  	
	  	static propTypes = {
	  		animateType: PropTypes.string.isRequired,
	  		WrapperComponent: PropTypes.func.isRequired
	  	}
	  	
	  	constructor(props){
	  		super(props);
	  	}
	  	
	  	render(){
	  		const props = {...this.props}
	  		const {type, key, time} = animateType || {type:'example', key:''};
	  		
			return (
				<ReactAddonsCssTransitionGroup 
					  transitionName={type}
				      transitionAppear={true}
				      transitionAppearTimeout={750}
				      transitionEnterTimeout={500}
          			  transitionLeaveTimeout={300}
				>
				<WrapperComponent
		  				key={key}
		  				{...props} 
		  				ref={instanceComponent => this.instanceComponent = instanceComponent}
		  			/>
		  		</ReactAddonsCssTransitionGroup>
			)
	  	}
	  	
	}

export default animateWrapper;