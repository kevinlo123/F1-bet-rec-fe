import FooterOne from "../common/elements/footer/FooterOne";
import PostSectionFour from '../common/components/post/PostSectionFour';
import { getAllPosts } from '../../lib/api';
import HeadTitle from "../common/elements/head/HeadTitle";
import HeaderFour from "../common/elements/header/HeaderFour";

const News = ({allPosts}) => {
    return (
        <>
            <HeadTitle pageTitle="F1 News" />
            <HeaderFour postData={allPosts} />
            <PostSectionFour postData={allPosts} adBanner={true} />
            <FooterOne />
        </>
    );
}

export default News;

export async function getStaticProps() {
    const allPosts = getAllPosts([
      'id',
      'title',
      'featureImg',
      'postFormat',
      'featured',
      'slidePost',
      'date',
      'slug',
      'cate',
      'pCate',
      'cate_img',
      'author_img',
      'author_name',
      'post_views',
      'read_time',
    ])
  
    return {
      props: { allPosts }
    }
  }
