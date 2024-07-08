import Link from "next/link";
import Image from "next/image";
import { slugify } from "../../utils";
import { SectionTitleOne } from "../../elements/sectionTitle/SectionTitle";
import AddBanner from "../ad-banner/AddBanner";
import Modal from 'react-bootstrap/Modal';
import React from "react";
import Button from 'react-bootstrap/Button'

const videos = [
  {
    "title": "British Grand Prix Highlights",
    "src": "https://www.youtube.com/embed/yPvoKz6tyJs?si=R7NNbOm2UGGEB-Ku"
  },
  {
    "title": "Austrian Grand Prix Highlights",
    "src": "https://www.youtube.com/embed/b0yb1zH2m7c?si=oErK8_Ew-AcfYgVU"
  },
  {
    "title": "Spanish Grand Prix Highlights",
    "src": "https://www.youtube.com/embed/ojUQLuSqV4s?si=dqv54z9rTfEZPpcR"
  },
  {
    "title": "Canadian Grand Prix Highlights",
    "src": "https://www.youtube.com/embed/dLw1ao4-Akk?si=6zSBabs-qrEscmeX"
  },
  {
    "title": "Monaco Grand Prix Highlights",
    "src": "https://www.youtube.com/embed/aeCI0ObFY8M?si=6XGhiC7qSjL1CChu"
  }
]

function MyVerticallyCenteredModal({ videoData, ...props }) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {videoData.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <iframe width="100%" height="315" src={videoData.src} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const PostSectionThree = ({ postData, adBanner, bgColor, heading }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedVideo, setSelectedVideo] = React.useState(null);

  const firstPost = postData[0];

  const handleModalShow = (video) => {
    setSelectedVideo(video);
    setModalShow(true);
  };

  return (
    <div className={`axil-video-post-area axil-section-gap ${bgColor || "bg-color-black"}`}>
      <div className="container">
        {adBanner === true ?  
        <div className="row">
          <div className="col-lg-12">
            <AddBanner
              img="/images/add-banner/banner-03.webp"
              pClass="mb--30"
            />
          </div>
        </div> : ""}
        {heading ? <SectionTitleOne title={heading} /> : ""}
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-md-6 col-12">
            <div className="content-block post-default image-rounded mt--30">
              {firstPost.featureImg ? 
                <div className="post-thumbnail">
                  <div onClick={() => handleModalShow(videos[0])}>
                    <a>
                      <Image
                        src={firstPost.featureImg}
                        alt={firstPost.title}
                        height={500}
                        width={600}
                        priority={true}
                      />
                    </a>
                    <a className="video-popup position-top-center">
                      <span className="play-icon" />
                    </a>
                  </div>
                </div>:""}
              <div className="post-content">
                <div className="post-cat">
                  <div className="post-cat-list">
                    <a className="hover-flip-item-wrapper">
                      <span className="hover-flip-item">
                        <span data-text={firstPost.cate}>
                          {firstPost.cate}
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
                <h3 className="title">
                  <a>{firstPost.title}</a>
                </h3>
                <div className="post-meta-wrapper">
                  <div className="post-meta">
                    <div className="content">
                      <h6 className="post-author-name">
                        <a className="hover-flip-item-wrapper">
                          <span className="hover-flip-item">
                            <span data-text={firstPost.author_name}>
                              {firstPost.author_name}
                            </span>
                          </span>
                        </a>
                      </h6>
                      <ul className="post-meta-list">
                        <li>{firstPost.date}</li>
                        <li>{firstPost.read_time}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-md-6 col-12">
            <div className="row">
              {postData.slice(1, 5).map((data, i) => (
                <div className="col-lg-6 col-md-6 col-sm-6 col-12" key={i}>
                  <div className="content-block post-default image-rounded mt--30">
                    {data.featureImg ? 
                      <div className="post-thumbnail">
                        <div onClick={() => handleModalShow(videos[i + 1])}>
                          <a>
                            <Image
                              src={data.featureImg}
                              alt={data.title}
                              height={190}
                              width={285}
                              priority={true}
                            />
                          </a>
                          <a className="video-popup size-medium position-top-center">
                            <span className="play-icon" />
                          </a>
                        </div>
                      </div>:""}
                    <div className="post-content">
                      <div className="post-cat">
                        <div className="post-cat-list">
                          <a className="hover-flip-item-wrapper">
                            <span className="hover-flip-item">
                              <span data-text={data.cate}>
                                {data.cate}
                              </span>
                            </span>
                          </a>
                        </div>
                      </div>
                      <h5 className="title">
                        <a>{data.title}</a>
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {selectedVideo && (
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            videoData={selectedVideo}
          />
        )}
      </div>
    </div>
  );
};

export default PostSectionThree;
