import BreadcrumbOne from "../common/elements/breadcrumb/breadcrumbOne";
import FooterOne from "../common/elements/footer/FooterOne";
import { getAllPosts } from '../../lib/api';
import WidgetCategory from "../common/components/sidebar/WidgetCategory";
import WidgetSearch from "../common/components/sidebar/WidgetSearch";
import WidgetPostList from "../common/components/sidebar/WidgetPostList";
import WidgetSocialShare from "../common/components/sidebar/WidgetSocialShare";
import FormOne from "../common/components/form/FormOne";
import HeadTitle from "../common/elements/head/HeadTitle";
import HeaderFour from "../common/elements/header/HeaderFour";
import CategoryList from '../common/components/category/CategoryList';

const ContactUs = ({allPosts}) => {
    return ( 
        <>
        <HeadTitle pageTitle="Contact Us" />
        <HeaderFour postData={allPosts} />
        <BreadcrumbOne title= "Contact Us"  />
        <div className="axil-post-list-area axil-section-gap bg-color-white">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-xl-8">
                        {/* Start About Area  */}
                        <div className="axil-about-us">
                            <div className="inner">
                                <h2>Say Hello! </h2>
                                <p>Wherever & whenever you need us. We are here for you – contact us for all your support needs.
                                be it technical, general queries or information support.</p>
                                <p className="primary-color">Email: <a href="mailto:mepress@gmail.com">F1PressNews@gmail.com</a></p>
                            </div>
                            <FormOne />
                        </div>
                        {/* End About Area  */}
                    </div>
                </div>
            </div>
        </div>
        <CategoryList />
        <FooterOne />
        </>
     );
}
 
export default ContactUs;


export async function getStaticProps() {
    const allPosts = getAllPosts([
      'id',
      'title',
      'featureImg',
      'featured',
      'date',
      'slug',
      'cate',
      'cate_img',
      'author_img',
      'author_name',
      'post_views',
    ])
  
    return {
      props: { allPosts }
    }
  }

