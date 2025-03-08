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
  const [loading, setLoading] = useState(true);
  const { colorMode } = useColorMode(); 

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
        setLoading(false);  
      } catch (error) {
        console.error('Error loading posts:', error);
        setLoading(false); 
      }
    };
  
    fetchPostsData();
  }, []);

  const latestPosts = posts.sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <>
      <HeadTitle pageTitle="Home" />
      <HeaderFour postData={allPosts} />
      {loading ? (
        <div className="skeleton-container container pt--80 pb--80">
          <div className="skeleton-feature">
            { colorMode === "dark" ?
              <Skeleton height={425} baseColor="#2a2a2a" highlightColor="#3e3e3e" borderRadius={8} /> :
              <Skeleton height={425} borderRadius={8} />               
            }
          </div>

          <div className="skeleton-other">
            { colorMode === "dark" ?
              <>
                <Skeleton height={200} baseColor="#2a2a2a" highlightColor="#3e3e3e" borderRadius={8} />
                <Skeleton height={200} baseColor="#2a2a2a" highlightColor="#3e3e3e" borderRadius={8} />
                <Skeleton height={200} baseColor="#2a2a2a" highlightColor="#3e3e3e" borderRadius={8} />
                <Skeleton height={200} baseColor="#2a2a2a" highlightColor="#3e3e3e" borderRadius={8} />
              </>
                          :
              <>
                <Skeleton height={200} borderRadius={8} />   
                <Skeleton height={200} borderRadius={8} />
                <Skeleton height={200} borderRadius={8} />
                <Skeleton height={200} borderRadius={8} />            
              </>
            }
          </div>
        </div>
      ) : (
        <PostSectionTwelve postData={latestPosts} />
      )}
      <PostSectionTen postData={posts} />
      <Leaderboard />
      <MapComponent />
      {/* <PostSectionThree postData={videoPost} heading="Featured Video" /> */}
      {/* <PostSectionOne postData={allPosts} /> */}
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
