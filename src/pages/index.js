import InstagramOne from '../common/components/instagram/InstagramOne';
import FooterOne from '../common/elements/footer/FooterOne';
import HeadTitle from '../common/elements/head/HeadTitle';
import { getAllPosts } from '../../lib/api';
import PostSectionOne from '../common/components/post/PostSectionOne';
import PostSectionTwo from '../common/components/post/PostSectionTwo';
import PostSectionThree from '../common/components/post/PostSectionThree';
import PostSectionTen from '../common/components/post/PostSectionTen';
import CategoryList from '../common/components/category/CategoryList';
import PostSectionTwelve from '../common/components/post/PostSectionTwelve';
import { slugify } from "../common/utils";
import HeaderFour from "../common/elements/header/HeaderFour";
// import { getPosts } from '../../lib/postsService';
import React, { useState, useEffect } from 'react';
import MapComponent from '../common/components/map-component/MapComponent';
// import { ProtectedRoute } from '../contexts/AuthContext';

const HomeDefault = ({ allPosts }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const local = 'http://localhost:3000/api/v1';
        const prod = 'https://limitless-escarpment-05345-1ca012576c29.herokuapp.com/api/v1';
        const apiUrl = window.location.hostname === 'localhost' ? local : prod;
  
        // Use apiUrl here instead of url
        const response = await fetch(`${apiUrl}/posts`);        
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const postsData = await response.json();  // This is where postsData gets assigned
        setPosts(postsData);  // Set the fetched posts to the state
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
      <MapComponent />
      <PostSectionThree postData={videoPost} heading="Featured Video" />
      <PostSectionTen postData={allPosts} />
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
