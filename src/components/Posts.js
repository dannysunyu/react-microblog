import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Post from "./Post.js";
import { useApi } from "../contexts/ApiProvider";

export default function Posts() {
  const [posts, setPosts] = useState();
  const api = useApi();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await api.get('/feed');
      if (response.ok) {
        setPosts(response.body.data);
      } else {
        setPosts(null);
      }
    };

    fetchPosts();
  }, [api]);

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