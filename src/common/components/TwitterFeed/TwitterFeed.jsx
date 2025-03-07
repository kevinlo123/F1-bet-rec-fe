import { useEffect } from "react";

const TwitterFeed = () => {
  useEffect(() => {
    // Load Twitter Widget Script on Client-Side
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup to avoid duplicate scripts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <a
        className="twitter-timeline"
        href="https://twitter.com/F1PressNews_"
        data-theme="dark" // Optional: "light" or "dark"
        data-height="500" // Adjust height
      >
        Tweets by F1PressNews
      </a>
    </div>
  );
};

export default TwitterFeed;
