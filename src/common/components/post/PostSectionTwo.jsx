import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { SectionTitleOne } from "../../elements/sectionTitle/SectionTitle";
import AddBanner from "../ad-banner/AddBanner";
import Slider from "react-slick";
import { slugify } from "../../utils";

const drivers = [
  {
    id: 1,
    name: "Lewis Hamilton",
    img: "/images/drivers/lewham01.avif",
    team: "Ferrari"
  },
  {
    id: 2,
    name: "Charles Leclerc",
    img: "/images/drivers/chalec01.avif",
    team: "Ferrari"
  },
  {
    id: 3,
    name: "Max Verstappen",
    img: "/images/drivers/maxver01.avif",
    team: "Red Bull"
  },
  {
    id: 4,
    name: "Liam Lawson",
    img: "/images/drivers/lialaw01.avif",
    team: "Red Bull"
  },
  {
    id: 5,
    name: "Lando Norris",
    img: "/images/drivers/lannor01.avif",
    team: "Mclaren"
  },
  {
    id: 6,
    name: "Oscar Piastri",
    img: "/images/drivers/oscpia01.avif",
    team: "Mclaren"
  },
  {
    id: 7,
    name: "Fernando Alonso",
    img: "/images/drivers/feralo01.avif",
    team: "Aston Martin"
  },
  {
    id: 8,
    name: "Lance Stroll",
    img: "/images/drivers/lanstr01.avif",
    team: "Aston Martin"
  }
];

const PostSectionTwo = ({ adBanner, headingTitle }) => {

  function SlickNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <button
        className={`${className} slide-arrow next-arrow`}
        style={{ ...style }}
        onClick={onClick}
      >
        <i className="fal fa-arrow-right"></i>
      </button>
    );
  }

  function SlickPrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <button
        className={`${className} slide-arrow prev-arrow`}
        style={{ ...style }}
        onClick={onClick}
      >
        <i className="fal fa-arrow-left"></i>
      </button>
    );
  }

  const slideSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SlickNextArrow />,
    prevArrow: <SlickPrevArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,    
        },
      },
    ],
  };

  return (
    <div className="axil-tab-area axil-section-gap bg-color-white">
      <div className="wrapper">
        <div className="container">
          {adBanner && (
            <div className="row">
              <div className="col-lg-12">
                <AddBanner
                  img="/images/add-banner/banner-03.webp"
                  pClass="mb--30"
                />
              </div>
            </div>
          )}
          <SectionTitleOne title={headingTitle || "Drivers"} />
          <div className="row">
            <div className="col-lg-12">
              <Tab.Container defaultActiveKey="default">
                <Tab.Content>
                  <Tab.Pane eventKey="default" className="single-tab-content">
                    <Slider
                      {...slideSettings}
                      className="modern-post-activation slick-layout-wrapper axil-slick-arrow arrow-between-side"
                    >
                      {drivers.map((data) => (
                        <div className="slick-single-layout" key={data.id}>
                          <div className="content-block modern-post-style text-center content-block-column">
                            <div className="post-content">
                              <div className="post-cat">
                                <div className="post-cat-list">
                                  <span className="hover-flip-item-wrapper">
                                    <span className="hover-flip-item">
                                      <span data-text={data.team}>
                                        {data.team}
                                      </span>
                                    </span>
                                  </span>
                                </div>
                              </div>
                              <h4 className="title">
                                <Link href={`/post/`}>
                                  {data.name}
                                </Link>
                              </h4>
                            </div>
                            {data.img && (
                              <div className="post-thumbnail">
                                <Link href={`/post/`}>
                                  <Image
                                    src={data.img}
                                    alt={data.name}
                                    height={360}
                                    width={390}
                                    priority={true}
                                  />
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSectionTwo;