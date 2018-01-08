
/*
 * dumb
 * 
 * postsRecommend
 * postsDiscList
 * 
 */

//轮播组件
import Slider from 'baseComponent/slider/slider';
import PostsDiscList from 'component/getPostsDiscList';

const PostsRecommend = ({postsRecommend}) => {
	return (
		<div>
			<Slider>
			{
				postsRecommend.map((item, i) => 
	  						<div key={item.id}>
	  							<a href={item.linkUrl}><img src={item.picUrl} /></a>
	  						</div>
	  			)
			}
			</Slider>
		</div>
	)
}


export {PostsRecommend, PostsDiscList}
