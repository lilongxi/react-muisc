import BScroll from 'baseComponent/scroll/scroll';
import playlist from 'css/playlist.css';
import {Mode} from 'reduxd/common/config';
import AnimateWrapper from 'hightComponent/animateWrapper';
import ConfirmPortalBox from 'baseComponent/confirm/confirmPortal';
import AddSong from 'container/addSong';

@AnimateWrapper({type:'fadeInBottom', key:'playlistAnimate'})
@ReactCssModules(playlist, {allowMultiple: true})
class PlayList extends React.Component{
	
	constructor(props){
		super(props);
		this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
	}
	
	componentWillReceiveProps(nextProps){
		const {currentSong: prevSong} = this.props;
		const {currentSong: nextSong} = nextProps;
		if(prevSong.id){
			if(prevSong.id === nextSong.id) return;
			setTimeout(() => {
			this.scrollToCurrentEle && this.scrollToCurrentEle(this.props.currentSong);
			})
		}
	}
	
	componentDidMount(){
		setTimeout(() => {
			this.scrollToCurrentEle && this.scrollToCurrentEle(this.props.currentSong);
			this.playlist && this.playlist.addEventListener('click', (e) => {
				const {onWatchHidePlaylist, styles} = this.props;
				if(e.target.className === styles.playlist){
					onWatchHidePlaylist && onWatchHidePlaylist()
				}
			})
		})
	}
	
	scrollToCurrentEle(song){
		const listEle = this.listContent;
		if(song && listEle){
			const index = this.props.sequenceList.findIndex(item => {
				return song.id === item.id;
			})
			listEle.state._scrollToElement &&
			listEle.state._scrollToElement(this.list.children[index], 200)
		}
	}
	
	onWatchClearSearchKey(){
		//show confirm
		const {showFunc} = this.confirmPortalBox.confirmBox.state;
		showFunc && showFunc();
	}
	
	onWatchCancelFunc(){
		const {hideFunc} = this.confirmPortalBox.confirmBox.state;
		hideFunc && hideFunc();
	}
	
	onShowAddSong(){
		this.addsong.state.onShowList && this.addsong.state.onShowList();
	}
	
	render(){

		const {sequenceList, 
				currentSong,
				onWatchSelectItem, 
				onWatchHidePlaylist,
				onWatchSelectMode,
				onWatchDeleteItem,
				onWatchConfirmFunc,
				onWatchSetSongLike,
				mode} = this.props;
		
		const confirmProps = {
			text: '是否清空列表',
			confirmBtnText: '清空',
			onWatchCancelFunc: this.onWatchCancelFunc.bind(this),
			onWatchConfirmFunc: onWatchConfirmFunc && onWatchConfirmFunc.bind(this)
		}
		
		return (
				<div styleName="playlist" 
				ref={playlist => this.playlist = playlist}>
			      <div styleName="list-wrapper">
			        <div styleName="list-header">
			          <h1 styleName="title">
			            <i styleName="icon"></i>
			            <span 
			            styleName="text"
			            onClick={onWatchSelectMode && onWatchSelectMode.bind(this)}>
			            		{mode === Mode.sequence ? '顺序' : mode === Mode.loop ? '循环' : '随机'}
			            </span>
			            <span styleName="clear" 
			            onClick={this.onWatchClearSearchKey.bind(this)}>
			            		<i styleName="icon-clear">垃圾桶</i>
			            	</span>
			          </h1>
			        </div>
			        <BScroll 
			        ref={listContent => this.listContent = listContent} 
			        styleName="list-content">
			          <ul ref={list => this.list = list} name="list">
			          {
			          	sequenceList.length !== 0 && 
			          	sequenceList.map((item, index) => (
			          		<ReactAddonsCssTransitionGroup 
								  transitionName="fadeOutBottom"
							      transitionAppear={true}
							      transitionAppearTimeout={500}
							      transitionEnterTimeout={500}
			          			  transitionLeaveTimeout={500}
							>
			          		<li styleName="item" 
			          			key={item.id} 
			          			onClick={onWatchSelectItem && onWatchSelectItem.bind(this, item, index)}>
				              <span styleName={currentSong.id === item.id ? 'text active' : 'text'}>
				              	{item.name}{'-'}{item.singer}
				              </span>
				              <span styleName="like" 
				              onClick={onWatchSetSongLike && onWatchSetSongLike.bind(this, item)}>
				                <i>
				                	{
				              		item.like ? '已喜欢': '喜欢'
				              	}
				                </i>
				              </span>
				              <span styleName="delete" onClick={onWatchDeleteItem && onWatchDeleteItem.bind(this, item)}>
				                <i styleName="" >删除</i>
				              </span>
				            </li>
				            </ReactAddonsCssTransitionGroup>
			          	))
			          }
			          </ul>
			        </BScroll>
			        <div styleName="list-operate">
			          <div styleName="add" 
			          	   onClick={this.onShowAddSong.bind(this)}>
			            <i styleName="icon-add">+</i>
			            <span styleName="text">添加歌曲到队列</span>
			          </div>
			        </div>
			        <div styleName="list-close" onClick={onWatchHidePlaylist && onWatchHidePlaylist.bind(this)}>
			          <span>关闭</span>
			        </div>
			      </div>
			{/*<AddSong ref={addsong => this.addsong = addsong} />*/}
			<ConfirmPortalBox 
			{...confirmProps}
			ref={confirmPortalBox => this.confirmPortalBox = confirmPortalBox}/>
			</div>
		)
		
	}
	
}

export default PlayList;
