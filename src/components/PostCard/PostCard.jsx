import React ,{useState}from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai"; 
import { FaRegCommentDots } from "react-icons/fa"; 
import { PiShareFatLight } from "react-icons/pi";  
import Comment from "../Comment/Comment";
import { Link as RouterLink } from 'react-router-dom';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Commentcreation from "../Commentcreation/Commentcreation";

export default function PostCard({post , isPostDetails=false}) {
  const [isLiked, setIsLiked] = useState(false);

    const {body, image , comments , createdAt, user, topComment , id} = post;
    const {name,photo} = user
    const myTopComment = topComment;
    const postImage = "https://heroui.com/favicon.ico"

    if(!image && !body) return

    function getPostComments(){
      return axios.get(`https://route-posts.routemisr.com/posts/${id}/comments`,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("userToken")}`
        }
      })
    }

    const {data, isLoading, isError , error} = useQuery({
      queryKey: ["getPostComments",id],
      queryFn: getPostComments,
      enabled: isPostDetails
    })
    //console.log( "my comment :",data?.data.data.comments)
  return (
    <Card className="max-w-125 border-none shadow-[0_10px_40px_rgba(0,0,0,0.05)] rounded-[20px] mb-6 mx-auto bg-white">
      
      <CardHeader className="flex gap-3 px-6 py-4">
        <div className="bg-black rounded-xl p-2.5 flex items-center justify-center w-11 h-11">
             <img
              alt="logo"
              radius="none"
              src= {photo} 
              onError ={(e)=> e.target.src = postImage}
              className="w-5 h-5 invert object-contain" 
            />
        </div>
        <div className="flex flex-col">
          <p className="text-md font-bold text-gray-900">{name}</p>
          <p className="text-xs text-default-400">{createdAt}</p>
        </div>
      </CardHeader>
      
      <Divider className="opacity-40"/>

      <CardBody className="px-6 py-5">
        {body?.trim() && <p className="mb-3 text-gray-800">{body}</p>}
        {image && <img src={image} alt={body || "post image"} className="rounded-xl w-full object-cover"/>}
      </CardBody>
       
      <Divider className="opacity-40"/>
      <CardFooter className="px-6 py-4">
       <div className=" w-full flex justify-between">
        <div className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors text-sm font-medium"><AiOutlineLike className="text-xl" /><span>Like</span></div>
        <div className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors text-sm font-medium"><FaRegCommentDots className="text-xl" /><RouterLink to={`/postdetails/${id}`}>Comments</RouterLink></div>
        <div className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors text-sm font-medium"><PiShareFatLight className="text-xl" /><span> share</span></div>
       </div>
      </CardFooter>
      <Commentcreation userPhoto={user?.photo} postId={id} queryKey={isPostDetails ?["getPostComments"]: ["getAllPosts"]}/>

       {isPostDetails===false &&myTopComment && (
         <Comment comment={myTopComment}/>
       )}
       {isPostDetails && data?.data?.comments?.map((currentComment) => (
        <Comment comment={currentComment} key={currentComment._id}/>
       ))}
       {isPostDetails && !data?.data?.comments && data?.data?.data?.comments?.map((currentComment) => (
        <Comment comment={currentComment} key={currentComment._id}/>
       ))}
    </Card>
  );
}