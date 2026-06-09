import { useState } from "react";
import { ImageList, ImageListItem } from "@mui/material";
import { motion } from "framer-motion";
import ImagePreviewDialog from "../ImagePreviewDialog";
import { deleteReview, updateStatusReviews } from "../../api/Review";

export default function AcceptReviewTab({ data, mutate }) {
    const [preview, setPreview] = useState({
        open: false,
        src: null,
    });

    const updateStatus = async (id, status) => {
        const res = await updateStatusReviews(id, status);

        mutate(
            ["/contacts", { status: 0 }],
            (currentData) => {
                if (!currentData) return currentData;

                return {
                    ...currentData,
                    data: currentData.data.map((item) => (item.id === id ? res : item)),
                };
            },
            false,
        );
    };

    const delReviews = async (id) => {
        await deleteReview(id);
        mutate(["/contacts", { status: 0 }]);
    };

    const openPreview = (src) => {
        setPreview({ open: true, src });
    };

    return (
        <div className="flex flex-col gap-4">
            {data?.map((item) => (
                <motion.div
                    key={item?.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border rounded-xl p-4 bg-white shadow-sm">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            {/* HEADER */}
                            <div className="flex justify-between">
                                <div className="font-semibold text-[#000] text-[1.2rem]">
                                    {item?.name} - {item?.country}
                                </div>
                                <div className="text-sm text-gray-500">{item?.date}</div>
                            </div>

                            <div className="text-yellow-500 text-sm">⭐ {item?.rating}/5</div>

                            {/* CONTENT */}
                            <p className="text-gray-700 mt-2">{item?.content}</p>

                            {/* IMAGE LIST */}
                            {item?.images?.length > 0 && (
                                <div className="mt-3">
                                    <ImageList cols={4} rowHeight={200} gap={8}>
                                        {item?.images.map((img, index) => (
                                            <ImageListItem key={index}>
                                                <img
                                                    src={img}
                                                    alt="img"
                                                    className="rounded-md object-cover cursor-pointer "
                                                    onClick={() => openPreview(img)}
                                                />
                                            </ImageListItem>
                                        ))}
                                    </ImageList>
                                </div>
                            )}

                            {/* ACTION */}
                            <div className="mt-3 flex justify-end gap-2">
                                <button
                                    onClick={() => updateStatus(item?.id, 1)}
                                    className="px-4 py-1 bg-green-500 text-white rounded-lg cursor-pointer">
                                    Accept
                                </button>

                                <button
                                    onClick={() => delReviews(item?.id)}
                                    className="px-4 py-1 bg-red-500 text-white rounded-lg cursor-pointer">
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* DIALOG PREVIEW */}
                    <ImagePreviewDialog
                        open={preview?.open}
                        src={preview?.src}
                        onClose={() => setPreview({ open: false, src: null })}
                    />
                </motion.div>
            ))}
        </div>
    );
}
