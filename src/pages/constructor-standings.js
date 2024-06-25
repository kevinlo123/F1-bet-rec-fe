import Image from 'next/image';
import Link from 'next/link';
import FooterOne from "../common/elements/footer/FooterOne";
import HeaderFour from "../common/elements/header/HeaderFour";
import { getAllPosts } from '../../lib/api';
import HeadTitle from "../common/elements/head/HeadTitle";

const ConstructorStandings = ({allPosts}) => {
    return (
        <>
            <HeadTitle pageTitle="Constructor Standings" />
            <HeaderFour postData={allPosts} pClass="header-light header-sticky header-with-shadow" />
            <div className="bg-color-grey">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner">
                                Constructor standings
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FooterOne />
        </>
    );
}

export default ConstructorStandings;


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