import Image from 'next/image';
import Link from 'next/link';
import { SectionTitleOne } from '../common/elements/sectionTitle/SectionTitle';
import FooterOne from "../common/elements/footer/FooterOne";
import HeaderFour from "../common/elements/header/HeaderFour";
import { getAllPosts } from '../../lib/api';
import HeadTitle from "../common/elements/head/HeadTitle";
import driverData from '../data/drivers/driverStandings.json'
import Nav from "react-bootstrap/Nav";
import PostComment from "../common/components/post/format/element/PostComment";
import CategoryList from '../common/components/category/CategoryList';
import PostSectionOne from '../common/components/post/PostSectionOne';
import React, { useState, useEffect } from 'react';

const DriverStandings = ({allPosts}) => {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        const fetchPostsData = async () => {
        try {
            const local = 'http://localhost:3000/api/v1';
            const prod = 'https://limitless-escarpment-05345-1ca012576c29.herokuapp.com/api/v1';
            const apiUrl = window.location.hostname === 'localhost' ? local : prod;
    
            const response = await fetch(`${apiUrl}/posts`);        
            
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
    
            const postsData = await response.json(); 
            setPosts(postsData);  
        } catch (error) {
            console.error('Error loading posts:', error);
        }
        };
    
        fetchPostsData();
    }, []);

    return (
        <>
            <HeadTitle pageTitle="Driver Standings" />
            <HeaderFour postData={allPosts} pClass="header-light header-sticky header-with-shadow" />
            <div className="bg-color-grey driver-standings-wrapper axil-section-gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner">
                                <h1 className="section-title mb--20">2024 Formula 1 Driver Standings</h1>
                            </div>
                            <Nav className="axil-tab-button nav nav-tabs mt--20">
                                <Nav.Item>
                                    <Nav.Link className="active" href="/driver-standings">
                                        Driver Standings
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link  href="/constructor-standings">
                                        Constructor Standings
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                    </div>

                    <div className="col-lg-12 driver-standings-container mt--20">
                        {driverData.standings.map((data) => ( 
                            <div className="inner driver-container" key={data.position}>
                                <div className="driver-teamColor" style={{backgroundColor: `${data.teamColor}`}}></div>
                                <span className="driver-position">P{data.position}</span>
                                <span className="driver">{data.driver}</span>
                                <span>{data.nationality}</span>
                                {data.flag ? (
                                    <span dangerouslySetInnerHTML={{ __html: data.flag }} />   
                                ): "" }
                                <span>{data.team}</span>
                                <span>{data.points}pts</span>                                
                            </div>
                        ))}
                    </div>
                    <div className='mt--80'>
                        <PostComment />
                    </div>
                    <PostSectionOne postData={posts}/>
                    <CategoryList />
                </div>
            </div>
            <FooterOne />
        </>
    );
}

export default DriverStandings;


export async function getStaticProps() {
    const allPosts = getAllPosts([
        'title',
        'featureImg',
        'slug',
        'cate',
    ])
  
    return {
        props: { allPosts }
    }
}