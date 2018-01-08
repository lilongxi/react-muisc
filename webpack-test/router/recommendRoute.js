/*
 * 存放recommend子路由及其组件
 */
import {Route, Switch} from 'react-router-dom';
import Recommend from 'container/recommend';
import SongList from 'container/getSongList';

class RecommendRoute extends React.Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return (
			<div>
				<Switch>
					<Route exact path='/' component={Recommend} />
					<Route path='/recommend/:id' component={SongList} />
				</Switch>
			</div>
		)
	}
}

export default RecommendRoute;