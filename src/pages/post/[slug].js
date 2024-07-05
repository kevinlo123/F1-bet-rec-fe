import { getPosts, getPostBySlug } from '../../../lib/postsService';
import markdownToHtml from '../../../lib/markdownToHtml';
import HeadTitle from '../../common/elements/head/HeadTitle';
import HeaderFour from '../../common/elements/header/HeaderFour';
import FooterOne from '../../common/elements/footer/FooterOne';
import PostFormatStandard from '../../common/components/post/format/PostFormatStandard';
import InstagramOne from '../../common/components/instagram/InstagramOne';
import PostFormatVideo from '../../common/components/post/format/PostFormatVideo';
import PostFormatGallery from '../../common/components/post/format/PostFormatGallery';
import PostFormatAudio from '../../common/components/post/format/PostFormatAudio';
import PostFormatQuote from '../../common/components/post/format/PostFormatQuote';

const PostDetails = ({ post, allPosts }) => {
  const PostFormatHandler = () => {
    if (post.postFormat === 'video') {
      return <PostFormatVideo postData={post} allData={allPosts} />;
    } else if (post.postFormat === 'gallery') {
      return <PostFormatGallery postData={post} allData={allPosts} />;
    } else if (post.postFormat === 'audio') {
      return <PostFormatAudio postData={post} allData={allPosts} />;
    } else if (post.postFormat === 'quote') {
      return <PostFormatQuote postData={post} allData={allPosts} />;
    } else {
      return <PostFormatStandard postData={post} allData={allPosts} />;
    }
  };

  return (
    <>
      <HeaderFour postData={allPosts} />
      <HeadTitle pageTitle={post.title} />
	  <PostFormatStandard postData={post} allData={allPosts} />
	  <InstagramOne parentClass="bg-color-extra03" />
      <FooterOne />
    </>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  try {
    const post = await getPostBySlug(slug);
    const allPosts = await getPosts();

    // Convert markdown to HTML if needed
    post.content = await markdownToHtml(post.content || '');

    return {
      props: {
        post,
        allPosts,
      },
    };
  } catch (error) {
    console.error('Error fetching data for post details page:', error);
    return {
      notFound: true,
    };
  }
}

export default PostDetails;
