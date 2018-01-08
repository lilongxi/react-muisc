
import BScroll from 'better-scroll';

class Scroll extends React.Component{
	
	constructor(props){
		super(props);
	  	this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
	  	this.state = {
	  		probeType: this.props.probeType ? this.props.probeType: 1,
	  		click:true,
	  		pullup: this.props.pullup ? this.props.pullup: false,
	  		beforeScroll: this.props.beforeScroll ? this.props.beforeScroll: false,
	  		listenScroll: this.props.listenScroll,
	  		_scrollTo: this.scrollTo.bind(this),
	  		_scrollToElement: this.scrollToElement.bind(this)
	  	}
	}
	
	
	componentDidMount(){
		setTimeout(() => {
			this._initScroll();
		});
		setTimeout(() => {
			this.refresh();
		}, 750)
	}
	
	_initScroll(){
		const {probeType, click, listenScroll, pullup, beforeScroll} = this.state;
		
		if(!this.wrapper)return;
		
		this.scroll = new BScroll(this.wrapper, {
			probeType: probeType,
			click: click
		});
		//监听scroll的滚动
		if(listenScroll){
			const {onWatchScrollY} = this.props;
			this.scroll.on('scroll', pos => {
				//将pos传出
				onWatchScrollY && onWatchScrollY(pos);
			})
		}
		
		//监听上拉刷新
		if(pullup){
	
			const {onWatchScrollToEnd, buffer} = this.props;
			this.scroll.on('scrollEnd', () => {
				/*
				 * 派发上拉事件
				 */
				if(this.scroll.y <= (this.scroll.maxScrollY + buffer)){
					onWatchScrollToEnd && onWatchScrollToEnd(this.scrollToElement);
				}
				
			})
		}
		
		//监听列表开始滚动
		
		if(beforeScroll){
			const {onWatchBeforeScrollStart} = this.props;
			this.scroll.on('beforeScrollStart', () => {
				//派发列表滚动事件
				onWatchBeforeScrollStart && onWatchBeforeScrollStart('beforeScrollStart');
			})
		}
		
	}
	
	enable(){
		this.scroll && this.scroll.enable()
	}
	
	disable(){
		this.scroll && this.scroll.disable()
	}
	
	refresh(){
		this.scroll && this.scroll.refresh();
	}
	
	scrollTo(){
		//滑动到指定位置
		this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
	}
	
	scrollToElement(el, time = 0){
		this.scroll && this.scroll.scrollToElement(el, time);
	}
	
	render(){
		const {children: slot, className} = this.props;
		
		return (
			<div className={className} ref={wrapper => this.wrapper = wrapper}>
				{slot}
			</div>
		)
	}
}


export default Scroll;