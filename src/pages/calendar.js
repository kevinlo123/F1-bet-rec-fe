import FooterOne from "../common/elements/footer/FooterOne";
import HeaderFour from "../common/elements/header/HeaderFour";
import { getAllPosts } from '../../lib/api';
import HeadTitle from "../common/elements/head/HeadTitle";
import PostSectionSix from '../common/components/post/PostSectionSix';
import scheduleData from '../data/schedule/schedule-2024.json'
import CategoryList from "../common/components/category/CategoryList";

const Calendar = ({allPosts}) => {

    return (
        <>
            <HeadTitle pageTitle="F1 schedule" />
            <HeaderFour postData={allPosts} />
            <PostSectionSix postData={allPosts} scheduleData={scheduleData}/>
            <CategoryList />
            <FooterOne />
        </>
    );
}

export default Calendar;


export async function getStaticProps() {
    const allPosts = getAllPosts([
        'id',
        'title',
        'featureImg',
        'postFormat',
        'featured',
        'slidePost',
        'date',
        'slug',
        'cate',
        'pCate',
        'cate_img',
        'author_img',
        'author_name',
        'post_views',
        'read_time',
        'author_social',
    ])
  
        return {
            props: { allPosts }
        }
  }