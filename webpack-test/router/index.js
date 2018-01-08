import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Linker from './link';

//无子路由路由组件
import Recommend from 'container/recommend';
import SongList from 'container/getSongList';

//包含子路由组件
import Singer from 'router/singerRoute';
import Rank from 'router/rankRoute';
import Search from 'router/searchRoute';

class RouteMap extends React.Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		
		return(
			<Router>
				<div>
					<div>
						<Linker />
					</div>
					<div>
						<Switch>
						<Route exact path='/' component={Recommend} />
						<Route path='/singer' component={Singer} />
						<Route path='/rank' component={Rank} />
						<Route path='/search' component={Search} />
						<Route path='/recommend/:id' component={SongList} />
						</Switch>
					</div>
				</div>
			</Router>
		)
	}
}

export default RouteMap;