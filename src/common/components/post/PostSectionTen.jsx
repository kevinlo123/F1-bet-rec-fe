import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { SectionTitleOne } from "../../elements/sectionTitle/SectionTitle";
import { slugify } from "../../utils";
import TwitterFeed from "../TwitterFeed/TwitterFeed";

const filters = [
  { id: 1, cate: "News and updates" },
  { id: 2, cate: "Races and Events" },
  { id: 3, cate: "Lifestyle and culture" },
  { id: 4, cate: "Beyond the grid" },
  { id: 5, cate: "History and Legacy" },
];

const PostSectionTen = ({ postData }) => {
  const local = "http://localhost:3000";
  const prod = "https://limitless-escarpment-05345-1ca012576c29.herokuapp.com";
  const apiUrl = typeof window !== "undefined" && window.location.hostname === "localhost" ? local : prod;

  const [activeNav, setActiveNav] = useState(slugify(filters[0].cate));
  const [tabPostData, setTabPostData] = useState([]);
  
  useEffect(() => {
    if (postData?.length > 0) {  // Ensure postData is defined before accessing length
      const defaultData = postData.filter(
        (post) => slugify(post.cate) === activeNav
      );
      setTabPostData(defaultData);
    }
  }, [postData]);

  const handleChange = (e) => {
    let filterText = slugify(e.target.textContent);
    setActiveNav(filterText);

    const filteredData = postData.filter(
      (item) => slugify(item.cate) === filterText
    );

    setTabPostData(filteredData);
  };

  return (
    <div className="axil-post-grid-area axil-section-gap bg-color-white">
      <div className="container">
        <SectionTitleOne title="Top Stories" />
        <div className="row">
          <div className="col-lg-12">
            <Tab.Container id="axilTab" defaultActiveKey={activeNav}>
              <Nav className="axil-tab-button nav nav-tabs mt--20">
                {filters.map((data) => (
                  <Nav.Item key={data.id}>
                    <Nav.Link onClick={handleChange} eventKey={slugify(data.cate)}>
                      {data.cate}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>

              <Tab.Content className="grid-tab-content mt--10">
                <Tab.Pane className="single-post-grid" eventKey={activeNav}>
                  <div className="row mt--40">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                      {tabPostData.length > 0 ? (
                        tabPostData.slice(0, 4).map((data) => (
                          <div className="content-block post-medium post-medium-border border-thin" key={data.id}>
                            <div className="post-thumbnail">
                              <Link href={`/post/${data.id}`}>
                                {data.feature_img ? (
                                  <Image
                                    src={`${apiUrl}${data.feature_img.thumb.url}`}
                                    alt={data.title}
                                    height={100}
                                    width={100}
                                    priority
                                  />
                                ) : (
                                  <p>Image not available</p>
                                )}
                              </Link>
                            </div>
                            <div className="post-content">
                              <div className="post-cat">
                                <div className="post-cat-list" style={{margin: 0}}>
                                  <Link href={`/category/${slugify(data.cate)}`}>
                                    <span className="hover-flip-item">
                                      <span data-text={data.cate}>{data.cate}</span>
                                    </span>
                                  </Link>
                                </div>
                              </div>
                              <h4 className="title">
                                <Link href={`/post/${data.id}`}>{data.title}</Link>
                              </h4>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No posts available.</p>
                      )}
                    </div>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSectionTen;
