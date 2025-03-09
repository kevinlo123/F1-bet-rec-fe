import { useEffect } from "react";
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

const TwitterFeed = () => {
  // useEffect(() => {
  //   const scriptId = "twitter-wjs";
  //   const existingScript = document.getElementById(scriptId);

  //   if (!existingScript) {
  //     const script = document.createElement("script");
  //     script.id = scriptId;
  //     script.src = "https://platform.twitter.com/widgets.js";
  //     script.async = true;
  //     document.body.appendChild(script);

  //     script.onload = () => {
  //       if (window.twttr) {
  //         window.twttr.widgets.load();
  //       }
  //     };
  //   } else {
  //     // If script already exists, force reload the Twitter widget
  //     window.twttr?.widgets?.load();
  //   }
  // }, []);

  return (
    <div>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="F1PressNews_"
        options={{height: 400}}
      />
    </div>
  );
};

export default TwitterFeed;
