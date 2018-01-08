import rank from 'css/rank.css';
import BScroll from 'baseComponent/scroll/scroll';
import {withRouter} from 'react-router-dom';

@withRouter
@ReactCssModules(rank, {allowMultiple:true})
class Rank extends React.Component {
	constructor(props){
		super(props);
		this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate.bind(this);
	}
	
  
  selectItem(item){
  	const {history, _setSingerMid} = this.props;
  	_setSingerMid && _setSingerMid(item.id);
  	history.push({
  		pathname: `/rank/${item.id}`,
  		query: item
  	})
  	
  }
  
  render() {
  	
  	const {ranklist} = this.props;
  	
    return (
      <div styleName="rank">
			<BScroll styleName="toplist" ref="toplist">
		      <ul>
		      	{
		      		ranklist.length !== 0 &&
		      		ranklist.map((item, index) => (
		      			<li styleName="item" onClick={this.selectItem.bind(this, item)}>
				          <div styleName="icon">
				            <img src={item.picUrl} />
				          </div>
				          <ul styleName="songlist">
				          	{
				          		item.songList.map((song, index) => (
				          			<li styleName="song">
						              <span>{index + 1}</span>
						              <span>{song.songname}-{song.singername}</span>
						            </li>
				          		))
				          	}
				          </ul>
				        </li>
		      		))
		      	}
		      </ul>
		    </BScroll>
      </div>
    );
  }
}

export default Rank;