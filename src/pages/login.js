import Image from 'next/image';
import Link from 'next/link';
import FooterOne from "../common/elements/footer/FooterOne";
import HeaderFour from "../common/elements/header/HeaderFour";
import { getAllPosts } from '../../lib/api';
import HeadTitle from "../common/elements/head/HeadTitle";

const Login = ({allPosts}) => {
    return (
        <>
            <HeadTitle pageTitle="Login" />
            <HeaderFour postData={allPosts} pClass="header-light header-sticky header-with-shadow" />
            <div className="">
                <div className="container">
                    <div className="row">
                        <div className="">
                            <div className="inner">
                                <h1>Login</h1>
                                <form className="login-form">
                                    <div className="axil-login form-group">
                                        <span className="search-button">
                                            <i className="fal fa-user-circle" />
                                        </span>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                            required
                                        />
                                    </div>
                                    <div className="axil-login form-group">
                                        <span className="search-button">
                                            <i className="fal fa-user-circle" />
                                        </span>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            required
                                        />
                                    </div>
                                    <div className="axil-login form-group">
                                        <button type="submit" className="axil-button button-rounded hover-flip-item-wrapper">
                                            <span className="hover-flip-item">
                                                <span data-text="Log in">Log in</span>
                                            </span>
                                        </button>
                                    </div>
                                </form>
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