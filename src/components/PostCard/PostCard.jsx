import React, { useState } from "react";
import {
  Card, CardHeader, CardBody, CardFooter, Divider,
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button
} from "@nextui-org/react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots, FaPencilAlt, FaTrash } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
import { IoEllipsisVertical } from "react-icons/io5";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import Comment from "../Comment/Comment";
import Commentcreation from "../Commentcreation/Commentcreation";

export default function PostCard({ post, isPostDetails = false }) {
  const { body, image, createdAt, user, topComment, id } = post;
  const { name, photo } = user;
  const { userId: logedUserId } = useContext(AuthContext);
  const userId = user._id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const postImage = "https://heroui.com/favicon.ico";

  if (!image && !body) return null;

  // --- API Functions ---
  function getPostComments() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}/comments`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
    });
  }

  function deletePost() {
    return axios.delete(`https://route-posts.routemisr.com/posts/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
    });
  }

  // --- Queries & Mutations ---
  const { data } = useQuery({
    queryKey: ["getPostComments", id],
    queryFn: getPostComments,
    enabled: isPostDetails
  });

  const { mutate } = useMutation({
    mutationKey: ["deletePost", id],
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
      // لو إحنا في صفحة التفاصيل، نرجع للهوم بعد المسح
      if (isPostDetails) navigate('/');
    },
    onError: () => {
      toast.error("Failed to delete post");
    }
  });

  return (
    <Card className="max-w-125 border-none shadow-[0_10px_40px_rgba(0,0,0,0.05)] rounded-[20px] mb-6 mx-auto bg-white">
      <CardHeader className="flex justify-between items-center gap-3 px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="bg-black rounded-xl p-2.5 flex items-center justify-center w-11 h-11">
            <img
              alt="user"
              src={photo}
              onError={(e) => e.target.src = postImage}
              className="w-5 h-5 invert object-contain"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-md font-bold text-gray-900">{name}</p>
            <p className="text-xs text-default-400">{createdAt}</p>
          </div>
        </div>

        {/* --- Dropdown Action --- */}
        {userId === logedUserId && (
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="light" size="sm" className="text-gray-500">
                <IoEllipsisVertical size={20} className="text-black cursor-pointer" />
              </Button>
            </DropdownTrigger>

            {/* ✅ التعديل هنا: الـ onAction أصبحت داخل الـ Menu وتتعامل مع الـ keys */}
            <DropdownMenu
              aria-label="Post Actions"
              onAction={(key) => {
                if (key === "delete") mutate();
                if (key === "edit") console.log("Edit logic here");
              }}
            >
              <DropdownItem key="edit" startContent={<FaPencilAlt />}>
                Edit Post
              </DropdownItem>
              <DropdownItem
                key="delete"
                className="text-red-500"
                color="danger"
                startContent={<FaTrash />}
              >
                Delete Post
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </CardHeader>

      <Divider className="opacity-40" />

      <CardBody className="px-6 py-5">
        {body?.trim() && <p className="mb-3 text-gray-800">{body}</p>}
        {image && <img src={image} alt="post" className="rounded-xl w-full object-cover" />}
      </CardBody>

      <Divider className="opacity-40" />

      <CardFooter className="px-6 py-4">
        <div className="w-full flex justify-between">
          <div className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors text-sm font-medium">
            <AiOutlineLike className="text-xl" /><span>Like</span>
          </div>
          <div className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors text-sm font-medium">
            <FaRegCommentDots className="text-xl" />
            <RouterLink to={`/postdetails/${id}`}>Comments</RouterLink>
          </div>
          <div className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors text-sm font-medium">
            <PiShareFatLight className="text-xl" /><span>Share</span>
          </div>
        </div>
      </CardFooter>

      <Commentcreation userPhoto={photo} postId={id} queryKey={isPostDetails ? ["getPostComments"] : ["getAllPosts"]} />

      {/* --- Comments Logic --- */}
      {!isPostDetails && topComment && <Comment comment={topComment} />}
      {isPostDetails && data?.data?.comments?.map((c) => <Comment comment={c} key={c._id} />)}
    </Card>
  );
}