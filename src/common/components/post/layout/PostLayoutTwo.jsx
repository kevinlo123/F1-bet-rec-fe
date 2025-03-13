import Link from "next/link";
import Image from "next/image";
import { slugify } from "../../../utils";
const PostLayoutTwo = ({ dataPost, bgColor }) => { 
  const local = "http://localhost:3000";
  const prod = "https://limitless-escarpment-05345-1ca012576c29.herokuapp.com";
  const apiUrl = typeof window !== "undefined" && window.location.hostname === "localhost" ? local : prod;

  return (
    <>
      {dataPost.map((data, i) => (
        <div
          className={`content-block post-list-view axil-control mt--30 ${bgColor || ""} ${data.sticky === true ? "sticky": ""} ${data.postFormat === 'quote' ? "format-quote" : ""}`}
          key={i}
        >
        {data.feature_img ? 
        <div className="post-thumbnail">
          <Link href={`/post/${data.id}`}>
          <a>
            <Image
            src={`${apiUrl}${data.feature_img.url}`}
            alt={data.title}
            height={250}
            width={295}
            priority={true}
            />
          </a>
          </Link>
          {data.playBtn === true ? 
          <Link href={`/post/${data.slug}`}>
            <a className="video-popup size-medium position-top-center icon-color-secondary"><span className="play-icon"></span></a>
          </Link>
          : ""}
        </div>
        : "" }

          <div className="post-content">
            <div className="post-cat">
              <div className="post-cat-list">
                <Link href={`/category/${slugify(data.cate)}`}>
                  <a className="hover-flip-item-wrapper">
                    <span className="hover-flip-item">
                      <span data-text={data.cate}>{data.cate}</span>
                    </span>
                  </a>
                </Link>
              </div>
            </div>
			{data.postFormat === 'quote' ? 
			<blockquote>
				<h4 className="title">
				<Link href={`/post/${data.id}`}>
					<a>{data.title}</a>
				</Link>
				</h4>
			</blockquote> : 
			<h4 className="title">
              <Link href={`/post/${data.id}`}>
                <a>{data.title}</a>
              </Link>
            </h4>}
            <div className="post-meta-wrapper">
              <div className="post-meta">
                <div className="content">
                  <ul className="post-meta-list">
                    <li>Published: {data.date}</li>
                    <li>{data.read_time}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostLayoutTwo;
