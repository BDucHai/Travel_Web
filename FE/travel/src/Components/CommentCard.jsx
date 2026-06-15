import React from "react";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Rating from "@mui/material/Rating";
import { PiShootingStarThin } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IoMdCloseCircle } from "react-icons/io";

const CommentCard = ({ comment }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="relative flex flex-col w-full h-[18rem] lg:h-[21rem] border-[1px] border-[#3b97897d] rounded-[0.2rem] bg-white">
                <div className="flex-1 px-[1rem] lg:px-[2rem] py-[0.6rem] flex flex-col">
                    <div className="text-[#d38518] text-[1.5rem]">
                        <PiShootingStarThin />
                    </div>
                    <Tooltip title={comment?.content}>
                        <div className="text-wrap text-ellipsis line-clamp-[4]">{comment?.content}</div>
                    </Tooltip>
                    <div
                        className="py-[0.1rem] lg:py-[0.5rem] underline text-[#004f3b] cursor-pointer"
                        onClick={() => setOpen(true)}>
                        {t("read_more")}
                    </div>
                    <div className="py-[0.1rem] lg:py-[0.5rem]">
                        {new Date(comment?.createdAt).toLocaleDateString("vi-VN")}
                    </div>
                    <Rating name="read-only" value={comment?.rating} readOnly sx={{ marginTop: "1rem" }} />
                    <div className="flex items-center py-[0.1rem] lg:py-[0.5rem] mt-[0.3rem]">
                        <Avatar src={comment?.avatarUrl} alt="" />
                        <div className="ml-[1rem]">
                            <div className="font-semibold">{comment?.name}</div>
                            <div>{comment?.country}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="md"
                fullWidth
                scroll="paper"
                PaperProps={{
                    sx: { borderRadius: "0.5rem", maxHeight: "80vh" },
                }}>
                <DialogTitle>
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <Avatar src={comment?.avatarUrl} alt="" />
                            <div className="ml-3">
                                <div className="font-semibold">{comment?.name}</div>
                                <div className="text-sm text-gray-600">{comment?.country}</div>
                            </div>
                        </div>
                        <div>
                            <IoMdCloseCircle
                                className="w-[30px] h-[30px] cursor-pointer hover:text-[#ec6565]"
                                onClick={() => setOpen(false)}
                            />
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    <div className="text-sm text-gray-500 mb-2">
                        {new Date(comment?.createdAt).toLocaleDateString("vi-VN")}
                    </div>
                    <Rating name="read-only" value={comment?.rating} readOnly />
                    <div className="mt-3 mb-3 whitespace-pre-line">{comment?.content}</div>
                    {comment?.imageUrls && (
                        <img src={comment?.imageUrls?.[0]} alt="comment" className="w-auto h-auto rounded-md mt-2" />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CommentCard;
