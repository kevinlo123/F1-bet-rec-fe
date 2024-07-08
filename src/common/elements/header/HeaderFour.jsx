import React, { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Nav from "./Nav";
import SocialData from "../../../data/social/SocialData.json";
import { AuthContext } from '../../../contexts/AuthContext';
import Dropdown from 'react-bootstrap/Dropdown';


const HeaderFour = ({ darkLogo, lightLogo, postData }) => {
  const dateFormate = () => {
    var day = new Date().getDate();
    var month = new Date().toLocaleString("en-US", { month: "long" });
    var year = new Date().getFullYear();

    var todayDate = day + " " + month + "," + " " + year;

    return todayDate;
  };

  if (typeof window !== "undefined") {
    var colorMode = window.localStorage.getItem("color-mode");
  }

  const [showMMenu, SetShowMMenu] = useState(false);

  const MobileShowHandler = () => SetShowMMenu(true);
  const MobileHideHandler = () => SetShowMMenu(false);

  const [togglaClass, setTogglaClass] = useState(false);

  const { isAuthenticated, isAdmin ,logout } = useContext(AuthContext);



  const toggleHandler = () => {
      setTogglaClass(active => !active);
  }

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <button
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    > 
      <Image
        width={40}
        height={40}
        src="/images/others/author.png"
        alt="Author Images"
      />
      {children}
    </button>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                 child.props.children,
            )}
          </ul>
        </div>
      );
    },
  );

  const handleLogout = () => {
    logout(); // Call the logout method from AuthContext
  };
  
  

  return (
    <>
      <header className="header axil-header header-style-4 header-light header-sticky">
        <div className="header-top">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-8 col-sm-12">
                <div className="header-top-bar d-flex flex-wrap align-items-center justify-content-between justify-content-md-start">
                  <ul className="header-top-date liststyle d-flex flrx-wrap align-items-center mr--20">
                    <li>
                      <Link href="#">
                        <a>{dateFormate()}</a>
                      </Link>
                    </li>
                  </ul>
                  <ul className="header-top-nav liststyle d-flex flrx-wrap align-items-center">
                    <li>
                      <Link href="#">
                        <a>Advertisement</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <a href="#">About</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <a>Contact</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <div className="col-lg-6 col-md-4 col-sm-12">
                <ul className="social-share-transparent md-size justify-content-center justify-content-md-end">
                  <li>
                    <a href={SocialData.fb.url}>
                      <i className={SocialData.fb.icon} />
                    </a>
                  </li>
                  <li>
                    <a href={SocialData.instagram.url}>
                      <i className={SocialData.instagram.icon} />
                    </a>
                  </li>
                  <li>
                    <a href={SocialData.twitter.url}>
                      <i className={SocialData.twitter.icon} />
                    </a>
                  </li>
                  <li>
                    <a href={SocialData.linked.url}>
                      <i className={SocialData.linked.icon} />
                    </a>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>

        <div className="header-bottom">
          <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className="col-xl-8 col-lg-4 col-md-4 col-6">
                <div className="wrapper d-block d-sm-flex flex-wrap align-items-center justify-content-start justify-content-md-start">
                  <div className="logo">
                    <Link href="/">
                      <a>
                         <h2 className="title">F1 Press News</h2>
                      </a>
                    </Link>
                  </div>

                  <div className="mainmenu-wrapper d-none d-xl-block">
                    <nav className="mainmenu-nav">
                      <Nav posts={postData}/>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-8 col-md-8 col-6">
                <div className="header-search d-flex flex-wrap align-items-center justify-content-end justify-content-xl-end">
                  <form className="header-search-form d-sm-block d-none">
                    <div className="axil-search form-group">
                      <button type="submit" className="search-button">
                        <i className="fal fa-search" />
                      </button>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                      />
                    </div>
                  </form>
                  <div className="mobile-search-wrapper d-sm-none d-block">
                    {/* <button className="search-button-toggle" onClick={toggleHandler}>
                      <i className="fal fa-search" />
                    </button> */}
                    <form className={`header-search-form ${togglaClass ? "open": ""}`}>
                      <div className="axil-search form-group">
                        <button type="submit" className="search-button">
                          <i className="fal fa-search" />
                        </button>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search"
                        />
                      </div>
                    </form>
                  </div>

                  {isAuthenticated ? (
                      <ul className="metabar-block">
                        {/* <li className="icon">
                          <Link href="#">
                            <a>
                              <i className="fas fa-bookmark" />
                            </a>
                          </Link>
                        </li> */}
                        <li className="icon">
                          <Link href="#">
                            <a>
                              <i className="fas fa-bell" />
                            </a>
                          </Link>
                        </li> 
                        <li>
                          {/* <Link href="#">
                            <a>
                              <Image
                                width={40}
                                height={40}
                                src="/images/others/author.png"
                                alt="Author Images"
                              />
                            </a>
                          </Link> */}

                          <Dropdown>
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components"></Dropdown.Toggle>
                            <Dropdown.Menu as={CustomMenu}>
                              <Dropdown.Item href="/profile" eventKey="1">
                                Profile
                              </Dropdown.Item>
                              <Dropdown.Item onClick={handleLogout} eventKey="2">
                                Log out
                              </Dropdown.Item>

                              {isAdmin && (
                                <Dropdown.Item href="/admin" eventKey="3">
                                  Admin Actions
                                </Dropdown.Item>
                              )}
                            </Dropdown.Menu>
                          </Dropdown>
                        </li>
                      </ul>
                    ) : (
                      <Link href="/login">
                        <a className="axil-button button-rounded hover-flip-item-wrapper">
                          <span className="hover-flip-item">
                            <span data-text="Log in">Log in</span>
                          </span>
                        </a>
                      </Link>  
                    )}        
                  {/* Start Hamburger Menu  */}
                  <div className="hamburger-menu d-block d-xl-none">
                    <div className="hamburger-inner">
                      <div className="icon" onClick={MobileShowHandler}>
                        <i className="fal fa-bars" />
                      </div>
                    </div>
                  </div>
                  {/* End Hamburger Menu  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu menuShow={showMMenu} menuHide={MobileHideHandler} />
    </>
  );
};

export default HeaderFour;
