/*
 * 存放singer组件及其子路由
 * 
 */

import {Route, Switch} from 'react-router-dom';
import Search from 'container/search';
import SingerDetailView from 'container/singerDetailView';

class SearchRoute extends React.Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return (
			<div>
				<Switch>
					<Route exact path='/search' component={Search} />
					<Route path='/search/:id' component={SingerDetailView} />
				</Switch>
			</div>
		)
	}
}


export default SearchRoute;