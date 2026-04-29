import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PostCard from '../PostCard/PostCard'
import Loader from '../Loader/Loader'

export default function Home() {

  const [allPosts, setAllPosts] = useState(null)
  const [isLoading, setIsLoading]  = useState(true)
  const [isError, setIsError] = useState(false)

  function getAllPosts(){
    axios.get( `http://localhost:5000/posts` ,{
      params:{sort: "createdAt"},
      headers: {
        Authorization : `Bearer ${localStorage.getItem("userToken")}`
      }
    }).then((res) => {
      console.log(res.data);
       setAllPosts(res.data.posts)
    }).catch((error) => {
      console.log(error);
      setIsError(true)
     
    }).finally(() => {
  setIsLoading(false);
});
  }
  useEffect(()=>{
    getAllPosts()
  },[])

  if(isLoading){
return <Loader/>  }
  if(isError){
    return <h1>Error...</h1>
  }
  return (
    <>
    {allPosts?.map((post)=> <div key ={post._id}><PostCard post={post}/> </div>)}
    </>
      
  )
}
