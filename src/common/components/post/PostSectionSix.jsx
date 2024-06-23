import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { SectionTitleOne } from "../../elements/sectionTitle/SectionTitle";
import { HoverActiveClass, slugify } from "../../utils";

const filters = [
	{
		id: 1,
		cate: "All Races",
	},
	{
		id: 2,
		cate: "Europe",
	},
	{
		id: 3,
		cate: "Asia",
	},
	{
		id: 4,
		cate: "North America",
	},
	{
		id: 5,
		cate: "South America",
	},
	{
		id: 6,
		cate: "Oceana",
	},
	{
		id: 7,
		cate: "Middle East",
	},
	{
		id: 8,
		cate: "Street Circuits"
	},
	{
		id: 9,
		cate: "Traditional Circuits"
	}
];

const defaultActiveCat = slugify(filters[0].cate);

const PostSectionSix = ({ postData, scheduleData }) => {
	const defaultData = scheduleData.schedule;
	const [activeNav, setActiveNav] = useState(defaultActiveCat);
	const [tabPostData, setTabPostData] = useState(defaultData);
	const [hoveredIndex, setHoveredIndex] = useState(null);

	const handleChange = (e) => {
		if (e.target.textContent === "All Races") {
			let filterText = slugify(e.target.textContent);
			setActiveNav(filterText);
			let tempData = scheduleData.schedule;
			setTabPostData(tempData);
		} else if (e.target.textContent.includes("Circuits")) {
			let filterText = slugify(e.target.textContent);
			setActiveNav(filterText);

			let tempData = [];

			for (let i = 0; i < scheduleData.schedule.length; i++) {
				const element = scheduleData.schedule[i];
				let categories = element["type"];
				if (slugify(categories).includes(filterText)) {
					tempData.push(element);
				}
			}
			setTabPostData(tempData);
		} else {
			let filterText = slugify(e.target.textContent);
			setActiveNav(filterText);

			let tempData = [];

			for (let i = 0; i < scheduleData.schedule.length; i++) {
				const element = scheduleData.schedule[i];
				let categories = element["cate"];
				if (slugify(categories).includes(filterText)) {
					tempData.push(element);
				}
			}
			setTabPostData(tempData);
		}
	};

	return (
		<div className="axil-trending-post-area axil-section-gap bg-color-white">
			<div className="container">
				<SectionTitleOne title="2024 Formula 1 Calendar" />
				<div className="row">
					<div className="col-lg-12 mb--150">
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

							<Tab.Content>
								<Tab.Pane className="row trend-tab-content" eventKey={activeNav}>
									<div className="col-lg-8">
										<div className="row">
											{tabPostData.map((data, index) => (
												<div className="col-12" key={index}>
													<div
														className={`content-block trend-post post-order-list ${hoveredIndex === index ? "is-active" : "axil-control"}`}
														onMouseEnter={() => setHoveredIndex(index)}
														onMouseLeave={() => setHoveredIndex(null)}
													>
														<div className="post-inner">
															<span className="post-order-list">R{data.round}</span>
															<div className="post-content" style={{ flexGrow: '1' }}>
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
																<h3 className="title">
																	<a>{data.raceName}</a>
																</h3>
																<div className="post-meta-wrapper">
																	<div className="post-meta">
																		<div className="content">
																			<h6 className="post-author-name">
																				<a className="hover-flip-item-wrapper">
																					<span className="hover-flip-item">
																						<span data-text={data.location}>
																							{data.location}
																						</span>
																					</span>
																				</a>
																			</h6>
																			<ul className="post-meta-list">
																				<li>{data.date}</li>
																				<li>{data.lapRecord}</li>
																			</ul>
																		</div>
																	</div>
																	{data.flag ? (
																		<ul className="social-share-transparent justify-content-end">
																			<li dangerouslySetInnerHTML={{ __html: data.flag }} />
																		</ul>
																	) : ''}
																</div>
															</div>
														</div>
														{data.featureImg ? (
															<div className="post-thumbnail">
																<a>
																	<Image
																		src={data.featureImg}
																		alt={data.raceName}
																		height={410}
																		width={510}
																		priority={true}
																	/>
																</a>
															</div>
														) : ""}
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

export default PostSectionSix;
