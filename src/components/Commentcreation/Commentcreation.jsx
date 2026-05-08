import React from "react";
import { Input, Button, Avatar } from "@nextui-org/react"; 
import { IoSend , IoImageOutline} from "react-icons/io5";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LuLoaderCircle } from "react-icons/lu";


export default function CommentCreation({ userPhoto ,postId ,queryKey }) {

     const form = useForm({
        defaultValues:{
 body:"",
            image:""
        }
           
        })
const query =useQueryClient();



        const {register , handleSubmit , watch , formState: {errors}} = form;

         const createdComment = {
            content:"",
            image:""
        }
        
   async function commentCreation (data) {

       
       return await axios.post(`https://route-posts.routemisr.com/posts/${postId}/comments`,
        data,
        {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        }
    )
    }

const{  data , isPending, error ,isError, mutate} = useMutation({
  mutationFn:commentCreation,
 onSuccess: () => {
query.invalidateQueries({queryKey:queryKey});
      form.reset();
    },
  onError:(err)=>{
console.log("Error Details:", err.response?.data);  },
  
})


function handleCreateComment(value){ 

        const formData = new FormData()
if(!value.body && !value.image) return


if(value.body){
        formData.append("content" , value.body)   

}    
if(value.image){
    formData.append("image" , value.image[0]) 
}
    console.log(value.body);
    console.log(value.image)
   mutate(formData); 
}

  return (
    <form className="w-full px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex gap-3 items-center"
    onSubmit={handleSubmit(handleCreateComment)}>
      <Avatar 
        src={userPhoto} 
        size="sm" 
        className="flex-shrink-0"
        isBordered
        color="primary"
      />
      
      <Input
      {...register('body')}
        variant="bordered"
        placeholder="Write a comment..."
        radius="full"
        className="bg-white"
        classNames={{
          inputWrapper: "border-gray-200 hover:border-blue-400 focus-within:!border-blue-500 transition-all",
          input: "text-sm",
        }}
        endContent={
        <div className="flex items-center gap-2">
                                {/* زر رفع الصورة المخفي */}
                                <label htmlFor="comment-image" className="cursor-pointer text-gray-400 hover:text-blue-500 transition-colors">
                                    <IoImageOutline className="text-xl" />
                                    <input 
                                        type="file" 
                                        id="comment-image"
                                        accept="image/*"
                                        className="hidden" 
                                        {...register("image")}
                                    />
                                </label>

                                <Button 
                                disabled={isPending}
                                    type="submit" 
                                   
                                    isIconOnly 
                                    size="sm" 
                                    radius="full"
                                    color="primary" 
                                    variant="solid"
                                    className="shadow-lg shadow-blue-500/30 disabled:bg-slate-50 disabled:cursor-not-allowed"
                                >
{isPending? <LuLoaderCircle className="animate-spin" />:<IoSend className="text-white text-lg" />
}                                    
                                </Button>
                            </div>
                        }
      />
    </form>
  );
}