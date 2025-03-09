import Link from "next/link";
import Image from "next/image";
import { slugify } from "../../../utils";

const PostLayoutOne = ({ postData, itemShow }) => {
  const local = "http://localhost:3000";
  const prod = "https://limitless-escarpment-05345-1ca012576c29.herokuapp.com";
  const apiUrl = typeof window !== "undefined" && window.location.hostname === "localhost" ? local : prod;

  return (
    <>
      {postData.slice(0, itemShow).map((data, i) => (
        <div
          className="col-lg-6 col-xl-6 col-md-12 col-12 mt--30"
          key={i}>
          <div className="content-block content-direction-column post-horizontal thumb-border-rounded">
            <div className="post-content">
              <div className="post-cat">
                <div className="post-cat-list">
                  <Link href={`/category/${data.cate}`}>
                    <a className="hover-flip-item-wrapper">
                      <span className="hover-flip-item">
                        <span data-text={data.cate}>{data.cate}</span>
                      </span>
                    </a>
                  </Link>
                </div>
              </div>
              <h4 className="title">
                <Link href={`/post/${data.id}`}>
                  <a>{data.title}</a>
                </Link>
              </h4>
              <div className="post-meta">
                <div className="content">
                  <ul className="post-meta-list">
                    <li>Published: {data.date}</li>
                    <li>{data.post_views} views</li>
                  </ul>
                </div>
              </div>
            </div>
            {data.feature_img ? 
            <div className="post-thumbnail">
              <Link href={`/post/${data.id}`}>
                <a>
                  <Image
                    src={`${apiUrl}${data.feature_img.thumb.url}`}
                    alt={data.title}
                    height={250}
                    width={250}
                    priority={true}
                  />
                </a>
              </Link>
            </div>
            : "" }
          </div>
        </div>
      ))}
    </>
  );
};

export default PostLayoutOne;
