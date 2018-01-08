
import Header from 'component/header';
import RouteMap from './router';

//播放组件
import Player from 'container/player';

class App extends React.Component {
	
  render() {
    return (
      <div className="container">
			<Header />
			<RouteMap />
			<Player />
      </div>
    );
  }
}

export default App;
