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
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import constructorData from '../data/constructors/constructor-standings.json'
import ProtectedRoute from '../common/utils/ProtectedRoute'; // Import from utils

const EditProfile = ({ allPosts }) => {
    const { getUserData } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState('Select your team');
    const local = 'http://localhost:3000/api/v1/users';
    const prod = 'https://limitless-escarpment-05345-1ca012576c29.herokuapp.com/api/v1/users';
    const apiUrl = window.location.hostname === 'localhost' ? local : prod;
    const router = useRouter();
    const teamNames = constructorData.standings.map((standing) => standing.team);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('jwtToken');
            const userId = localStorage.getItem('userId');

            if (token && userId) {
                try {
                    const userData = await getUserData(token, userId);
                    setEmail(userData.user.email);
                    setUsername(userData.user.username);
                    setBio(userData.user.bio);
                    setSelectedTeam(userData.user.favorite_f1_team || 'Select your team');
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchData();
    }, [getUserData]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleTeamSelect = (team) => {
        setSelectedTeam(team);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('user[email]', email);
        formData.append('user[username]', username);
        formData.append('user[bio]', bio);
        formData.append('user[favorite_f1_team]', selectedTeam);

        if (selectedFile) {
            formData.append('user[profile_picture]', selectedFile);
        }

        try {
            const response = await fetch(`${apiUrl}/${localStorage.getItem('userId')}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(`${data.message}`);
                setTimeout(() => {
                    router.push('/profile');
                }, 1000);
            } else {
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
        <ProtectedRoute>
            <HeadTitle pageTitle="Edit Your Profile" />
            <HeaderFour postData={allPosts} />
            <div className="axil-section-gap edit-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1>Edit your Profile</h1>
                        </div>
                        <form className="profile-edit-form" onSubmit={handleSubmit}>
                            <div className="form-group-img-upload">
                                <span>Change your profile picture:</span>
                                <input
                                    type="file"
                                    className="profile-edit-image"
                                    id="profilePicture"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </div>
                            <div>
                                <label>Favorite team:</label>
                                <DropdownButton id="dropdown-basic-button" title={selectedTeam}>
                                    <ul className="list-unstyled">
                                        {teamNames.map((team, index) => (
                                            <Dropdown.Item key={index} onClick={() => handleTeamSelect(team)}>
                                                {team}
                                            </Dropdown.Item>
                                        ))}
                                    </ul>
                                </DropdownButton>
                            </div>
                            <div>
                                <label>Email:</label>
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
                            </div>
                            <div>
                                <label>Username:</label>
                                <div className="form-group">
                                    <span className="search-button">
                                        <i className="fal fa-user" />
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
                            </div>
                            <div>
                                <label>Bio:</label>
                                <div className="axil-login form-group">
                                    <textarea
                                        className="form-control"
                                        placeholder="Bio"
                                        value={bio === '\n' || bio === null || bio === 'null' ? '' : bio}
                                        onChange={(e) => setBio(e.target.value)}
                                    ></textarea>
                                </div>
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
        </ProtectedRoute>
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
