import Link from "next/link";
import Image from "next/image";

const WidgetPostList = ({ postData }) => {
  const local = "http://localhost:3000";
  const prod = "https://limitless-escarpment-05345-1ca012576c29.herokuapp.com";
  const apiUrl = typeof window !== "undefined" && window.location.hostname === "localhost" ? local : prod;

  return (
    <div className="axil-single-widget widget widget_postlist mb--30">
      <h5 className="widget-title">Popular on F1PressNews</h5>
      <div className="post-medium-block">
        {postData.slice(3, 6).map((data, i) => (
          <div className="content-block post-medium mb--20" key={i}>
			  {data.feature_img ? 
            <div className="post-thumbnail">
              <Link href={`/post/${data.id}`}>
                <a>
                  <Image
                    src={`${apiUrl}${data.feature_img.thumb.url}`}
                    alt={data.title}
                    height={100}
                    width={100}
                    priority={true}
                  />
                </a>
              </Link>
            </div>
			:""}
            <div className="post-content">
              <h6 className="title">
                <Link href={`/post/${data.id}`}>
                  <a>{data.title}</a>
                </Link>
              </h6>
              <div className="post-meta">
                <ul className="post-meta-list">
                  <li>Published: {data.date}</li>
                  <li>{data.post_views} Views</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WidgetPostList;
