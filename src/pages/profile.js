import Image from 'next/image';
import Link from 'next/link';
import FooterOne from "../common/elements/footer/FooterOne";
import HeaderOne from "../common/elements/header/HeaderOne";
import { getAllPosts } from '../../lib/api';
import HeadTitle from "../common/elements/head/HeadTitle";
import { AuthContext } from '../contexts/AuthContext';
import React, { useContext, useEffect, useState } from 'react';

const Profile = ({allPosts}) => {
    const { getUserData } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('jwtToken');
            const userId = localStorage.getItem('userId');

            if (token && userId) {
                try {
                    const userData = await getUserData(token, userId);
                    setUsername(userData.user.username); // Adjust according to your actual user data structure
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <HeadTitle pageTitle="404 Not Found" />
            <HeaderOne postData={allPosts} pClass="header-light header-sticky header-with-shadow" />
            <div className="bg-color-grey">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner">
                                <h1>Welcome, {username}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FooterOne />
        </>
    );
}

export default Profile;


export async function getStaticProps() {
    const allPosts = getAllPosts([
      'title',
      'featureImg',
      'slug',
      'cate',
    ])
  
    return {
      props: { allPosts }
    }
  }