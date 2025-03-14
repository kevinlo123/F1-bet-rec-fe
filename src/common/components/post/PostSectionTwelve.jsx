import Link from "next/link";
import Image from "next/image";
import { slugify } from "../../utils";
import Skeleton from 'react-loading-skeleton'; // Make sure you've installed this or have a similar Skeleton component
import { useColorMode } from "../../../contexts/ColorModeContext";

const PostSectionTwelve = ({ postData }) => {
  const local = 'http://localhost:3000';
  const prod = 'https://limitless-escarpment-05345-1ca012576c29.herokuapp.com';
  const apiUrl = window.location.hostname === 'localhost' ? local : prod;
  const { colorMode } = useColorMode(); 
  
  if (!postData || postData.length === 0) {
    return (
      <div className="skeleton-container container pt--80 pb--80">
        <div className="skeleton-feature">
          {colorMode === "dark" ? (
            <Skeleton height={425} baseColor="#2a2a2a" highlightColor="#3e3e3e" borderRadius={8} />
          ) : (
            <Skeleton height={425} borderRadius={8} />
          )}
        </div>

        <div className="skeleton-other">
          {colorMode === "dark" ? (
            <>
              <Skeleton height={200} baseColor="#2a2a2a" highlightColor="#3e3e3e" borderRadius={8} />
              <Skeleton height={200} baseColor="#2a2a2a" highlightColor="#3e3e3e" borderRadius={8} />
              <Skeleton height={200} baseColor="#2a2a2a" highlightColor="#3e3e3e" borderRadius={8} />
              <Skeleton height={200} baseColor="#2a2a2a" highlightColor="#3e3e3e" borderRadius={8} />
            </>
          ) : (
            <>
              <Skeleton height={200} borderRadius={8} />
              <Skeleton height={200} borderRadius={8} />
              <Skeleton height={200} borderRadius={8} />
              <Skeleton height={200} borderRadius={8} />
            </>
          )}
        </div>
      </div>
    );
  }

  const firstPost = postData[0];

  return (
    <div className="slider-area bg-color-grey pt--80 pb--80">
      <div className="axil-slide slider-style-2 container">
        <div className="row row--10">
          <h1 className="section-title mb--20">Latest News</h1>
          <div className="col-lg-12 col-xl-6 col-md-12 col-12 mt--20">
            <div className="content-block post-grid post-grid-transparent post-overlay-bottom">
              {firstPost.feature_img && (
                <div className="post-thumbnail">
                  <Link href={`/post/${firstPost.id}`}>
                    <a>
                      <Image
                        src={`${apiUrl}${firstPost.feature_img.url}`}
                        alt={firstPost.title}
                        height={467}
                        width={615}
                        priority={true}
                      />
                    </a>
                  </Link>
                </div>
              )}
              <div className="post-grid-content">
                <div className="post-content">
                  <div className="post-cat">
                    <div className="post-cat-list">
                      <Link href={`/category/${slugify(firstPost.cate)}`}>
                        <a className="hover-flip-item-wrapper">
                          <span className="hover-flip-item">
                            <span data-text={firstPost.cate}>
                              {firstPost.cate}
                            </span>
                          </span>
                        </a>
                      </Link>
                    </div>
                  </div>
                  <h3 className="title">
                    <Link href={`/post/${firstPost.id}`}>
                      <a>{firstPost.title}</a>
                    </Link>
                  </h3>
                  <ul className="post-meta-list mt--0">
                    <li style={{ color: 'white' }}>{firstPost.date}</li>
                    <li style={{ color: 'white' }}>{firstPost.post_views} Views</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-xl-6 col-md-12 col-12 mt_lg--20 mt_md--20 mt_sm--20">
            <div className="row row--10">
              {postData.slice(1, 5).map((data, i) => (
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt--20" key={i}>
                  <div className="content-block post-grid post-grid-transparent post-grid-small post-overlay-bottom">
                    {data.feature_img && (
                      <div className="post-thumbnail">
                        <Link href={`/post/${data.id}`}>
                          <a>
                            <Image
                              src={`${apiUrl}${data.feature_img.url}`}
                              alt={data.title}
                              height={225}
                              width={300}
                              priority={true}
                            />
                          </a>
                        </Link>
                      </div>
                    )}
                    <div className="post-grid-content">
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
                          <Link href={`/post/${data.id}`}>
                            <a>{data.title}</a>
                          </Link>
                        </h5>
                        <ul className="post-meta-list mt--0">
                          <li style={{ color: 'white' }}>{data.date}</li>
                          <li style={{ color: 'white' }}>{data.post_views} Views</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSectionTwelve;
