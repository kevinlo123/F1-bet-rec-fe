import Image from 'next/image';
import Link from 'next/link';
import SocialData from "../data/social/SocialData.json";
import HeadTitle from "../common/elements/head/HeadTitle";

const Maintenance = () => {
    return (
        <>
       
            <HeadTitle pageTitle="Coming Soon"/>
            <div className="maintanence-area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="order-2 order-lg-1 col-lg-6 mt_md--40 mt_sm--40">
                            <div className="content">
                                <div className="logo">
                                    <Link href="/">
                                        <a>
                                            <Image
                                                className="dark-logo"
                                                width={153}
                                                height={40}
                                                src={'/images/logo/logo-white-bg.png'}
                                                alt="Blogar logo"
                                            />
                                        </a>
                                    </Link>
                                </div>
                                <h1 className="title">We&rsquo;re Building Something Exciting!</h1>
                                <h5>Our platform is currently under maintanence, but we&rsquo;re working hard to bring you the best source for all things Formula 1 and more!.</h5>
                                <p>Stay tuned—something fast is coming soon.</p>
                                <div className="inner d-flex align-items-center flex-wrap">
                                    <h5 className="follow-title mb--0 mr--20">Follow Us</h5>
                                    <ul className="social-icon color-tertiary md-size justify-content-start">
                                        <li>
                                            <a href={SocialData.twitter.url}>
                                                <i className={SocialData.twitter.icon} />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 order-lg-2 col-lg-5 offset-lg-1">
                            <div className="thumbnail">
                            <Image
                                width={495}
                                height={480}
                                src="/images/others/maintenance-gif.gif"
                                alt="Coming Soon"
                            />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Maintenance;