import Image from 'next/image';
import Link from 'next/link';
import FooterOne from "../common/elements/footer/FooterOne";
import HeaderFour from "../common/elements/header/HeaderFour";
import { getAllPosts } from '../../lib/api';
import CategoryList from '../common/components/category/CategoryList';
import HeadTitle from "../common/elements/head/HeadTitle";
import { AuthContext } from '../contexts/AuthContext';
import React, { useContext, useEffect, useState } from 'react';

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const Profile = ({allPosts}) => {
    const { getUserData } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [tier, setTier] = useState('');
    const [team, setTeam] = useState('');
    const [bio, setBio] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const prod = 'https://limitless-escarpment-05345-1ca012576c29.herokuapp.com/';

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('jwtToken');
            const userId = localStorage.getItem('userId');

            if (token && userId) {
                try {
                    const userData = await getUserData(token, userId);
                    setUsername(userData.user.username);
                    setTier(userData.user.subscription_tier);
                    setTeam(userData.user.favorite_f1_team);
                    setBio(userData.user.bio);
                    setProfilePic(userData.user.profile_picture.url)
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <HeadTitle pageTitle="Your Profile" />
            <HeaderFour postData={allPosts} />
            <div className="axil-author-area axil-author-banner bg-color-grey profile-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1>User Profile</h1>
                            <div className="breadcrumb">
                                <Link href="/edit-profile">
                                    <a className="hover-flip-item-wrapper">
                                        <span className="hover-flip-item">
                                            <span data-text={'Edit Profile'}>
                                                Edit Profile
                                            </span>
                                        </span>
                                    </a>
                                </Link>
                            </div>
                            <div className="about-author">
                                <div className="media">
                                    <div className="thumbnail">
                                        <Image
                                            width={100}
                                            height={100}
                                            src={profilePic === '' || profilePic === null ? `/images/others/author.png` :`${prod}/${profilePic}`}
                                            alt="User profile picture"
                                        />
                                    </div>
                                    <div className="media-body">
                                        <div className="author-info">
                                            <h2 className="title">{username}</h2>
                                        </div>
                                        <div className="content">
                                            <p className="b1 description">{bio === '\n' || bio === null || bio === '' ? 'You have not added a bio yet. Edit your profile to add one' : bio}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="axil-section-gap bg-color-white profile-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>Your Subscribtion:</h2>
                            <div className="subscription--standard bg-color-grey">
                                <div className="subscription-inner">
                                    <div className="subscription-content">
                                        <div className="subscription-content-top">
                                            <p className="username">{username}</p>
                                            {/* needs to be updated once editing is done swap the operator to ===*/}
                                            {team !== null ? (
                                                // <p>{'N/A - set a team'}</p>
                                                <p className="team-text">Team: N/A</p>
                                            ) : (
                                                <Image
                                                    src={'/images/team-logos/mercedes-logo.png'}
                                                    height={40}
                                                    width={40}
                                                    priority={true}
                                                />
                                            )}
                                        </div>
                                        <div className="subscription-content-bottom">
                                            <p className="tier">Status: <span>{capitalizeFirstLetter(tier)}</span></p> 
                                            <Link href="/subscribe">
                                                <a className="axil-link-button">
                                                    Upgrade &#10143;
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CategoryList cateData={allPosts} />
            <FooterOne />
        </>
    );
}

export default Profile;

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
      props: { allPosts }
    }
  }
