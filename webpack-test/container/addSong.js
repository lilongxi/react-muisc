import Bscroll from 'baseComponent/scroll/scroll';
import addsong from 'css/addsong.css';
import Switches from 'baseComponent/switches/switches';

@ReactCssModules(addsong, {allowMultiple: true})
class AddSong extends React.Component{
	
	constructor(props){
		super(props);
		this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			query: '',
			showList: false,
			currentIndex: 0,
			switches:[{name: '最近播放'}, {name: '我喜欢的'}],
			onShowList: this.onShowList.bind(this),
			onHideList: this.onHideList.bind(this)
		}
	}
	
	onShowList(){
		this.setState({showList: true})
	}
	
	onHideList(){
		this.setState({showList: false})
	}
	
	/*
	 * switches
	 */
	
	onWatchSwitchesTab(currentIndex){
		this.setState({currentIndex})
	}
	
	render(){
		
		const {query, showList, currentIndex, switches} = this.state;
		
		const switchesPorps = {
			currentIndex,
			switches,
			onWatchSwitchesTab: this.onWatchSwitchesTab.bind(this)
		}
		
		return (
		<div>
			{
				!showList && 
				<ReactAddonsCssTransitionGroup 
					  transitionName="fadeInRight"
				      transitionAppear={true}
				      transitionAppearTimeout={750}
				      transitionEnterTimeout={500}
          			  transitionLeaveTimeout={300}
				>
				<div styleName="add-song" key="add-song">
			      <div styleName="header">
			        <h1 styleName="title">添加歌曲到列表</h1>
			        <div styleName="close" onClick={this.onHideList.bind(this)}>
			          <i styleName="icon-close">x</i>
			        </div>
			      </div>
			      <div styleName="shortcut">
			      	<Switches {...switchesPorps} />
			        <div styleName="list-wrapper">
			        	  {
			        	  	currentIndex === 0 &&
			        	  	<ReactAddonsCssTransitionGroup 
							  transitionName="example"
						      transitionAppear={true}
						      transitionAppearTimeout={500}
						      transitionEnterTimeout={500}
				  			  transitionLeaveTimeout={300}
						>
				        	  	<Bscroll ref="songList"  className="list-scroll">
					            <div styleName="list-inner">
					              ddd
					            </div>
					        </Bscroll>
				        </ReactAddonsCssTransitionGroup>
			        	  }
			          {
			          	currentIndex === 1 && 
			          	<ReactAddonsCssTransitionGroup 
							  transitionName="example"
						      transitionAppear={true}
						      transitionAppearTimeout={500}
						      transitionEnterTimeout={500}
				  			  transitionLeaveTimeout={300}
						>
				          	<Bscroll ref="likeList" className="list-scroll">
					            <div styleName="list-inner">
					              ccc
					            </div>
					         </Bscroll>
				         </ReactAddonsCssTransitionGroup>
			          }
			        </div>
			      </div>
			      <div styleName="search-result" >
			        
			      </div>
			    </div>
			    </ReactAddonsCssTransitionGroup>
			}
		  </div>
		)
	}
	
}

export default AddSong;