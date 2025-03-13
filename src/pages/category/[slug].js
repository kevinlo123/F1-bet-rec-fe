import { getAllPosts } from '../../../lib/api';
import InstagramOne from '../../common/components/instagram/InstagramOne';
import PostLayoutTwo from '../../common/components/post/layout/PostLayoutTwo';
import BreadcrumbOne from '../../common/elements/breadcrumb/breadcrumbOne';
import FooterOne from '../../common/elements/footer/FooterOne';
import HeadTitle from "../../common/elements/head/HeadTitle";
import SidebarOne from "../../common/components/sidebar/SidebarOne";
import { slugify } from '../../common/utils';
import HeaderFour from '../../common/elements/header/HeaderFour';
import PostSectionFour from '../../common/components/post/PostSectionFour';
import CategoryList from '../../common/components/category/CategoryList';

const PostCategory = ({ postData, allPosts }) => {

	
	return (
		<>
		<HeadTitle pageTitle="Category Archive"/>
		<HeaderFour postData={allPosts} />
		<BreadcrumbOne customProp={true} title={postData?.[0]?.cate || "Not Found"} />
		<PostSectionFour postData={postData} adBanner={true} />
		<CategoryList />
		<FooterOne />

		</>
	);
}

export default PostCategory;


export async function getServerSideProps(context) {
  const { params } = context;

  const local = 'http://localhost:3000/api/v1/';
  const prod = 'https://limitless-escarpment-05345-1ca012576c29.herokuapp.com/api/v1/';

  const apiUrl = process.env.NODE_ENV === 'production' ? prod : local;

  const allPosts = getAllPosts([
	'slug',
	'cate',
	'cate_img',
	'title',
	'featureImg',
	'date',
	'post_views',
	'read_time',
	'author_name',
	'author_social'
]);


  try {
	const response = await fetch(`${apiUrl}/posts/`);
	if (!response.ok) {
	  throw new Error('Network response was not ok');
	}

	const posts = await response.json();
	const getCategoryPosts = posts.filter(post => slugify(post.cate) === params.slug);
	const postData = getCategoryPosts;

	return {
	  props: {
		allPosts,
		postData 
	  }
	};
  } catch (error) {
	console.error('Error fetching data for posts:', error);

	return {
	  notFound: true,
	};
  }
}
