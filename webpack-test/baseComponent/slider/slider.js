import BScroll from 'better-scroll';
import slider from 'baseComponent/slider/slider.css';

//addclass func
import {addClass} from 'common/js/dom';

@ReactCssModules(slider, {allowMultiple:true})
class Slider extends React.Component{
  
  constructor(){
	  super();
	  this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
	  this.state = {
	  	dots:[],
	  	currentIndex: 0,
	  	autoPlay: true,
	  	interval: 2000
	  }
  }
  
  componentDidMount(){
  	this._setSliderWidth();
  	this._initDots();
  	setTimeout(() => {
  		this._initSlider();
  		this.state.autoPlay && this._autoPlay();
  	},200);
  	
  	//监听窗口
  	window.addEventListener('resize', () => {
  		if(!this.sliderScroll){
  			return
  		}
  		this._setSliderWidth(true);
  		//刷新
  		this.sliderScroll.refresh();
  	})
  	
  }
  
  componentWillUnmount(){
  	clearTimeout(this.timer)
  }
  
  _setSliderWidth(isResize){
  	this.children = this.sliderGroup.children;
  	this.loop = false;
  	let width = 0;
  	let sliderWidth = this.slider.clientWidth;
  	
  	for (let i = 0; i < this.children.length; i++) {
  		addClass(this.children[i], slider.sliderItem);
  		this.children[i].style.width = sliderWidth + 'px';
  		width += sliderWidth;
  	}
  	
//	循环为2倍宽
	
	if(this.loop && !isResize){
		width += 2 * sliderWidth;
	}
	
	this.sliderGroup.style.width = width + 'px';
  	
  }
  
  _initDots(){
  	let dots = Array.from(new Array(this.children.length), (v, i) => { return i});
  	this.setState({dots})
  }
  
  _initSlider(){
  	this.sliderScroll = new BScroll(this.slider, {
//  		横向滚动
  		scrollX: true,
//		不允许纵向滚动
		scrollY: false,
		momentum: false,
		snap: true,
		snapLoop: this.loop,
		snapThreshold: 0.3,
		snapSpeed: 400,
		click: true
  	});
  	
	this.sliderScroll.on('scrollEnd', () => {
		let currentIndex = this.sliderScroll.getCurrentPage().pageX;
		this.setState({currentIndex});
		this.state.autoPlay && ( clearTimeout(this.timer), this._autoPlay());
	})
  }
  
  _autoPlay(){
  	let pageIndex = this.state.currentIndex + 1;
  	this.timer = setTimeout(() => {
  		pageIndex >= this.children.length ? this.sliderScroll.goToPage(0, 0, 400) : this.sliderScroll.goToPage(pageIndex, 0, 400);
  	}, this.state.interval)
  }
  
  render() {
  	
  	const {children: slot} = this.props;
  	const {dots, currentIndex} = this.state;
  	
    return (
      <div styleName="slider" ref={slider => this.slider = slider}>
      	<div styleName="sliderGroup" ref={sliderGroup => this.sliderGroup = sliderGroup}>
      		{slot}
      	</div>
      	<div styleName="dots" ref={dots => this.dots = dots}>
      		{
      			dots && dots.length !== 0 &&
      			dots.map((dot, i) => <span key={i} styleName={currentIndex === i ? `dot active` : `dot`} ></span>)
      		}
      	</div>
      </div>
    );
  }
}

export default Slider;
