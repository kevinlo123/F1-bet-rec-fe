import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { SectionTitleOne } from "../../elements/sectionTitle/SectionTitle";
import { HoverActiveClass, slugify } from "../../utils";
import trophy from '../../../../public/images/others/trophy.svg';
import { useEffect } from "react";

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

	useEffect(() => {
		const hash = window.location.hash;
		if (hash) {
		  setTimeout(() => {
			const element = document.getElementById(`${hash}`);
			if (element) {
			  element.scrollIntoView({ behavior: 'smooth' });
			}
		  }, 1000);
		}
	  }, []);

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
		<div className="axil-trending-post-area axil-section-gap bg-color-grey">
			<div className="container">
				<h1 className="section-title">2024 Formula 1 Calendar</h1>
				<div className="row">
					<div className="col-lg-12 mb--25">
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
												<div className="col-12" key={index} id={`#${data.ref}`}>
													<div
														id={`${data.raceName}`}
														className={`content-block trend-post post-order-list ${hoveredIndex === index ? "is-active" : "axil-control"}`}
														onMouseEnter={() => setHoveredIndex(index)}
														onMouseLeave={() => setHoveredIndex(null)}
													>
														<div className="post-inner">
															<span className="post-order-list">R{data.round}</span>
															<div className="post-content" style={{ flexGrow: '1' }}>
																<div className="post-cat">
																	<p className="category">
																		{data.cate}
																	</p>
																</div>
																<div className="trophy-content">
																	<h3 className="title">
																		<span>{data.raceName}</span>
																	</h3>
																	{
																		data.winner ? 
																		<div className="trophy-wrapper">
																			<div className="img-wrapper">
																				<Image
																					src={trophy}
																					alt={'trophy'}
																					height={20}
																					width={20}
																					priority={true}
																				/>
																			</div>
																			<span>{data.winner}</span> 
																		</div>
																		:
																		<Link href="/predictions">
																			<a className="axil-button button-rounded hover-flip-item-wrapper">
																				<span className="hover-flip-item">
																					<span data-text="Make a Prediction">Make a Prediction</span>
																				</span>
																			</a>
																		</Link>  
																	}
																</div>
																<div className="post-meta-wrapper">
																	<div className="post-meta">
																		<div className="content">
																			<p className="post-author-name">
																				<span data-text={data.location}>
																					{data.location}
																				</span>
																			</p>
																			<ul className="post-meta-list">
																				<li>Date: {data.date}</li>
																				<li>Record: {data.lapRecord}</li>
																			</ul>
																			{data.highlights ? (
																				<a target="_blank" href={data.highlights}>
																					<span className="hover-flip-item-wrapper">
																						<span className="hover-flip-item">
																							<span data-text={'View the highlights'}>
																								View the highlights
																							</span>
																						</span>
																					</span>
																				</a>
																			) : 
																				<p style={{marginTop: '7.5px', marginBottom: '15px'}}>Upcoming</p>
																			}
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
																<>
																	<Image
																		src={data.featureImg}
																		alt={data.raceName}
																		height={410}
																		width={510}
																		priority={true}
																	/>
																</>
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
