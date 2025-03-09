import SocialData from '../../../data/social/SocialData.json';

const WidgetSocialShare = () => {

  return (
    <div className="axil-single-widget widget widget_social mb--30">
      <h5 className="widget-title">Stay In Touch</h5>
      <ul className="social-icon md-size justify-content-start">
        <li>
          <a href={'https://x.com/F1PressNews_'}>
            <i className={SocialData.twitter.icon} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default WidgetSocialShare;
