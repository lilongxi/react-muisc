import {withRouter,Link} from 'react-router-dom';
import route from 'css/route.css';

const FilterLink = ({ to, path, children}) => {
	return path === to ? 
		<div><span>{children}</span></div> : 
		<div><Link to={to} >{children}</Link></div>
}

@withRouter
@ReactCssModules(route, {allowMultiple:true})
class Linker extends React.Component {
  constructor(){
	  super();
	  this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
  	
  	const {location} = this.props;
  	
    return (
      <div styleName="routed">
			<FilterLink to="/" path={location.pathname}>推荐</FilterLink>
			<FilterLink to="/singer" path={location.pathname}>歌手</FilterLink>
			<FilterLink to="/rank" path={location.pathname}>排名</FilterLink>
			<FilterLink to="/search" path={location.pathname}>搜索</FilterLink>
      </div>
    );
  }
}

export default Linker;