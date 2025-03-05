import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { SectionTitleOne } from "../../elements/sectionTitle/SectionTitle";
import { slugify } from "../../utils";

const filters = [
  {
    id: 1,
    cate: "Gadget",
  },
  {
    id: 2,
    cate: "Technology",
  },
  {
    id: 3,
    cate: "Design",
  },
  {
    id: 4,
    cate: "Products",
  },
];

const defaultActiveCat = slugify(filters[0].cate);

const PostSectionTen = ({ postData }) => {
  const defaultData = postData.filter(
    (post) => slugify(post.cate) === defaultActiveCat
  );

  const [activeNav, setActiveNav] = useState(defaultActiveCat);
  const [tabPostData, setTabPostData] = useState(defaultData);

  const handleChange = (e) => {
    let filterText = slugify(e.target.textContent);
    setActiveNav(filterText);

    let tempData = [];

    for (let i = 0; i < postData.length; i++) {
      const element = postData[i];
      let categories = element["cate"];

      if (slugify(categories).includes(filterText)) {
        tempData.push(element);
      }
    }

    setTabPostData(tempData);
  };

  const firstPost = tabPostData[0];

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
                    <Nav.Link
                      onClick={handleChange}
                      eventKey={slugify(data.cate)}
                    >
                      {data.cate}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>

              <Tab.Content className="grid-tab-content mt--10">
                <Tab.Pane className="single-post-grid" eventKey={activeNav}>
                  <div className="row mt--40">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                        {tabPostData.slice(1, 5).map((data) => (
							<div className="content-block post-medium post-medium-border border-thin" key={data.slug}>
								<div className="post-thumbnail">
								<Link href={`/post/${data.slug}`}>
									<a>
									<Image
										src={data.featureImg}
										alt={data.title}
										height={100}
										width={100}
										priority={true}
									/>
									</a>
								</Link>
								</div>
								<div className="post-content">
									<div className="post-cat">
									<div className="post-cat-list">
										<Link
										href={`/category/${slugify(data.cate)}`}
										>
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
									<h4 className="title">
									<Link href={`/post/${data.slug}`}>
										<a>{data.title}</a>
									</Link>
									</h4>
								</div>
							</div>
                        ))}
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
