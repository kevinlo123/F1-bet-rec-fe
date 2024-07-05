import InstagramOne from '../common/components/instagram/InstagramOne';
import FooterOne from '../common/elements/footer/FooterOne';
import HeadTitle from '../common/elements/head/HeadTitle';
import { getAllPosts } from '../../lib/api';
import PostSectionOne from '../common/components/post/PostSectionOne';
import PostSectionTwo from '../common/components/post/PostSectionTwo';
import PostSectionThree from '../common/components/post/PostSectionThree';
import CategoryList from '../common/components/category/CategoryList';
import PostSectionTwelve from '../common/components/post/PostSectionTwelve';
import { slugify } from "../common/utils";
import HeaderFour from "../common/elements/header/HeaderFour";
import { getPosts } from '../../lib/postsService';
import React, { useState, useEffect } from 'react';

const HomeDefault = ({ allPosts }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const postsData = await getPosts();
        setPosts(postsData);
        setLoading(false);  // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error loading posts:', error);
        setLoading(false);  // Set loading to false even if there's an error
      }
    };

    fetchPostsData();
  }, []);

  const videoPost = allPosts.filter(post => post.postFormat === "video");
  const PageSlug = "lifestyle-blog";
  const lifestylePost = allPosts.filter(post => slugify(post.pCate) === PageSlug);
  const latestPosts = posts.sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <>
      <HeadTitle pageTitle="Home" />
      <HeaderFour postData={allPosts} />
      {loading ? (
        <div>Loading...</div>  // Display loading indicator while fetching data
      ) : (
        <PostSectionTwelve postData={latestPosts} />  // Pass latestPosts to PostSectionTwelve
      )}
      <PostSectionThree postData={videoPost} heading="Featured Video" />
      <PostSectionOne postData={allPosts} />
      <PostSectionTwo postData={allPosts} />
      <CategoryList cateData={allPosts} />
      <FooterOne />
    </>
  );
};

export default HomeDefault;

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
    'author_social',
  ]);

  return {
    props: { allPosts },
  };
}
