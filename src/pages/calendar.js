import FooterOne from "../common/elements/footer/FooterOne";
import HeaderFour from "../common/elements/header/HeaderFour";
import { getAllPosts } from '../../lib/api';
import HeadTitle from "../common/elements/head/HeadTitle";
import PostSectionSix from '../common/components/post/PostSectionSix';
import scheduleData from '../data/schedule/schedule-2024.json'
import CategoryList from "../common/components/category/CategoryList";
import PostSectionOne from "../common/components/post/PostSectionOne";
import React, { useState, useEffect } from 'react';

const Calendar = ({allPosts}) => {
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

    return (
        <>
            <HeadTitle pageTitle="F1 schedule" />
            <HeaderFour postData={allPosts} />
            <PostSectionSix postData={allPosts} scheduleData={scheduleData}/>
            <PostSectionOne postData={posts}/>
            <CategoryList />
            <FooterOne />
        </>
    );
}

export default Calendar;


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
    ])
  
        return {
            props: { allPosts }
        }
  }