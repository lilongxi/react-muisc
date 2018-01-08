import BScroll from 'baseComponent/scroll/scroll';
import Loding from 'baseComponent/loading/loading';
import ProgressBar from 'baseComponent/progress-bar/progress-bar';
import ProgressCircle from 'baseComponent/progress-circle/progress-circle';
import {Mode} from 'reduxd/common/config';
import {shuffle} from 'common/js/util';
import player from 'css/player.css';
import {autoprefixer} from 'common/js/dom';
import {getLyric} from 'reduxd/common/lyric';
import Lyric from 'lyric-parser';
import PlayList from 'component/playlist';
import {FAVORITE_KEY, 
		FAVORITE_MAX_LEN} from 'reduxd/common/cacheActionConfig.js';
import * as ActionCreators from 'reduxd/action/getPlayModeAction';
import {setSearchHistory, delSearchHistory} from 'reduxd/action/getSearchKeyAction'; 
import {updateSingerDeatil} from 'reduxd/action/gerSingerDetailAction';

import {dispatchOnSlideBack,
		dispatchOnSlideUp,
		dispatchTogglePlaying,
		dispatchOnSong,
		dispatchOnMode,
		dispatchOnPlayList,
		dispatchOnSingleLyric,
		dispatchOnLyricFlag,
		dispatchOnDeleteItem,
		dispatchOnDeleteAll,
		dispatchOnSongLike}
from 'reduxd/playModeAction';

const mapStateToProps = state => {
	const {getPlayModeReduce} = state;
	
	return {
		...getPlayModeReduce,
		getPlayModeReduce
	}
}

const mapDispatchToProps = dispatch => {
	return {
		actions: Redux.bindActionCreators(ActionCreators, dispatch),
		setSearchHistory: (query, KEY, MAX_LEN) => {
			dispatch(setSearchHistory(query,KEY, MAX_LEN));
		},
		delSearchHistory: (query, KEY) => {
			dispatch(delSearchHistory(query, KEY));
		},
		updateSingerDeatil:(posts, mid) => {
			dispatch(updateSingerDeatil(posts, mid))
		}
	}
}

