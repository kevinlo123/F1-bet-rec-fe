import FooterOne from '../common/elements/footer/FooterOne';
import HeadTitle from '../common/elements/head/HeadTitle';
import PostSectionTwo from '../common/components/post/PostSectionTwo';
import PostSectionTen from '../common/components/post/PostSectionTen';
import CategoryList from '../common/components/category/CategoryList';
import PostSectionTwelve from '../common/components/post/PostSectionTwelve';
import HeaderFour from "../common/elements/header/HeaderFour";
import React, { useState, useEffect } from 'react';
import MapComponent from '../common/components/map-component/MapComponent';
import Leaderboard from '../common/components/leaderboard/leaderboard';
import TwitterFeed from '../common/components/TwitterFeed/TwitterFeed';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useColorMode } from '../contexts/ColorModeContext'; 
import { getAllPosts } from '../../lib/api';

const HomeDefault = ({ allPosts }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const local = 'http://localhost:3000/api/v1';
        const prod = 'https://limitless-escarpment-05345-1ca012576c29.herokuapp.com/api/v1';
        const apiUrl = window.location.hostname === 'localhost' ? local : prod;
  
        const response = await fetch(`${apiUrl}/posts`);        
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const postsData = await response.json(); 
        setPosts(postsData);  
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    };
  
    fetchPostsData();
  }, []);

  const latestPosts = posts.sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <>
      <HeadTitle pageTitle="Home" />
      <HeaderFour postData={allPosts} />
      <PostSectionTwelve postData={latestPosts} />
      <PostSectionTen postData={posts} />
      <Leaderboard />
      <MapComponent />
      <PostSectionTwo />
      <CategoryList />
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
