import Image from 'next/image';
import Link from 'next/link';
import FooterOne from "../common/elements/footer/FooterOne";
import HeaderFour from "../common/elements/header/HeaderFour";
import { getAllPosts } from '../../lib/api';
import HeadTitle from "../common/elements/head/HeadTitle";
import { AuthContext } from '../contexts/AuthContext';
import React, { useState, useContext } from 'react';
import toast from 'react-hot-toast';

//https://limitless-escarpment-05345-1ca012576c29.herokuapp.com/users

const Login = ({allPosts}) => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const local = 'http://localhost:3000/api/v1/login'
    const prod = 'https://limitless-escarpment-05345-1ca012576c29.herokuapp.com/api/v1/login'
    const apiUrl = window.location.hostname === 'localhost' ? local : prod;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            user: {
                email,
                password
            }
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
        
            if (response.ok) {
                const data = await response.json();
                const token = data.token;
        
                if (token) {
                    login(data, token, data.user.admin, data.user.id);
                } else {
                    console.error('No token found in the response');
                }
            } else {
                // Handle error responses from Rails API
                const errorMessage = await response.json();
                console.error('Error logging in:', errorMessage);
                toast.error(`${errorMessage.error}`);
            }
        } catch (error) {
            console.error('Network error:', error);
            toast.error('Network error');
        }
    };


    return (
        <>
            <HeadTitle pageTitle="Login" />
            <HeaderFour postData={allPosts} pClass="header-light header-sticky header-with-shadow" />
            <div className="login-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6 axil-section-gap">
                            <div className="inner">
                                <h1 className="title">Welcome Back!</h1>
                                <form className="login-form" onSubmit={handleSubmit}>
                                    <div className="axil-login form-group">
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
                                    <div className="axil-login form-group">
                                        <span className="search-button">
                                            <i className="fal fa-key" />
                                        </span>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="login-button-cont form-group">
                                        <button type="submit" className="axil-button button-rounded hover-flip-item-wrapper">
                                            <span className="hover-flip-item">
                                                <span data-text="Log in">Log in</span>
                                            </span>
                                        </button>
                                    </div>
                                </form>
                                <p className="signup-text">
                                    Don&rsquo;t have an account?
                                    <Link href="/signup">
                                        <a className="primary-color">
                                            Sign up   
                                        </a>
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6 login-img">
                            <div className="row">
                                <Image
                                    layout="fill"
                                    src="/images/others/f1-login.jpg"
                                    alt="login image"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FooterOne />
        </>
    );
}

export default Login;


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