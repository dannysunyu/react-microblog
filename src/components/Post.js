import PropTypes from "prop-types";
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import TimeAgo from "./TimeAgo.js";

function Post({post}) {
  return (
    <Stack direction="horizontal" gap={3} className="Post">
      <Image
        src={`${post.author.avatar_url}&s=48`}
        alt={post.author.username}
        roundedCircle />
      <div>
        <p>
          <Link to={`/user/${post.author.username}`}>
            {post.author.username}
          </Link>
          &nbsp;&mdash;&nbsp;
          <TimeAgo isoDate={post.timestamp} />:
        </p>
        <p>{post.text}</p>
      </div>
    </Stack>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.shape({
      avatar_url: PropTypes.string,
      username: PropTypes.string,
    })
  })
};

export default Post