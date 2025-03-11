import AddBanner from "../ad-banner/AddBanner";
import SidebarOne from "../sidebar/SidebarOne";
import PostLayoutTwo from "./layout/PostLayoutTwo";
import WidgetAd from "../sidebar/WidgetAd";

const PostSectionSearch = ({ postData, adBanner }) => {
  return (
    <div className="axil-post-list-area pt-0 post-listview-visible-color axil-section-gap bg-color-grey">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-xl-8">
            {adBanner === true ? (
              <AddBanner img="/images/add-banner/banner-01.webp" height="210" width="810" />
            ) : (
              ""
            )}

            {postData.length === 0 ? (
              <p className="mt--20">No results found for your search query.</p> // No results message
            ) : (
              <PostLayoutTwo dataPost={postData} />
            )}
          </div>

          <div className="col-lg-4 col-xl-4 mt_md--40 mt--0 mt_sm--40">
            <div>
              <WidgetAd
                url="https://example.com/"
                image="/images/add-banner/banner-02.webp"
                height={778}
                width={390}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSectionSearch;
