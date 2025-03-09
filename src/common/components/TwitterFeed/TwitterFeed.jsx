import { useEffect } from "react";

const TwitterFeed = () => {
  useEffect(() => {
    if (!window.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      window.twttr.widgets.load();
    }
  }, []);

  return (
    <div>
      <a
        className="twitter-timeline"
        href="https://twitter.com/F1PressNews_"
        data-theme="dark"
        data-height="500"
      >
        Tweets by F1PressNews
      </a>
    </div>
  );
};

export default TwitterFeed;
