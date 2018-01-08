import {autoprefixer} from 'common/js/dom';
import progress from 'baseComponent/progress-bar/progress-bar.css';

@ReactCssModules(progress, {allowMultiple:true})
class ProgressBar extends React.Component{
	
	constructor(props){
		super(props);
		this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
		this.transform = autoprefixer('transform');
		this.touchs = {}; 
	}
	
	componentWillReceiveProps(nextProps){
		this.precent && this.precent(nextProps.precent)
	}
	
	precent(newPrecent){
		if(newPrecent >= 0 && !this.touchs.initiated){
			const self = this;
			const barWidth = self.progressBar.clientWidth - self.progressBtn.clientWidth;
			const offsetWidth = newPrecent * barWidth;
			self.offsetWidth && self.offsetWidth(offsetWidth);
		}
	}
	
	onTouchStart(e){
		e.stopPropagation();
		let self = this;
		self.touchs.initiated = true;
		self.touchs.startX = e.touches[0].pageX;
		self.touchs.leftB = self.progress.clientWidth;
	}
	
	onTouchMove(e){
		e.stopPropagation();
		if(!this.touchs.initiated) return;
		let self = this;
		const deltaX = e.touches[0].pageX - self.touchs.startX;
		/*
		 * 计算拖动宽度,小于bar的总宽度,大于0
		 */
		const offsetWidth =  Math.min(self.progressBar.clientWidth - self.progressBtn.clientWidth, Math.max(0, self.touchs.leftB + deltaX));
		self.offsetWidth && self.offsetWidth(offsetWidth);
	}
	
	onTouchEnd(e){
		e.stopPropagation();
		let self = this;
		self.touchs.initiated = false;
		/*
		 * 向player派发事件,调整播放进度
		 */
		self.props.onWatchPrecent( self.triggerPrecent &&  self.triggerPrecent())
	}
	
	onTouchClick(e){
		let self = this;
		e.stopPropagation();
		const offsetX = e.clientX - self.progressInner.getBoundingClientRect().left;
		self.offsetWidth && self.offsetWidth(offsetX);
		self.props.onWatchPrecent( self.triggerPrecent && self.triggerPrecent())
	}
	
	triggerPrecent(){
		const barWidth = this.progressBar.clientWidth - this.progressBtn.clientWidth;
		const precent = this.progress.clientWidth / barWidth;
		return precent;
	}
	
	offsetWidth(offsetWidth){
		let self = this;
		self.progress.style.width = `${offsetWidth}px`;
		self.progressBtn.style[self.transform] = `translate3d(${offsetWidth}px, 0, 0)`;
	}
	
	render(){
		return (
			<div styleName="progress-bar" 
				 ref={progressBar => this.progressBar = progressBar}>
			    <div styleName="bar-inner" 
			    ref={progressInner => this.progressInner = progressInner}
			    onClick={(e) => this.onTouchClick(e)}>
			      <div styleName="progress" ref={progress => this.progress = progress}></div>
			      <div styleName="progress-btn-wrapper" 
			      	   ref={progressBtn => this.progressBtn = progressBtn} 
			      	   onTouchStart={this.onTouchStart.bind(this)}
			      	   onTouchMove={this.onTouchMove.bind(this)}
			      	   onTouchEnd={this.onTouchEnd.bind(this)}>
			        <div styleName="progress-btn" ></div>
			      </div>
			    </div>
			 </div>
		)
	}
	
}


export default ProgressBar;