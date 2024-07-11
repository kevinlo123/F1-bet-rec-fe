import Image from 'next/image';
import Link from 'next/link';
import FooterOne from "../common/elements/footer/FooterOne";
import HeaderFour from "../common/elements/header/HeaderFour";
import { getAllPosts } from '../../lib/api';
import CategoryList from '../common/components/category/CategoryList';
import HeadTitle from "../common/elements/head/HeadTitle";
import { AuthContext } from '../contexts/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const EditProfile = ({allPosts}) => {
    const { getUserData } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const local = 'http://localhost:3000/api/v1/login'
    const prod = 'https://limitless-escarpment-05345-1ca012576c29.herokuapp.com/api/v1/users'
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('jwtToken');
            const userId = localStorage.getItem('userId');

            if (token && userId) {
                try {
                    const userData = await getUserData(token, userId);
                    setEmail(userData.user.email);
                    setUsername(userData.user.username)
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            user: {
                email,
                username
            }
        };

        try {
            const response = await fetch(`${prod}/${localStorage.getItem('userId')}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
        
            if (response.ok) {
                const data = await response.json();
                toast.success(`${data.message}`);

                setTimeout(() => {
                    router.push('/profile');
                }, 1000)
            } else {
                // Handle error responses from Rails API
                const errorMessage = await response.json();
                console.error('Error updating user data:', errorMessage);
                toast.error(`${errorMessage.error}`);
            }
        } catch (error) {
            console.error('Network error:', error);
            toast.error('Network error');
        }
    };

    return (
        <>
            <HeadTitle pageTitle="Your Profile" />
            <HeaderFour postData={allPosts} />
            <div className="axil-section-gap edit-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1>Edit your Profile</h1>
                        </div>
                        <form className="profile-edit-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <span className="search-button">
                                    <i className="fal fa-user-circle" />
                                </span>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <span className="search-button">
                                    <i className="fal fa-key" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="User name"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="edit-info-button-cont form-group">
                                <button type="submit" className="axil-button button-rounded hover-flip-item-wrapper">
                                    <span className="hover-flip-item">
                                        <span data-text="Save">Save</span>
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <CategoryList cateData={allPosts} />
            <FooterOne />
        </>
    );
}

export default EditProfile;

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