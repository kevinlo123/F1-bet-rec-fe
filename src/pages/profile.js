import Image from 'next/image';
import Link from 'next/link';
import FooterOne from "../common/elements/footer/FooterOne";
import HeaderFour from "../common/elements/header/HeaderFour";
import { getAllPosts } from '../../lib/api';
import CategoryList from '../common/components/category/CategoryList';
import HeadTitle from "../common/elements/head/HeadTitle";
import { AuthContext } from '../contexts/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
import constructorData from '../data/constructors/constructor-standings.json';
import ProtectedRoute from '../common/utils/ProtectedRoute'; // Import from utils

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const Profile = ({ allPosts }) => {
    const { getUserData } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [tier, setTier] = useState('');
    const [team, setTeam] = useState('');
    const [teamDetails, setTeamDetails] = useState(null);
    const [bio, setBio] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const local = 'http://localhost:3000';
    const prod = 'https://limitless-escarpment-05345-1ca012576c29.herokuapp.com/';
    const apiUrl = window.location.hostname === 'localhost' ? local : prod;

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('jwtToken');
            const userId = localStorage.getItem('userId');

            if (token && userId) {
                try {
                    const userData = await getUserData(token, userId);
                    setUsername(userData.user.username);
                    setTier(userData.user.subscription_tier);
                    setBio(userData.user.bio);
                    setProfilePic(userData.user.profile_picture.url);
                    setTeam(userData.user.favorite_f1_team);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchData();
    }, [getUserData]);

    useEffect(() => {
        if (team) {
            const getTeamDetails = (teamName) => {
                const team = constructorData.standings.find((standing) => standing.team === teamName);
                return team ? { logoImg: team.logoImg, customImageWidth: team.customImageWidth } : null;
            };

            const details = getTeamDetails(team);
            setTeamDetails(details);
        }
    }, [team]);

    return (
        <ProtectedRoute>
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
                                            src={profilePic === '' || profilePic === null ? `/images/others/author.png` :`${apiUrl}/${profilePic}`}
                                            alt="User profile picture"
                                        />
                                    </div>
                                    <div className="media-body">
                                        <div className="author-info">
                                            <h2 className="title">{username}</h2>
                                        </div>
                                        <div className="content">
                                            <p className="b1 description">{bio === '\n' || bio === null || bio === '' || bio === 'null' ? 'You have not added a bio yet. Edit your profile to add one' : bio}</p>
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
                            <h2>Your Subscription:</h2>
                            <div className="subscription--standard bg-color-grey">
                                <div className="subscription-inner">
                                    <div className="subscription-content">
                                        <div className="subscription-content-top">
                                            <p className="username">{username}</p>
                                            {teamDetails ? (
                                                <Image
                                                    src={teamDetails.logoImg}
                                                    height={40}
                                                    width={parseInt(teamDetails.customImageWidth, 10)}
                                                    priority={true}
                                                    alt={`${team} logo`}
                                                />
                                            ) : (
                                                <p className="team-text">Team: N/A</p>
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
        </ProtectedRoute>
    );
};

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
        props: { allPosts },
    };
}
