import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Post from "./Post.js";

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export default function Posts() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(BASE_API_URL + '/api/feed');
      if (response.ok) {
        const results = await response.json();
        setPosts(results.data);
      } else {
        setPosts(null);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      {
        posts === undefined ?
          <Spinner animation="border" />
          :
          <>
            {posts.length === 0 ?
              <p>There are no blog posts.</p>
              :
              posts.map(post => <Post key={post.id} post={post} />)
            }
          </>
      }
    </>
  );
}