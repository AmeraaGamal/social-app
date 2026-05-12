import React, { useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
    Button, Textarea, Avatar, useDisclosure, Chip
} from "@nextui-org/react";
import { IoImageOutline, IoCloseCircle, IoEarth, IoHappyOutline, IoLocationOutline, IoPeopleOutline, IoClose } from "react-icons/io5";
import { MdOutlineGif } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const MEDIA_ACTIONS = [
    { icon: <IoImageOutline size={18} />, label: "Photo", color: "text-emerald-500" },
    { icon: <MdOutlineGif size={20} />, label: "GIF", color: "text-purple-500" },
    { icon: <IoHappyOutline size={18} />, label: "Feeling", color: "text-yellow-500" },
    { icon: <IoLocationOutline size={18} />, label: "Location", color: "text-rose-500" },
];

export default function PostCreation() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    // 1. References & State
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageVisible, setImageVisible] = useState(false);
    const [content, setContent] = useState("");
    const [postImage, setPostImage] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const queryClient = useQueryClient();

    const userName = React.useMemo(() => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            return user?.name || "User";
        } catch {
            return "User";
        }
    }, []);

    
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPostImage(file);
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setImageVisible(true);
        }
        event.target.value = null;
    };

    const isInvalid = !content.trim() && !postImage;

    const removeImage = () => {
        if (selectedImage) URL.revokeObjectURL(selectedImage); // تنظيف الرابط القديم من الذاكرة
        setSelectedImage(null);
        setPostImage(null);
        setImageVisible(false);
    };

    function prepareData() {
        const formData = new FormData();
      
        formData.append("body", content.trim() || (postImage ? " " : ""));
        if (postImage) {
            formData.append("image", postImage);
        }
        return formData;
    }

    function createPost() {
        return axios.post(`https://route-posts.routemisr.com/posts`, prepareData(), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            }
        });
    }

    const { isPending, mutate } = useMutation({
        mutationFn: createPost,
        onSuccess: (res) => {
 toast.success("post created 👍", {closeOnClick:true, autoClose:2000})
            queryClient.invalidateQueries({ queryKey: ['getAllPosts'] });
            setErrorMsg("");
            onOpenChange(false);
            setContent("");
            setPostImage(null);
            setSelectedImage(null);
            setImageVisible(false); 
            removeImage();
        },
        onError: (err) => {
            toast.error("🛑 Failed to create post .", { closeOnClick: true, autoClose: 2000 })

            setErrorMsg(err.response?.data?.message || "Failed to create post. Please try again.");
        }
    });

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="mb-6 mx-auto max-w-125">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 transition-shadow hover:shadow-md">
                <div className="flex gap-3 items-center">
                    <Avatar
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        size="md"
                        isBordered
                        color="primary"
                        className="ring-2 ring-blue-100 ring-offset-1"
                    />
                    <button
                        onClick={onOpen}
                        className="flex-1 text-left text-sm text-gray-400 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full px-4 h-10 transition-all duration-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        What's on your mind, <span className="font-medium text-gray-500">{userName}</span>?
                    </button>
                </div>

                <div className="flex mt-3 pt-3 border-t border-gray-100 gap-1">
                    {MEDIA_ACTIONS.map(({ icon, label, color }) => (
                        <button
                            key={label}
                            onClick={() => {
                                onOpen();
                                if (label === "Photo") setTimeout(handleImageClick, 100);
                            }}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-semibold hover:bg-gray-50 transition-colors ${color}`}
                        >
                            {icon}
                            <span className="hidden sm:inline text-gray-600">{label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
                backdrop="blur"
                size="lg"
                hideCloseButton
                classNames={{
                    base: "rounded-3xl shadow-2xl border border-gray-100",
                    header: "border-b border-gray-100 py-4 px-6",
                    body: "py-5 px-6",
                    footer: "border-t border-gray-100 py-3 px-6",
                    backdrop: "bg-gray-900/40 backdrop-blur-sm",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex items-center justify-center relative">
                                <span className="text-[17px] font-bold text-gray-900 tracking-tight">
                                    Create Post
                                </span>
                                <button
                                    onClick={onClose}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                                >
                                    <IoClose size={18} />
                                </button>
                            </ModalHeader>

                            <ModalBody>
                                <div className="flex gap-3 items-center">
                                    <Avatar
                                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                        isBordered
                                        color="primary"
                                        size="md"
                                        className="ring-2 ring-blue-100 ring-offset-1"
                                    />
                                    <div className="flex flex-col gap-0.5">
                                        <span className="font-bold text-[15px] text-gray-900 leading-tight">
                                            {userName}
                                        </span>
                                        <Chip
                                            size="sm"
                                            variant="flat"
                                            startContent={<IoEarth className="text-[11px]" />}
                                            classNames={{
                                                base: "bg-blue-50 border border-blue-100 px-1 h-5 cursor-pointer hover:bg-blue-100 transition-colors",
                                                content: "text-[10px] font-semibold text-blue-600 px-0.5",
                                            }}
                                        >
                                            Public
                                        </Chip>
                                    </div>
                                </div>

                                <Textarea
                                    value={content}
                                    onValueChange={setContent}
                                    placeholder={`What's on your mind, ${userName}?`}
                                    variant="flat"
                                    minRows={3}
                                    classNames={{
                                        input: "text-[18px] placeholder:text-gray-300 text-gray-800 leading-relaxed mt-1",
                                        inputWrapper: "bg-transparent hover:bg-transparent focus-within:!bg-transparent shadow-none p-0 min-h-0",
                                    }}
                                />

                                {imageVisible && selectedImage && (
                                    <div className="relative mt-1 rounded-2xl overflow-hidden border border-gray-200 group shadow-sm">
                                        <img
                                            src={selectedImage}
                                            alt="Post preview"
                                            className="w-full h-auto max-h-64 object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                                        <button
                                            onClick={removeImage}
                                            className="absolute top-2.5 right-2.5 bg-black/50 hover:bg-black/70 text-white rounded-full w-7 h-7 flex items-center justify-center transition-all duration-150 shadow-md"
                                        >
                                            <IoCloseCircle size={18} />
                                        </button>
                                    </div>
                                )}

                                <div className="flex items-center justify-between mt-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm">
                                    <span className="text-[12px] font-semibold text-gray-500 tracking-wide uppercase">
                                        Add to your post
                                    </span>
                                    <div className="flex items-center gap-0.5">
                                        {MEDIA_ACTIONS.map(({ icon, label, color }) => (
                                            <button
                                                key={label}
                                                title={label}
                                                onClick={label === "Photo" ? handleImageClick : undefined}
                                                className={`w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all ${color}`}
                                            >
                                                {icon}
                                            </button>
                                        ))}
                                        <button
                                            title="Tag People"
                                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all text-blue-500"
                                        >
                                            <IoPeopleOutline size={18} />
                                        </button>
                                    </div>
                                </div>
                                {errorMsg && (
                                    <p className="text-rose-500 text-[12px] font-medium mt-1 bg-rose-50 p-2 rounded-lg border border-rose-100 text-center">
                                        {errorMsg}
                                    </p>
                                )}
                            </ModalBody>

                            <ModalFooter className="flex gap-2">
                                <Button
                                    variant="flat"
                                    size="sm"
                                    onPress={onClose}
                                    className="h-9 px-5 rounded-xl text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    isLoading={isPending}
                                    isDisabled={isInvalid}
                                    className="flex-1 h-9 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-100 hover:shadow-blue-200 transition-shadow disabled:opacity-50 disabled:grayscale"
                                    onPress={() => mutate()}
                                >
                                    {isPending ? "Posting..." : "Post"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}