import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Rating from "@mui/material/Rating";
import { PiShootingStarThin } from "react-icons/pi";

const CommentCard = ({ comment }) => {
    return (
        <div className="relative flex flex-col w-full h-[18rem] lg:h-[20rem] border-[1px] border-[#3b97897d] rounded-[0.2rem] bg-white">
            <div className="flex-1 px-[1rem] lg:px-[2rem] py-[0.6rem] flex flex-col">
                <div className="text-[#d38518] text-[1.5rem]">
                    <PiShootingStarThin />
                </div>
                <Tooltip title={comment?.content}>
                    <div className="text-wrap text-ellipsis line-clamp-[6]">{comment?.content}</div>
                </Tooltip>
                <Rating name="read-only" value={comment?.rating} readOnly sx={{ marginTop: "1rem" }} />
                <div className="py-[0.1rem] lg:py-[0.5rem] mt-[0.3rem] font-semibold">{comment?.name}</div>
                <div className="py-[0.1rem] lg:py-[0.5rem]">{comment?.country}</div>
            </div>
        </div>
    );
};

export default CommentCard;
