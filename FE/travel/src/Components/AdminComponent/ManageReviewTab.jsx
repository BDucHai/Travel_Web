import { Backdrop, CircularProgress, ImageList, ImageListItem } from "@mui/material";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import ImagePreviewDialog from "../ImagePreviewDialog";
import { deleteReview } from "../../api/Review";

export default function ManageReviewTab({ data, mutate }) {
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState({
        open: false,
        src: null,
    });

    const [filterDate, setFilterDate] = useState("");

    const openPreview = (src) => {
        setPreview({ open: true, src });
    };

    const filteredData = useMemo(() => {
        if (!filterDate) return data;

        return data?.filter((item) => {
            const [month, day, year] = item.date.split("/");
            const formatted = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
            return formatted === filterDate;
        });
    }, [data, filterDate]);

    const delReviews = async (id) => {
        setLoading(true);
        await deleteReview(id);
        await mutate();
        setLoading(false);
    };

    return (
        <div className="flex flex-col gap-4">
            {/* FILTER BAR */}
            <div className="flex items-center gap-3">
                <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="
                        bg-[#111827]
                        border border-[#2a2f3a]
                        text-white
                        px-3 py-2
                        rounded-lg
                        outline-none
                        focus:border-green-500
                        transition
                    "
                />

                <button
                    onClick={() => setFilterDate("")}
                    className="
                        px-3 py-2
                        bg-[#1f2937]
                        border border-[#2a2f3a]
                        text-gray-300
                        rounded-lg
                        hover:bg-[#374151]
                        transition
                    ">
                    Clear
                </button>
            </div>
            {filteredData?.map((item) => (
                <motion.div
                    key={item?.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border rounded-xl p-4 bg-white shadow-sm">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <div className="flex justify-between">
                                <div className="font-semibold text-[#000]">{item?.name}</div>
                                <div className="text-sm text-gray-500">{new Date(item?.createdAt)?.toLocaleDateString("vi-VN")}</div>
                            </div>

                            <div className="text-yellow-500 text-sm">⭐ {item?.rating}/5</div>

                            <p className="text-gray-700 mt-2">{item?.content}</p>

                            {/* IMAGE LIST */}
                            {item?.imageUrls?.length > 0 && (
                                <div className="mt-3">
                                    <ImageList cols={4} rowHeight={200} gap={8}>
                                        {item?.imageUrls.map((img, index) => (
                                            <ImageListItem key={index}>
                                                <img
                                                    src={img}
                                                    alt="img"
                                                    className="rounded-md object-cover cursor-pointer"
                                                    onClick={() => openPreview(img)}
                                                />
                                            </ImageListItem>
                                        ))}
                                    </ImageList>
                                </div>
                            )}

                            <div className="mt-3 flex justify-end">
                                <button
                                    onClick={() => delReviews(item?.id)}
                                    className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer">
                                    Delete
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
            <Backdrop
                open={loading}
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 9999,
                    backgroundColor: "rgba(0,0,0,0.35)",
                }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
