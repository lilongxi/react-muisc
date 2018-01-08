import musicList from 'css/musicList.css';
import BScroll from 'baseComponent/scroll/scroll';
import SongList from 'baseComponent/songList/songList';
import {autoprefixer} from 'common/js/dom';

@ReactCssModules(musicList, {allowMultiple:true})
class MusicList extends React.Component{
	
	constructor(props){
		super(props);
		this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
		this.RESLOVE_HEIGHT = 75;
		this.transform = autoprefixer('transform');
		this.backdrop = autoprefixer('backdrop-filter');
		this.state = {
			rank: this.props.rank || false
		}
	}
	
	componentDidMount(){
		//动态设置歌单距离顶部位置
		this.imageHeight = this.images.clientHeight;
		this.minTranslateY = -this.imageHeight + this.RESLOVE_HEIGHT;
		this.list.wrapper.style.top = `${this.imageHeight}px`;
	}
	
	onHandBack(){
		const {history} = this.props;
		history.goBack();
	}
	
	onWatchScrollY(pos){
		let newY = pos.y;
		let translateY = Math.max(this.minTranslateY, newY);
		let zIndex = 0;
		let Scale = 1;
		let Blur = 0;
		
		if(!this.layer)return;
		this.layer.style[this.transform] = `translate3d(0, ${translateY}px, 0)`;
		
		//计算图片scale
		const precent = Math.abs(newY / this.imageHeight);
		
		if(newY > 0) {
			Scale = 1 + precent;
			zIndex = 10;
		}else{
			Blur = Math.min(20 * precent, 20);
		}
		
		//设置图片模糊度
		this.filter.style[this.backdrop] = `blur(${Blur}px)`;
		
		if(newY < this.minTranslateY){
			zIndex = 10;
			this.images.style.paddingTop = 0;
			this.images.style.height = `${this.RESLOVE_HEIGHT}px`;
			this.play.style.display = 'none';
		}else{
			this.images.style.paddingTop = `70%`;
			this.images.style.height = 0;
			this.play.style.display = '';
		}
		
		this.images.style.zIndex = zIndex;
		this.images.style[this.transform] = `scale(${Scale})`;
		
	}
	
	onRandomPlay(data){
		/*
		 * 数据相关操作在smart组件执行,见singerDetailView
		 */
		this.props._onRandomPlay && this.props._onRandomPlay(data)
	}
	
	render(){
		
		const {query, data, _onSelectItem} = this.props;
		const {rank} = this.state;
		const props = {query, data, _onSelectItem, rank};
		/*
		 * 传给scroll组件的props,保持不变
		 */
		const scrollProps = {
				   className: musicList.list, 
				   listenScroll:true,
  				   probeType:3,
  				   onWatchScrollY: this.onWatchScrollY.bind(this)
				  }
		
		return (
			<div styleName="music-list">
				<div styleName="backend">
					<span styleName="icon-back" onClick={this.onHandBack.bind(this)}>返回</span>
				</div>
				<h1 styleName="title">{query.name}</h1>
				<div styleName="bg-image" 
					 style={{backgroundImage:`url(${query.avatar})`}}
					 ref={images => this.images = images}>
					<div styleName="play-wrapper" ref={play => this.play = play}>
						<div styleName="play" onClick={this.onRandomPlay.bind(this, data)}>
							<span styleName="text">随机播放全部</span>
						</div>
					</div>
					<div styleName="filter" ref={filter => this.filter = filter}></div>
				</div>
				<div styleName="bg-layer" ref={layer => this.layer = layer}></div>
				<BScroll {...scrollProps} ref={list => this.list = list}>
					<SongList {...props} />
				</BScroll>
			</div>
		)
	}
}

export default MusicList;