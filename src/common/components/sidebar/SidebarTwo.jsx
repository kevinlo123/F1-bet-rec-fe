import WidgetAd from "./WidgetAd";
import WidgetCategory from "./WidgetCategory";
import WidgetInstagramPost from "./WidgetInstagramPost";
import WidgetNewsletter from "./WidgetNewsletter";
import WidgetPostList from "./WidgetPostList";
import WidgetSocialShare from "./WidgetSocialShare";

const SidebarTwo = ({ dataPost, tagData }) => {
  return (
    <div className="sidebar-inner">
      <WidgetCategory catData={dataPost} />
      <WidgetPostList postData={dataPost} />
      <WidgetAd
        url="https://example.com/"
        image="/images/post-single/ads-01.webp"
        height={236}
        width={390}
      />
      <WidgetSocialShare />
      <WidgetAd
        url="https://example.com/"
        image="/images/add-banner/banner-02.webp"
        height={778}
        width={390}
      />
    </div>
  );
};

export default SidebarTwo;
