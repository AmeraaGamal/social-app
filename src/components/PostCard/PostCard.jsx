import React ,{useState}from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai"; // أيقونة اللايك (فارغة ومملوءة)
import { FaRegCommentDots } from "react-icons/fa"; // أيقونة الكومنت
import { PiShareFatLight } from "react-icons/pi";  
import Comment from "../Comment/Comment";

export default function PostCard({post}) {
  const [isLiked, setIsLiked] = useState(false);

    const {body, image , comments , createdAt, user } = post;
    const {name,photo} = user
    const comment = comments?.[0];
    const postImage = "https://heroui.com/favicon.ico"
    if(!image && !body) return
  return (
    <Card className="max-w-125 border-none shadow-[0_10px_40px_rgba(0,0,0,0.05)] rounded-[20px] mb-6 mx-auto bg-white">
      
      <CardHeader className="flex gap-3 px-6 py-4">
        <div className="bg-black rounded-xl p-2.5 flex items-center justify-center w-11 h-11">
             <img
              alt="logo"
              radius="none"
              src= {photo} // شعار HeroUI أو أي لوجو
              onError ={(e)=> e.target.src = postImage}
              className="w-5 h-5 invert object-contain" // object-contain عشان ميبقاش ممطوط
            />
        </div>
        <div className="flex flex-col">
          <p className="text-md font-bold text-gray-900">{name}</p>
          <p className="text-xs text-default-400">{createdAt}</p>
        </div>
      </CardHeader>
      
      {/* خليت الـ Divider شفاف شوية عشان يبقى ناعم زي الصورة */}
      <Divider className="opacity-40"/>

      {/* 2. محتوى البوست (Body) - px-6 */}
      <CardBody className="px-6 py-5">
        {body && <p>{body}</p>}
        {image && <img src={image} alt={body}/>}
      </CardBody>
      
      <Divider className="opacity-40"/>

      {/* 3. أسفل الكارد (Footer) - px-6 */}
      <CardFooter className="px-6 py-4">
       <div className=" w-full flex justify-between">
        <div className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors text-sm font-medium"><AiOutlineLike className="text-xl" /><span>Like</span></div>
        <div className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors text-sm font-medium"><FaRegCommentDots className="text-xl" /><span>Comments</span></div>
        <div className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors text-sm font-medium"><PiShareFatLight className="text-xl" /><span> share</span></div>
       </div>
      </CardFooter>
       {comment && (
         <Comment comment={comment}/>
       )}
    </Card>
  );
}