@ReactRedux.connect(mapStateToProps, mapDispatchToProps)
@ReactCssModules(player, {allowMultiple: true})
class Player extends React.Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
		this.actions = this.props.actions;
		this.touches = {};
		this.transform = autoprefixer('transform');
		this.loadLyric = '正在努力获取歌词中....';
		this.changeLyric = '切换中....';
		this.transitionDuration = autoprefixer('transitionDuration');
		this.state = {
			songReady: false,
			showFlag: false,
			currentTime: 0,
			currentIndexPrev: -1,
			currentMidPrev: null,
			mode: Mode.sequence || 0,
			lineNum: 0,
			currentLyric: null,
			currentShow: 'cd',
			playingLyric: this.loadLyric
		}
	}
	
	componentWillReceiveProps(nextProps){
		
		const self = this;
		const nextLyric = nextProps.lyric;
		const prevLyric = self.props.lyric;
		
		if(!nextLyric) return;
		
		if(!prevLyric){
			self.getLyricParse && self.getLyricParse(nextLyric.posts);
			setTimeout(() => {
				self.audo && self.audo.play();
			})
			return;
		}
		
		if(nextLyric.id !== prevLyric.id){
			self.setState({playingLyric: self.changeLyric}, () => {
				self.getLyricParse && self.getLyricParse(nextLyric.posts);
				setTimeout(() => {
					self.audo && self.audo.play();
				})
				return;
			})
		}
		
		if(!nextProps.playlist.length){
			self.state.currentLyric && self.state.currentLyric.stop();
			self.onWatchHidePlaylist && self.onWatchHidePlaylist();
			dispatchOnLyricFlag(self.actions, null);
		}
		
	}
	
	SlidBack(e){
		if(e)e.stopPropagation();
		dispatchOnSlideBack(this.actions);
		this.setState({currentShow: 'cd'});
	}
	
	onSlideUp(e){
		if(e)e.stopPropagation();
		dispatchOnSlideUp(this.actions);
	}
	
	togglePlaying(e){
		if(e)e.stopPropagation();
		let self = this;
		if(!self.state.songReady) return;
		const {playing} = self.props;
		if(self.state.currentLyric){
			self.state.currentLyric.togglePlay();
		}
		dispatchTogglePlaying(self.actions, playing);
		!playing ? self.audo.play() : self.audo.pause();
	}
	
	prev(e){
		if(e)e.stopPropagation();
		let self = this;
		if(!self.state.songReady) return;
		const {currentIndex, playlist} = self.props;
		
		if(playlist.length === 1){
			this.onLoop();
		}else{
			let index = currentIndex - 1;
			if(index === -1){
				index = playlist.length - 1;
			}
			self.onChangeSong && self.onChangeSong(self, playlist, index);
		}
	}
	
	next(e){
		if(e)e.stopPropagation();
		let self = this;
		if(!self.state.songReady) return;
		const {currentIndex, playlist} = self.props;
		
		if(playlist.length === 1){
			this.onLoop();
		}else{
			let index = currentIndex + 1;
			if(index === playlist.length){
				index = 0;
			}
			self.onChangeSong && self.onChangeSong(self, playlist, index);
		}
		
	}
	
	onChangeSong(self, playlist, index){
		
		const {actions, playing, currentMid} = self.props;
		
		dispatchOnSingleLyric({
			action: actions,
			mid: currentMid,
			post: playlist[index] || {},
			callback: getLyric && getLyric.bind(this, actions, playlist[index])
		})
		dispatchOnSong(actions, index);
		!playing && self.togglePlaying();
		self.setState({songReady: false, playingLyric: self.changeLyric},() => {
			self.audo && self.audo.play();
		})
		
	}
	
	onReady(){
		/*
		 * 控制歌曲连续点击
		 */
		this.setState({songReady: true})
	}
	
	onError(){
		this.setState({songReady: true})
	}
	
	onEnd(){
		const {mode} = this.props;
		mode === Mode.loop ? this.onLoop() : this.next();
	}
	
	onLoop(){
		this.audo.currentTime = 0;
		setTimeout(() => {
			this.audo && this.audo.play();
			if(this.state.currentLyric){
				this.state.currentLyric.seek(0);
			}
		})
	}
	
	updateTime(e){
		this.setState({
			currentTime: e.target.currentTime
		})
	}
	/*
	 * 时间换算
	 */
	format(interval){
		interval = interval | 0;
		const minute = interval / 60 | 0;
		const second = this._pad(interval % 60);
		return `${minute}:${second}`
	}
	
	/*
	 * 补零
	 */
	_pad(num, n = 2){
		let len = num.toString().length;
		while(len < n){
			num = `0${num}`;
			len++
		}
		return num
	}
	
	precent(){
		let self = this;
		let {currentTime} = self.state;
		let currentSong = self.getCurrentSong && self.getCurrentSong();
		if(!currentTime || !currentSong.duration) return 0;
		return currentTime / currentSong.duration;
	}
	
	/*
	 * 接收progress-bar滑动时间
	 */
	onWatchPrecent(precent){
		const self = this;
		const currentTime = self.getCurrentSong().duration * precent;
		if(!self.props.playing){
			self.togglePlaying && self.togglePlaying();
		}
		self.audo.currentTime = currentTime;
		if(self.state.currentLyric){
			self.state.currentLyric.seek(currentTime * 1000);
		}
	}
	
	/*
	 * 播放类型
	 */
	
	changeMode(e){
		e.stopPropagation();
		let self = this;
		const {actions, sequenceList, mode} = self.props;
		const playmode = (mode + 1 ) % 3;
		let list = null;
		dispatchOnMode(actions, playmode);
		
		if(playmode === Mode.random){
			/*
			 * 随机切换
			 */
			list = shuffle(sequenceList);
		}else{
			/*
			 * 换回老歌曲列表
			 */
			list = sequenceList;
		}
		
		/*
		 * 保证当前歌曲不变
		 */
		
		dispatchOnPlayList(actions, list);
		self.resetCurrentIndex(list);
	}
	
	resetCurrentIndex(list){
		let self = this;
		const {actions} = self.props;
		
		let index = list.findIndex(item => {
			return item.id === self.getCurrentSong().id;
		});
		
		dispatchOnSong(actions, index);

	}
	
	getCurrentSong(){
		const {playlist, currentIndex, currentMid, singer} = this.props;
		const cur = playlist[currentIndex];
		return cur || {};
	}
	
	getLyricParse(posts){
		  const self = this;
			/*
			 * 重新开始播放歌曲前,先清除
			 */
			if(self.state.currentLyric){
				self.state.currentLyric.stop()
			}
			
			let currentLyricPosts = new Lyric(posts, ({lineNum, txt}) => {
				self.setState({lineNum, playingLyric: txt}, () => {
					if(lineNum > 5 && self.lyricLine){
						let lineEl = self.lyricLine.children[lineNum - 5];
						self.lyricList.state._scrollToElement(lineEl, 1000); 
					}else{
						if(!self.lyricLine) return;
						self.lyricList.state._scrollTo(0, 0, 1000);
					}
				});
			});
			
			self.setState({currentLyric: currentLyricPosts}, () => {
				self.state.currentLyric.play();
			})
		
	}
	
	/*
	 * 左右切换
	 */
	
	onTouchStart(e){
		/*
		 * 滑动开始,记录开始位置坐标
		 */
		if(e)e.stopPropagation();
		this.touches.initiated = true;
		const touch = e.touches[0];
		this.touches.startX = touch.pageX;
		this.touches.startY = touch.pageY;
	}
	onTouchMove(e){
		if(e)e.stopPropagation();
		if(!this.touches.initiated) return;
		const self = this;
		const {currentShow} = self.state;
		const touch = e.touches[0];
		const deltaX = touch.pageX - self.touches.startX;
		const deltaY = touch.pageY - self.touches.startY;
		
		/*
		 * 如果纵向的偏差大于横向的偏差,视为纵向滚动
		 */
		
		if(Math.abs(deltaY) > Math.abs(deltaX)) return;
		
		const left = currentShow === 'cd' ? 0 : -window.innerWidth;
		const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX));
		//滑动比例
		self.touches.percent = Math.abs(offsetWidth / window.innerWidth);
		
		self.lyricList.wrapper.style[self.transform] = `translate3d(${offsetWidth}px, 0, 0)`;
		self.lyricList.wrapper.style[self.transitionDuration] = 0;
		
		
		self.middleL.style.opacity = 1 - self.touches.percent;
		self.middleL.style[self.transitionDuration] = 0;
	}
	onTouchEnd(e){
		if(e)e.stopPropagation();
		let offsetWidth,
			opacity = 0,
			time = '750ms';
		const self = this;
		/*
		 * 从右向左滑动
		 */
		if(self.state.currentShow === 'cd'){
			if(self.touches.percent > 0.1){
				offsetWidth = -window.innerWidth;
				opacity = 0;
				self.setState({currentShow: 'lyric'});
			}else{
				opacity = 1;
				offsetWidth = 0;
			}
		}else{
			if(self.touches.percent < 0.9){
				offsetWidth = 0;
				opacity = 1;
				self.setState({currentShow: 'cd'});
			}else{
				opacity = 0;
				offsetWidth = -window.innerWidth;
			}
		}
		self.lyricList.wrapper.style[self.transform] = `translate3d(${offsetWidth}px, 0, 0)`;
		self.lyricList.wrapper.style[self.transitionDuration] = time;
		
		self.middleL.style.opacity = opacity;
		self.middleL.style[self.transitionDuration] = time;
	}
	
	setSongLike(item, e){
		if(e)e.stopPropagation();
		
		const {actions, 
			   getPlayModeReduce, 
			   updateSingerDeatil, 
			   setSearchHistory,
			   delSearchHistory} = this.props;
			 
		if(!item.like){
			setSearchHistory && setSearchHistory(item, FAVORITE_KEY, FAVORITE_MAX_LEN);
		}else{
			delSearchHistory && delSearchHistory(item, FAVORITE_KEY);
		}
		dispatchOnSongLike({actions, getPlayModeReduce, item, updateSingerDeatil});
	}
	
	//playlist相关操作
	showPlaylist(e){
		if(e)e.stopPropagation();
		this.setState({showFlag: true})
	}
	
	onWatchHidePlaylist(e){
		if(e)e.stopPropagation();
		this.setState({showFlag: false})
	}
	
	onWatchSelectItem(item, index){
		
		const {mode, playlist, currentIndex, actions} = this.props;
		//重复点击
		if(index === currentIndex){
			this.togglePlaying && this.togglePlaying();
			return;
		}
		
		if(mode === Mode.random){
	
			index = playlist.findIndex(song => {
				return song.id === item.id;
			})
			
		}
		
		this.onChangeSong && this.onChangeSong(this, playlist, index);
	}
	
	onWatchDeleteItem(item, e){
		if(e)e.stopPropagation();
		const {playlist, sequenceList, actions, currentIndex, currentMid} = this.props;
		dispatchOnDeleteItem({
			item,
			actions,
			playlist,
			sequenceList,
			currentIndex,
			currentMid,
			callback: this.onWatchDeleteItemCallback && this.onWatchDeleteItemCallback.bind(this)
		})
	}
	
	onWatchDeleteItemCallback(){
		return this.props.getPlayModeReduce;
	}
	
	onWatchConfirmFunc(){
		dispatchOnDeleteAll({
			actions: this.props.actions
		})
	}
	
	render(){
		
		const {fullScreen, playlist, playing, mode, sequenceList} = this.props;
		const isEmpty = playlist.length === 0;
		const currentSong = this.getCurrentSong && this.getCurrentSong();
		const {songReady, currentTime, lineNum, currentLyric, currentShow, playingLyric, showFlag} = this.state;
		const precent = this.precent && this.precent();
		const props = {
			precent: precent,
			onWatchPrecent: this.onWatchPrecent.bind(this)	
		}
		const playlistProps = {
			sequenceList,
			currentSong,
			mode,
			onWatchSelectItem: this.onWatchSelectItem.bind(this),
			onWatchHidePlaylist: this.onWatchHidePlaylist.bind(this),
			onWatchSelectMode: this.changeMode.bind(this),
			onWatchDeleteItem: this.onWatchDeleteItem.bind(this),
			onWatchConfirmFunc: this.onWatchConfirmFunc.bind(this),
			onWatchSetSongLike: this.setSongLike.bind(this)
		}
		
		return (
			<div>
				{
					!isEmpty && 
					<div styleName="player">
						{
							fullScreen ? 
							<ReactAddonsCssTransitionGroup 
							  transitionName="example"
						      transitionAppear={true}
						      transitionAppearTimeout={750}
						      transitionEnterTimeout={500}
		          			  transitionLeaveTimeout={300}
							>
							<div styleName="normal-player" key="normal-player">
						        <div styleName="background">
						          <img width="100%" height="100%" src={currentSong.image}/>
						        </div>
						        <div styleName="top">
						          <div styleName="back">
						            <i styleName="icon-back" onClick={this.SlidBack.bind(this)}>
						            		收起
						            </i>
						          </div>
						          <h1 styleName="title">{currentSong.name}</h1>
						          <h2 styleName="subtitle">{currentSong.singer}</h2>
						        </div>
						        <div styleName="middle"
						        		onTouchStart={this.onTouchStart.bind(this)}
						        		onTouchMove={this.onTouchMove.bind(this)}
						        		onTouchEnd={this.onTouchEnd.bind(this)}
						        >
						          <div styleName="middle-l" ref={middleL => this.middleL = middleL}>
						            <div styleName="cd-wrapper" ref={cdWrapper => this.cdWrapper = cdWrapper}>
						              <div styleName={playing ? `play cd`: `play pause cd`}>
						                <img styleName="image" src={currentSong.image} />
						              </div>
						            </div>
						            <div styleName="playing-lyric-wrapper">
						              <div styleName="playing-lyric">
						              	{playingLyric}
						              </div>
						            </div>
						          </div>
						          <BScroll styleName="middle-r" ref={lyricList => this.lyricList = lyricList}>
						            <div styleName="lyric-wrapper">
						            		<div ref={lyricLine => this.lyricLine = lyricLine}>
						            		{
						            			!currentLyric ? 
						            			<Loding /> :
						            			currentLyric.lines.map((item, index) => (
						            				<p 
						            				key = {index}
						            				styleName={lineNum === index ? `text current`: `text`}>
						            					{item.txt}
						            				</p>
						            			))
						            		}
						              	</div>
						            </div>
						          </BScroll>
						        </div>
						        <div styleName="bottom">
						          <div styleName="dot-wrapper">
						            <span styleName={currentShow === 'cd' ? `dot active` : `dot`} ></span>
						            <span styleName={currentShow === 'lyric' ? `dot active` : `dot`} ></span>
						          </div>
						          <div styleName="progress-wrapper">
						            <span styleName="time time-l">
						            		{this.format && this.format(currentTime)}
						            </span>
						            <div styleName="progress-bar-wrapper">
						            		<ProgressBar {...props} />
						            </div>
						            <span styleName="time time-r">
						            		{this.format && this.format(currentSong.duration)}
						            	</span>
						          </div>
						          <div styleName="operators">
						            <div styleName="icon i-left" onClick={this.changeMode.bind(this)}>
						              <i styleName={!songReady && 'disable-player'}>
						              	{mode === Mode.sequence ? '顺序' : mode === Mode.loop ? '循环' : '随机'}
						              </i>
						            </div>
						            <div onClick={this.prev.bind(this)} styleName="icon i-left">
						              <i styleName={!songReady && 'disable-player'}>
						              	上一曲
						              </i>
						            </div>
						            <div styleName="icon i-center" onClick={this.togglePlaying.bind(this)}>
						              <i styleName={!songReady && 'disable-player'}>{!playing ? '播放' : '暂停'}</i>
						            </div>
						            <div onClick={this.next.bind(this)} styleName="icon i-right">
						              <i styleName={!songReady && 'disable-player'}>
						              	下一曲
						              </i>
						            </div>
						            <div styleName="icon i-right" onClick={this.setSongLike.bind(this, currentSong)}>
						              <i styleName={!songReady && 'disable-player'}>
						              	{
						              		currentSong.like ? '已喜欢': '喜欢'
						              	}
						              </i>
						            </div>
						          </div>
						        </div>
						    </div>
						    </ReactAddonsCssTransitionGroup>:
						    <ReactAddonsCssTransitionGroup 
							  transitionName="example"
						      transitionAppear={true}
						      transitionAppearTimeout={750}
						      transitionEnterTimeout={500}
		          			  transitionLeaveTimeout={300}
							>
							<div styleName="mini-player" key="mini-player" onClick={this.onSlideUp.bind(this)}>
						        <div styleName="icon">
						          <img styleName={playing ? `play`: `play pause`} width="80" height="80" src={currentSong.image} />
						        </div>
						        <div styleName="text">
						          <h2 styleName="name">{currentSong.name}</h2>
						          <p styleName="desc">{currentSong.singer}</p>
						        </div>
						        <div styleName="control">
						        		<ProgressCircle radius={90} precent={precent}>
						          		<i 
						          		styleName={!songReady ? 'disable-player icon-mini' : 'icon-mini'} 
						          		onClick={this.togglePlaying.bind(this)}>
						          			{!playing ? '播放' : '暂停'}
						          		</i>
						          	</ProgressCircle>
						        </div>
						        <div styleName="control" onClick={this.showPlaylist.bind(this)}>
						          <i styleName="icon-playlist">
						          	列表
						          </i>
						        </div>
					      </div>
					      </ReactAddonsCssTransitionGroup>
					}
					</div>
				}
				
				{
					showFlag && 
					<PlayList
					ref={playlistRef => this.playlistRef = playlistRef} 
					{...playlistProps}
					/>
				}
				<audio ref = {audo => this.audo = audo}
				onTimeUpdate = {this.updateTime.bind(this)}
				src={!isEmpty ? currentSong.url : ''} 
				onCanPlay={this.onReady.bind(this)}
				onError={this.onError.bind(this)}
				onEnded={this.onEnd.bind(this)}/>
			</div>
		)
	}
}

export default Player;