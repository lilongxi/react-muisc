import {withRouter} from 'react-router-dom';
import singer from 'css/singer.css';
import BScroll from 'baseComponent/scroll/scroll';
import {getData} from 'common/js/dom';

@withRouter
@ReactCssModules(singer, {allowMultiple:true})
class SingerList extends React.Component {
  constructor(props){
		super(props);
		this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
		this.touchs = {};
		this.ANCHOR_HEIGHT = 30;
		this.TITLW_HEIGHT = 50;
		this.listHeight = [];
		this.state = {
			scrollY: -1,
			currentIndex: 0,
			diff: -1
		}
  }
  
  componentDidMount(){
  	setTimeout(() => {
  		this._calculateHeight();
  	});
  }
  
  onShortTouchStart(e){
  	let anchorIndex = getData(e.target, 'index');
  	let firstTouch = e.touches[0];
  	this.touchs.y1 = firstTouch.pageY;
  	this.touchs.anchorIndex = anchorIndex;
	anchorIndex && this._scrollTo(anchorIndex, 0);
  }
  
  onShortTouchMove(e){
  	let firstTouch = e.touches[0];
  	this.touchs.y2 = firstTouch.pageY;
  	//计算出偏移量
  	let delat = (this.touchs.y2 - this.touchs.y1) / this.ANCHOR_HEIGHT | 0;
  	let anchorIndex =  (+this.touchs.anchorIndex) + delat;
  	this._scrollTo(anchorIndex, 0);
  }
  
  _scrollTo(index, time = 0){
  	
  	if(!index && index !== 0) return;
  	if(index < 0){
  		index = 0
  	}else if(index > this.listHeight.length - 2){
  		index = this.listHeight.length - 2;
  	}
  	
  	
  	/*
  	 * 手动计算新的边界值
  	 */
  	
  	this._calculateScrollY(-this.listHeight[index]);
  	this.listview.state._scrollToElement(this.listGroup.children[index], time)

  }
  
  _calculateScrollY(newY){
  	let	listHeight = this.listHeight;
  	
	/*
	 * 边界值处理
	 * 当滚动到最顶部, newY大于0
	 *
	 */
	
	if(newY > 0){
		this.setState({currentIndex: 0});
		return;
	}
	
	/*
	 * 中间部分滚动
	 */
  	
  	for(let i = 0; i < listHeight.length; i++){
  		let height1 = listHeight[i];
  		let height2 = listHeight[i+1];
  		if(-newY >= height1 && -newY < height2){
  			this.setState({currentIndex: i}, () => {
  				/*
	  			 * 计算实时区块和固定区块的差值
	  			 */
	  			this._diff(height2 + newY);
  			});
  			return;
  		}
  	}
  	
  	/*
  	 * 滚动到最底部,-newY大于最后一个元素的上限
  	 */
  	this.setState({currentIndex: listHeight.length-2})
  }
  
  
  _diff(newVal){
  	let titleHeight = this.TITLW_HEIGHT;
  	let fixedTop = (newVal > 0 && newVal<titleHeight) ? newVal-titleHeight : 0  ;
  	if(this.fixedTop === fixedTop) return;
  	this.fixedTop = fixedTop;
  	if(!this.fixedTitle) return;
  	this.fixedTitle.style.transform = `translate3d(0, ${fixedTop}px, 0)`;
  }
  
  _calculateHeight(){
  	/*
  	 * listGroup下每一个子元素的高度,和scrollY作对比
  	 */
  	this.listHeight = [];
  	const list = this.listGroup.children;
  	let height = 0;
  	this.listHeight.push(height);
  	for(let i = 0; i < list.length; i++){
  		let item = list[i];
  		height += item.clientHeight;
  		this.listHeight.push(height);
  	}
  }
  
  //观察BScroll内scrollY的变化
  onWatchScrollY(pos){
  	this.setState({scrollY: pos.y}, this._calculateScrollY(pos.y))
  }
  
  onHandlePush(...props){
  	  const [id, name, avatar] = [...props];
	  const {history, _setSingerMid} = this.props;
	  _setSingerMid && _setSingerMid(id);
	  history.push({
	  	pathname: `/singer/${id}`,
	  	query: {
	  		id,
			name,
			avatar
		}
	  })
  }
  
  render() {
  	
  	const {singerProps} = this.props;
  	const {currentIndex, scrollY} = this.state;
  	const props = {className: singer.listview,
  				   listenScroll:true,
  				   probeType:3,
  				   onWatchScrollY: this.onWatchScrollY.bind(this)}
  	
    return (
	      <BScroll {...props} ref={listview => this.listview = listview}>
				<ul ref={listGroup => this.listGroup = listGroup}>
				  {
				  	singerProps.map((item, i) => (
				  		<li styleName="list-group" key={i}>
					        <h2 styleName="list-group-title">{item.title}</h2>
					        <ul>
					        		{
					        			item.items.map( it => (
					        				<li 
					        				styleName="list-group-item" 
					        				key={it.id}
					        				onClick={this.onHandlePush.bind(this, it.mid, it.name, it.avatar)}>
								            		<img styleName="avatar" src={it.avatar} />
								            <span styleName="name">{it.name}</span>
								         </li>
					        			))
					        		}
					        </ul>
					      </li>
				  	))
				  }
			    </ul>
			    <div styleName="list-shortcut" 
			    		 onTouchStart={this.onShortTouchStart.bind(this)}
			    		 onTouchMove={this.onShortTouchMove.bind(this)}>
			    		<ul>
			    			{
			    			  singerProps.map((shortcut, i) => (
			    			  	<li styleName={currentIndex === i ? `item current` : `item`} key={i} data-index={i}>
			    			  		{shortcut.title.substr(0,1)}
			    			  	</li>
			    			  ))
			    			}
			    		</ul>
			    </div>
			    {
			    		scrollY <= 0 &&
			    		<div styleName="list-fixed" ref={fixedTitle => this.fixedTitle = fixedTitle}>
				    		<h1 styleName="fixed-title">
				    			{
				    			singerProps[currentIndex].title
				    			}
				    		</h1>
				    </div>
			    }
			    
	      </BScroll>
    );
  }
}

export default SingerList;