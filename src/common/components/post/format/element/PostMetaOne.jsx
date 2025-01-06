import Image from 'next/image';
import Link from "next/link";
import {slugify} from '../../../../utils';

const PostMetaOne = ({metaData}) => {
  const local = 'http://localhost:3000';
  const prod = 'https://limitless-escarpment-05345-1ca012576c29.herokuapp.com/';
  const apiUrl = window.location.hostname === 'localhost' ? local : prod;

    return (
      <div className="banner banner-single-post post-formate post-standard alignwide">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* Start Single Slide  */}
              <div className="content-block">
                {/* Start Post Thumbnail  */}
                <div className="post-thumbnail">
                <Image
                    src={`${apiUrl}${metaData.feature_img.url}`}
                    alt={metaData.title}
                    height={720}
                    width={1440}
                  />
                </div>
                {/* End Post Thumbnail  */}
                {/* Start Post Content  */}
                <div className="post-content">
                  <div className="post-cat">
                    <div className="post-cat-list">
                        <Link href={`/category/${slugify(metaData.cate)}`}>
                            <a className="hover-flip-item-wrapper">
                                <span className="hover-flip-item">
                                <span data-text={metaData.cate}>{metaData.cate}</span>
                                </span>
                            </a>
                        </Link>
                    </div>
                  </div>
                  <h1 className="title">{metaData.title}</h1>
                  {/* Post Meta  */}
                  <div className="post-meta-wrapper">
                    <div className="post-meta">
                      <div className="content">
                        <h6 className="post-author-name">
                            <span>5 min. read</span>
                        </h6>
                        <ul className="post-meta-list">
                          <li>Published: {metaData.date}</li>
                          <li>{metaData.post_views} Views</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Post Content  */}
              </div>
              {/* End Single Slide  */}
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default PostMetaOne;