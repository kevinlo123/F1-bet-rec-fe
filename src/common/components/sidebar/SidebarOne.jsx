import WidgetCategory from "./WidgetCategory";
import WidgetInstagramPost from "./WidgetInstagramPost";
import WidgetPostList from "./WidgetPostList";
import WidgetSearch from "./WidgetSearch";
import WidgetSocialShare from "./WidgetSocialShare";
// import TwitterFeed from '../TwitterFeed/TwitterFeed';
import WidgetAd from "./WidgetAd";

const SidebarOne = ({dataPost}) => {
  return (
    <div className="sidebar-inner">
      <WidgetPostList postData={dataPost}/>
      <WidgetSocialShare />
      <div style={{marginTop: '3.5rem'}}>
        <WidgetAd
          url="https://example.com/"
          image="/images/add-banner/banner-02.webp"
          height={778}
          width={390}
        />
      </div>
    </div>
  );
};

export default SidebarOne;
