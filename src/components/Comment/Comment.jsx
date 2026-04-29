import React from 'react';
import {CardFooter} from "@nextui-org/react";

export default function Comment({comment}) {
    const postImage = "https://heroui.com/favicon.ico"

  return<CardFooter className="px-6 py-4 flex gap-3">
           <div className="bg-black rounded-xl p-2.5 flex items-center justify-center w-11 h-11 shrink-0">
                 <img
                  alt="comment creator"
                  radius="none"
                  src= {comment.commentCreator?.photo}
                  onError ={(e)=> e.target.src = postImage}
                  className="w-5 h-5 invert object-contain"
                />
            </div>
            <div className="bg-gray-100 rounded-lg p-3 w-full">
              <p className="font-bold text-sm text-gray-900">{comment.commentCreator?.name}</p>
              <p className="text-sm text-gray-700">{comment.content}</p>
            </div>
         </CardFooter>
}