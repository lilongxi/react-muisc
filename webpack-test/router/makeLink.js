import {Link} from 'react-router-dom';

class MakeLink extends React.Component{
	
	constructor(props){
		super(props);
	}
	
	render(){
		
		const {id, match, children} = this.props;
		
		return(
			<Link to={`${match.url}/${id}`}>
				{children}
			</Link>
		)
	}
}

export default MakeLink;