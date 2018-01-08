/*
 * 存放singer组件及其子路由
 * 
 */

import {Route, Switch} from 'react-router-dom';
import Singer from 'container/singer';
import SingerDetailView from 'container/singerDetailView';

class SingerRoute extends React.Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return (
			<div>
				<Switch>
					<Route exact path='/singer' component={Singer} />
					<Route path='/singer/:id' component={SingerDetailView} />			
				</Switch>
			</div>
		)
	}
}


export default SingerRoute;