
import songlist from 'css/songList.css';

@ReactCssModules(songlist, {allowMultiple: true})
class dumbSongList extends React.Component{
	
	constructor(props){
		super(props);
		this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
	}
	
	render(){
		return (
			<div styleName="songlist">
				dumbSongList
			</div>
		)
	}
	
}


export default dumbSongList;