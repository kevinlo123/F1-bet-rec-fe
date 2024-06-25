import { useState } from 'react';
import Link from 'next/link'
import Image from "next/image";
import { slugify } from "../../utils";

const filters = [
    {
      id: 1,
      cate: "Design",
    },
    {
      id: 2,
      cate: "Travel",
    },
    {
      id: 3,
      cate: "SEO",
    },
    {
      id: 4,
      cate: "Research",
    },
  ];

const defaultActiveCat = slugify(filters[0].cate);

const Nav = ({posts}) => {

    const defaultData = posts.filter(
        (post) => slugify(post.cate) === defaultActiveCat
      );
    
      const [activeNav, setActiveNav] = useState(defaultActiveCat);
      const [tabPostData, setTabPostData] = useState(defaultData);
    
      const handleChange = (e) => {
        let filterText = slugify(e.target.textContent);
        setActiveNav(filterText);
        
        let tempData = [];
    
        for (let i = 0; i < posts.length; i++) {
          const element = posts[i];
          let categories = element["cate"];
    
          if (slugify(categories).includes(filterText)) {
            tempData.push(element);
          }
        }
    
        setTabPostData(tempData);
      };
    
    return (
        <ul className="mainmenu">
            <li><a href="/">Home</a>
            </li>
            <li>
                <Link href="/news">
                    <a>F1 News</a>
                </Link>
            </li>
            <li className="menu-item-has-children megamenu-wrapper">
                <Link href="/calendar">
                    <a>F1 Calendar</a>
                </Link>
                {/* <ul className="megamenu-sub-menu">
                    <li className="megamenu-item">
                        <div className="axil-vertical-nav">
                            <ul className="vertical-nav-menu">
                                {filters.map((data) => (
                                    <li className={`vertical-nav-item ${slugify(data.cate) === activeNav ? "active" : ""}`} key={data.id}>
                                        <a className="hover-flip-item-wrapper" href="#" onMouseOver={handleChange}>
                                            <span className="hover-flip-item">
                                                <span data-text={data.cate}>{data.cate}</span>
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="axil-vertical-nav-content">
                            <div className="axil-vertical-inner tab-content">
                                <div className="axil-vertical-single">
                                    <div className="row">
                                        {tabPostData.slice(0, 4).map((data) => (
                                            <div className="col-lg-3" key={data.slug}>
                                                <div className="content-block image-rounded">
                                                    <div className="post-thumbnail mb--20">
                                                    <Link href={`/post/${data.slug}`}>
                                                        <a>
                                                        <Image
                                                            src={data.featureImg}
                                                            alt={data.title}
                                                            height={130}
                                                            width={200}
                                                            priority={true}
                                                        />
                                                        </a>
                                                    </Link>
                                                    </div>
                                                    <div className="post-content">
                                                        <div className="post-cat">
                                                            <div className="post-cat-list">
                                                            <Link href={`/category/${slugify(data.cate)}`}>
                                                                <a className="hover-flip-item-wrapper">
                                                                <span className="hover-flip-item">
                                                                    <span data-text={data.cate}>
                                                                    {data.cate}
                                                                    </span>
                                                                </span>
                                                                </a>
                                                            </Link>
                                                            </div>
                                                        </div>
                                                        <h5 className="title">
                                                            <Link href={`/post/${data.slug}`}>
                                                                <a>{data.title}</a>
                                                            </Link>
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul> */}
            </li>
            <li className="menu-item-has-children">
                <span>F1 Standings</span>
                <ul className="axil-submenu">
                    <li>
                        <Link href="/driver-standings">
                            <a>
                                Drivers
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/constructor-standings">
                            <a>
                                Constructors
                            </a>
                        </Link>
                    </li>
                </ul>
            </li>
            <li>
                <Link href="/lifestyle-blog">
                    <a>F1 Predictions</a>
                </Link>
            </li>
        </ul>
    );
}

export default Nav;
