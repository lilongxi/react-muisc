/*
 * 存放rank子路由及其组件
 */
import {Route, Switch} from 'react-router-dom';
import Rank from 'container/rank';
import RankList from 'container/rankList';

class RankRoute extends React.Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return (
			<div>
				<Switch>
					<Route exact path='/rank' component={Rank} />
					<Route path='/rank/:id' component={RankList} />
				</Switch>
			</div>
		)
	}
}

export default RankRoute;