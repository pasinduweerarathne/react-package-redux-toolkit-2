import { formatDistanceToNow, parseISO } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";
import { fetchAllUsers } from "../users/userSlice";
import { selectAllPosts } from "./postSlice";
import ReactionButton from "./ReactionButton";

const PostAuthor = ({ authorId }) => {
  const users = useSelector(fetchAllUsers);
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
  const posts = useSelector(selectAllPosts);

  const orderByDate = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderByDate.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor authorId={post.id} />
        <DateFormatter timestamp={post.date} />
      </p>
      <ReactionButton post={post} />
    </article>
  ));

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default Posts;
