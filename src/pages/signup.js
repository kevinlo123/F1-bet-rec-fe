import Image from 'next/image';
import Link from 'next/link';
import FooterOne from "../common/elements/footer/FooterOne";
import HeaderFour from "../common/elements/header/HeaderFour";
import { getAllPosts } from '../../lib/api';
import HeadTitle from "../common/elements/head/HeadTitle";
import React, { useState } from 'react';
import { useRouter } from 'next/router';


const Signup = ({allPosts}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const router = useRouter();
    const local = 'http://localhost:3000/users'
    const prod = 'https://limitless-escarpment-05345-1ca012576c29.herokuapp.com/users'

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            user: {
                email,
                password,
                username
            }
        };

        try {
            const response = await fetch(prod, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                // Handle successful response
                console.log('User signed up successfully!');
                router.push('/');
            } else {
                // Handle errors
                console.error('Error signing up:', response.statusText);
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <>
            <HeadTitle pageTitle="Login" />
            <HeaderFour postData={allPosts} pClass="header-light header-sticky header-with-shadow" />
            <div className="signup-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6 axil-section-gap">
                            <div className="inner">
                                <h1 className="title">Join us!</h1>
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
                                    <div className="axil-login form-group">
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
                                    <div className="login-button-cont form-group">
                                        <button type="submit" className="axil-button button-rounded hover-flip-item-wrapper">
                                            <span className="hover-flip-item">
                                                <span data-text="Sign up">Sign up</span>
                                            </span>
                                        </button>
                                    </div>
                                </form>
                                <p className="signup-text">
                                    Have an account?
                                    <Link href="/login">
                                        <a className="primary-color">
                                            Log in   
                                        </a>
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6 login-img">
                            <div className="row">
                                <Image
                                    layout="fill"
                                    src="/images/others/f1-signup.jpg"
                                    alt="signup image"
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

export default Signup;


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