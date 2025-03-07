import Image from 'next/image';
import Link from "next/link";
import { useColorMode } from '../../../contexts/ColorModeContext'; // Import the custom hook

const FooterOne = () => {
  const { colorMode } = useColorMode(); // Get the current color mode
  
  return (
    <div className="axil-footer-area axil-footer-style-1 footer-variation-2">
      <div className="footer-mainmenu">
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-md-6 col-sm-6 col-12">
              <div className="footer-widget">
                <h2 className="title">Explore</h2>
                <div className="inner">
                  <ul className="ft-menu-list">
                    <li>
                      <Link href={'/'}> 
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href={'/news'}> 
                        F1 News
                      </Link>
                    </li>
                    <li>
                      <Link href={'/calendar'}> 
                        F1 2025 Calendar
                      </Link>
                    </li>
                    <li>
                      <Link href={'/driver-standings'}> 
                        Driver Standings
                      </Link>
                    </li>
                    <li>
                      <Link href={'/constructor-standings'}> 
                        Constructor Standings
                      </Link>
                    </li>
                    <li>
                      <Link href={'/predictions'}> 
                        F1 Predictions
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6 col-12">
              <div className="footer-widget">
                <h2 className="title">Categories</h2>
                <div className="inner">
                  <ul className="ft-menu-list">
                    <li>
                      <a href="#">News and updates</a>
                    </li>
                    <li>
                      <a href="#">Races and Events</a>
                    </li>
                    <li>
                      <a href="#">Lifestyle and culture</a>
                    </li>
                    <li>
                      <a href="#">Beyond the grid</a>
                    </li>
                    <li>
                      <a href="#">History and Legacy</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6 col-12">
              <div className="footer-widget">
                <h2 className="title">Info</h2>
                <div className="inner">
                  <ul className="ft-menu-list">
                    <li>
                      <a href="#">About Us</a>
                    </li>
                    <li>
                      <a href="#">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6 col-12">
              <div className="footer-widget">
                <h2 className="title">Account</h2>
                <div className="inner">
                  <ul className="ft-menu-list">
                    <li>
                      <a href="#">Login</a>
                    </li>
                    <li>
                      <a href="#">Signup</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Start Footer Top Area  */}
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <div className="logo">
                <Link href="/">
                  <a>
                    <Image 
                      src={colorMode === "dark" ? '/images/logo/logo-black-bg.png' : '/images/logo/logo-white-bg.png'}
                      alt="F1 press news logo"
                      height={200}
                      width={125}
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-lg-8 col-md-8">
              {/* Start Post List  */}
              <div className="d-flex justify-content-start mt_sm--15 justify-content-md-end align-items-center flex-wrap">
                <h5 className="follow-title mb--0 mr--20">Follow Us</h5>
                <ul className="social-icon color-tertiary md-size justify-content-start">
                  <li>
                    <a href="https://twitter.com/">
                      <i className="fa-brands fa-x-twitter" />
                    </a>
                  </li>
                </ul>
              </div>
              {/* End Post List  */}
            </div>
          </div>
        </div>
      </div>
      {/* End Footer Top Area  */}
      {/* Start Copyright Area  */}
      <div className="copyright-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-9 col-md-8">
              <div className="copyright-left">
                <ul className="mainmenu justify-content-start">
                  <li>
                    <Link href="/about">
                      <a className="hover-flip-item-wrapper">
                        <span className="hover-flip-item">
                          <span data-text="Contact Us">Contact Us</span>
                        </span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">
                      <a className="hover-flip-item-wrapper">
                        <span className="hover-flip-item">
                          <span data-text="Privacy Policy">Privacy Policy</span>
                        </span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a className="hover-flip-item-wrapper">
                        <span className="hover-flip-item">
                          <span data-text="Advertise with Us">
                            Advertise with Us
                          </span>
                        </span>
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="copyright-right text-start text-md-end mt_sm--20">
                <p className="b3">
                  All Rights Reserved © {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Copyright Area  */}
    </div>
  );
};

export default FooterOne;
