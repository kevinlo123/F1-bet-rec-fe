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
import { getPosts } from '../../lib/postsService';
import React, { useState, useEffect } from 'react';

const Admin = ({ allPosts }) => {


  return (
    <>
      <HeadTitle pageTitle="Admin" />
      <HeaderFour postData={allPosts} />
      <section>
        {/* code here */}
      </section>
      <FooterOne />
    </>
  );
};

export default Admin;

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
