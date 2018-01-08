
import DumbSongList from 'component/getSongList';
import {getSongList} from 'api/getRecommend';

class SongList extends React.Component{
	
	constructor(props){
		super(props);
		this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
	}
	
	componentWillMount(){
		
		const {history, location} = this.props;
		const {query} = location;
		
		if(!query){
			history.goBack();
			return;
		}
		
	}
	
	render(){
		return (
			<div>
				<DumbSongList />
			</div>
		)
	}
	
}


export default SongList;