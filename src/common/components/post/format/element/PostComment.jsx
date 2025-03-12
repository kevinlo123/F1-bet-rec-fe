import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { slugify } from "../../../../utils";
import { AuthContext } from "../../../../../contexts/AuthContext";

const PostComment = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const local = "http://localhost:3000";
  const prod = "https://limitless-escarpment-05345-1ca012576c29.herokuapp.com";
  const apiUrl = typeof window !== "undefined" && window.location.hostname === "localhost" ? local : prod;
  const { isAuthenticated } = useContext(AuthContext); 
  const [commentContent, setCommentContent] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyingToUsername, setReplyingToUsername] = useState(null);

  const fetchCommentsData = async () => {
    if (!postId) return;

    try {
      const response = await fetch(`${apiUrl}/api/v1/posts/${postId}/comments/`);
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

      const commentsData = await response.json();
      const commentMap = new Map();
    
      commentsData.forEach(comment => commentMap.set(comment.id, { ...comment, replies: [] }));
  
      const structuredComments = [];
  
      commentsData.forEach(comment => {
        if (comment.parent_comment_id) {
          const parent = commentMap.get(comment.parent_comment_id);
          if (parent) {
            parent.replies.push(comment);
          }
        } else {
          structuredComments.push(commentMap.get(comment.id));
        }
      });
  
      setComments(structuredComments);
    } catch (err) {
      console.error("Error loading comments:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommentsData();
  }, [postId]);

  const handleCommentChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!commentContent) return;

    const commentData = { 
      content: commentContent, 
      parent_comment_id: replyingTo 
    };

    try {
      const response = await fetch(`${apiUrl}/api/v1/posts/${postId}/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
      const newComment = await response.json();

      setComments((prevComments) => [newComment.comment, ...prevComments]);
      setCommentContent(""); 
      setReplyingTo(null);  
      fetchCommentsData();
      console.log(comments)
    } catch (err) {
      console.error("Error submitting comment:", err);
      setError(err.message);
    }
  };

  const getTeamLogo = (teamName) => {
    if (!teamName) return null;
    const formattedName = teamName.toLowerCase().replace(/\s+/g, "-");
  
    if (formattedName.includes("stake")) {
      return `/images/team-logos/${formattedName}-logo.svg`;
    }
  
    return `/images/team-logos/${formattedName}-logo.png`;
  };

  return (
    <div className="axil-comment-area">
      <div className="axil-total-comment-post">
        {!isAuthenticated ? (
          <div className="add-comment-button cerchio">
            <Link href="/login">
              <a className="axil-button button-rounded">
                <span>Login to Comment</span>
              </a>
            </Link>
          </div>
        ) : (
          <div className="add-comment-button cerchio">
            <Link href="#comment-form">
              <a className="axil-button button-rounded">
                <span>Post a Comment</span>
              </a>
            </Link>
          </div>
        )}
      </div>

      <div className="axil-comment-area">
      <h4 className="title mt--20">
        {comments.reduce((total, comment) => total + 1 + (comment.replies?.length || 0), 0)} comments
      </h4>

        {loading ? (
          <p>Loading comments...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul className="comment-list">
            {comments.map((comment, i) => {
              const teamLogo = getTeamLogo(comment.user?.favorite_f1_team);

              return (
                <li key={i} className="comment">
                  <div className="comment-body">
                    <div className="single-comment">
                      <div className="comment-img">
                        <Image
                          src={comment.user?.profile_picture?.url ? `${apiUrl}/${comment.user.profile_picture.url}` : "/images/others/author.png"}
                          alt={comment.user?.username || "Anonymous"}
                          height={60}
                          width={60}
                        />
                      </div>
                      <div className="comment-inner">
                        <h6 className="commenter">
                          <Link href={`/author/${slugify(comment.user?.username || "Anonymous")}`}>
                            <a className="hover-flip-item-wrapper">
                              <span className="hover-flip-item">
                                <span data-text={comment.user?.username || "Anonymous"}>
                                  {comment.user?.username || "Anonymous"}
                                </span>
                              </span>
                            </a>
                          </Link>
                          {teamLogo ? (
                            <>
                              &nbsp;
                              <Image
                                src={teamLogo}
                                height={20}
                                width={20}
                                priority={true}
                                alt={`${comment.user?.favorite_f1_team} logo`}
                              />
                            </>
                          ): ''}
                        </h6>
                        <div className="comment-meta">
                          <div className="time-spent">{new Date(comment.created_at).toLocaleString()}</div>
                          <div className="reply-edit">
                            <div className="reply">
                              <a className="comment-reply-link hover-flip-item-wrapper" href="#comment-form" onClick={() => {setReplyingTo(comment.id); setReplyingToUsername(comment.user?.username);}}>
                                <span className="hover-flip-item">
                                  <span data-text="Reply">Reply</span>
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="comment-text">
                          <p className="b2">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {comment.replies && comment.replies.length > 0 && (
                    <ul className="children">
                      {comment.replies.map((reply) => {
                      const replyTeamLogo = getTeamLogo(reply.user?.favorite_f1_team); // <--- Place it here

                        return (
                          <li key={reply.id} className="comment">
                            <div className="comment-body">
                              <div className="single-comment">
                                <div className="comment-img">
                                  <Image
                                    src={reply.user?.profile_picture?.url ? `${apiUrl}/${reply.user.profile_picture.url}` : "/images/others/author.png"}
                                    alt={reply.user?.username || "Anonymous"}
                                    height={60}
                                    width={60}
                                  />
                                </div>
                                <div className="comment-inner">
                                  <h6 className="commenter">
                                    <Link href={`/author/${slugify(reply.user?.username || "Anonymous")}`}>
                                      <a className="hover-flip-item-wrapper">
                                        <span className="hover-flip-item">
                                          <span data-text={reply.user?.username || "Anonymous"}>
                                            {reply.user?.username || "Anonymous"}
                                          </span>
                                        </span>
                                      </a>
                                    </Link>
                                    {replyTeamLogo ? (
                                      <>
                                        &nbsp;
                                        <Image
                                          src={replyTeamLogo}
                                          height={20}
                                          width={20}
                                          priority={true}
                                          alt={`${reply.user?.favorite_f1_team} logo`}
                                        />
                                      </>
                                    ): ''}
                                  </h6>
                                  <div className="comment-meta">
                                    <div className="time-spent">{new Date(reply.created_at).toLocaleString()}</div>
                                  </div>
                                  <div className="comment-text">
                                    <p className="b2">{reply.content}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {isAuthenticated && (
        <div className="comment-respond" id="comment-form">
          <h4 className="title">Post a comment</h4>
            {replyingTo && (
              <div className="replying-to-notice">
                <p>Replying to <span style={{color: '#e10600'}}>{replyingToUsername}</span></p>
                <button className="axil-button button-rounded" style={{maxWidth: '175px', marginBottom: '2rem'}}onClick={() => setReplyingTo(null)}>Cancel Reply</button>
              </div>
            )}
            <form onSubmit={handleSubmit}>
            <div className="row row--10">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="message">Leave a Reply</label>
                  <textarea 
                    id="message"
                    name="message"
                    value={commentContent}
                    onChange={handleCommentChange}
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-submit cerchio">
                  <input name="submit" type="submit" id="submit" className="axil-button button-rounded" />
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostComment;
