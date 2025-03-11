"use client"; // Ensure this is a client component

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import HeadTitle from "../common/elements/head/HeadTitle";
import BreadcrumbOne from "../common/elements/breadcrumb/breadcrumbOne";
import FooterOne from "../common/elements/footer/FooterOne";
import PostSectionSearch from "../common/components/post/PostSectionSearch";
import CategoryList from "../common/components/category/CategoryList";
import HeaderFour from "../common/elements/header/HeaderFour";
import { getAllPosts } from '../../lib/api';

const SearchResults = ({ allPosts }) => {
  const router = useRouter();
  const query = router.query.query

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const local = 'http://localhost:3000';
    const prod = 'https://limitless-escarpment-05345-1ca012576c29.herokuapp.com';
    const apiUrl = window.location.hostname === 'localhost' ? local : prod;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/api/v1/posts/search?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        console.log("Search API Response:", data);
        setResults(Array.isArray(data.posts) ? data.posts : []); // Use data.posts instead of data
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [router.isReady, query]);
  console.log(results)

  return (
    <>
      <HeaderFour postData={allPosts} />
      <HeadTitle pageTitle="Search Results" />
      <BreadcrumbOne title={`Search results for "${query}"`} />

      {loading ? <p>Loading...</p> : <PostSectionSearch postData={results} adBanner={true} />}
      
      <CategoryList />
      <FooterOne />
    </>
  );
};

export default SearchResults;

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

