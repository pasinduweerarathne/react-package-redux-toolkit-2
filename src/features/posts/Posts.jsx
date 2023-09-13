import { formatDistanceToNow, parseISO } from "date-fns";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../users/userSlice";
import {
  fetchPosts,
  getPostsError,
  getPostsStatus,
  selectAllPosts,
} from "./postSlice";
import ReactionButton from "./ReactionButton";
import { useEffect } from "react";

const PostAuthor = ({ authorId }) => {
  const users = useSelector(getAllUsers);
  const author = users.find((user) => user.id === authorId);

  return <span>by {author ? author.name : "Unknown Author"}</span>;
};

const DateFormatter = ({ timestamp }) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

const Posts = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;
  if (postStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <article>
        <h3>{post.title}</h3>
        <p>{post.body.substring(0, 100)}</p>
        <p className="postCredit">
          <PostAuthor authorId={post.userId} />
          <DateFormatter timestamp={post.date} />
        </p>
        <ReactionButton post={post} />
      </article>
    ));
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default Posts;
