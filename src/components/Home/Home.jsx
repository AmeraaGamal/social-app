import axios from 'axios';
import React from 'react';
import PostCard from '../PostCard/PostCard';
import Loader from '../Loader/Loader';
import PostCreation from '../PostCreation/PostCreation';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  // const [allPosts, setAllPosts] = useState(null)
  // const [isLoading, setIsLoading]  = useState(true)
  // const [isError, setIsError] = useState(false)

  async function getAllPosts() {
    return await axios.get(`https://route-posts.routemisr.com/posts`, {
      params: { sort: '-createdAt' },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });
  }
  // useEffect(()=>{
  //   getAllPosts()
  // },[])

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['getAllPosts'],
    queryFn: getAllPosts,
  });


  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <h1>Error...</h1>;
  }
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
    <PostCreation/>
      {data?.data?.data?.posts?.map((post) => (
        <div key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </>
  );
}
