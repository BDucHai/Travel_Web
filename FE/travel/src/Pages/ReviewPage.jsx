import React, { useMemo, useState } from "react";
import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Rating, TextField } from "@mui/material";
import { motion } from "framer-motion";
import useSWR from "swr";
import { useTranslation } from "react-i18next";
import { MdAddPhotoAlternate } from "react-icons/md";
import { createReview, getReviews } from "../api/Review";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function ReviewPage() {
    const { t } = useTranslation();

    const [page, setPage] = useState(1);

    const { data, mutate } = useSWR(["/reviews", { page, limit: 20 }], ([url, params]) => getReviews([url, params]));

    const [openModal, setOpenModal] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        country: "",
        rating: 5,
        content: "",
        avatar_url: "",
        list_image: [],
    });

    // =========================
    // FAKE DATA
    // =========================
    const reviewFake = useMemo(
        () => [
            {
                id: 1,
                name: "Emily Watson",
                email: "emily@gmail.com",
                country: "United Kingdom",
                rating: 5,
                content:
                    "Wonderful experience in Vietnam. Everything was perfectly organized and the guide was amazing.",
                avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
                list_image: [
                    "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200",
                    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200",
                    "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200",
                ],
                created_at: "2026-06-01",
            },
            {
                id: 2,
                name: "John Carter",
                email: "john@gmail.com",
                country: "United States",
                rating: 4,
                content: "The trip was beautiful and food was fantastic. I really enjoyed Ha Long Bay.",
                avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
                list_image: [
                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200",
                    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200",
                ],
                created_at: "2026-06-03",
            },
            {
                id: 3,
                name: "Sophie Martin",
                email: "sophie@gmail.com",
                country: "France",
                rating: 5,
                content: "Absolutely loved the local culture and people. Will come back again!",
                avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400",
                list_image: ["https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=1200"],
                created_at: "2026-06-04",
            },
        ],
        [],
    );

    const reviews = data?.data || reviewFake;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // =========================
    // HANDLE AVATAR
    // =========================
    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const preview = URL.createObjectURL(file);

        setForm((prev) => ({
            ...prev,
            avatar_url: preview,
        }));
    };

    // =========================
    // HANDLE MULTIPLE IMAGES
    // =========================
    const handleListImageChange = (e) => {
        const files = Array.from(e.target.files || []);

        const previewImages = files.map((file) => URL.createObjectURL(file));

        setForm((prev) => ({
            ...prev,
            list_image: previewImages,
        }));
    };

    const handleSubmit = async () => {
        try {
            await createReview(form);

            setForm({
                name: "",
                email: "",
                country: "",
                rating: 5,
                content: "",
                avatar_url: "",
                list_image: [],
            });

            setOpenModal(false);

            mutate();
        } catch (error) {
            console.log(error);
        }
    };

    const loadMore = () => {
        setPage((prev) => prev + 1);
    };

    return (
        <Box className="bg-[#fcf5ef] min-h-screen">
            {/* HEADER */}
            <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b shadow-sm px-6 py-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">{t("review.customer_review")}</h1>

                {/* CREATE REVIEW BUTTON */}
                <Button
                    variant="contained"
                    onClick={() => setOpenModal(true)}
                    sx={{
                        borderRadius: "999px",
                        textTransform: "none",
                        paddingX: 3,
                    }}>
                    Write Review
                </Button>
            </header>

            {/* REVIEW LIST */}
            <div className="max-w-5xl mx-auto p-6 space-y-5">
                {reviews?.map((r) => (
                    <motion.div
                        key={r?.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="
                            bg-white
                            rounded-3xl
                            shadow-sm
                            border
                            border-gray-100
                            p-5
                        ">
                        <div className="flex gap-4">
                            <Avatar
                                src={r?.avatar_url}
                                alt={r?.name}
                                sx={{
                                    width: 56,
                                    height: 56,
                                }}
                            />

                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold text-lg">{r?.name}</h3>

                                        <p className="text-sm text-gray-500">
                                            {r?.country} • {r?.email}
                                        </p>
                                    </div>

                                    <p className="text-xs text-gray-400">
                                        {new Date(r?.created_at).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="mt-2">
                                    <Rating value={r?.rating} readOnly size="small" />
                                </div>

                                <p className="mt-3 text-gray-700 leading-7">{r?.content}</p>

                                {/* IMAGES */}
                                {r?.list_image?.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                                        {r?.list_image?.map((img, index) => (
                                            <img
                                                key={index}
                                                src={img}
                                                alt=""
                                                className="
                                                    w-full
                                                    h-[180px]
                                                    object-cover
                                                    rounded-2xl
                                                "
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* LOAD MORE */}
            <div className={`${data?.totalPage <= page ? "hidden" : "flex"} justify-center pb-10`}>
                <Button variant="outlined" onClick={loadMore}>
                    {t("load_more")}
                </Button>
            </div>

            {/* MODAL CREATE REVIEW */}
            <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth>
                <DialogTitle className="flex items-center justify-between">
                    <span className="font-bold text-xl">{t("review.title")}</span>

                    <IconButton onClick={() => setOpenModal(false)}>
                        <IoIosCloseCircleOutline />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <TextField label="Name" name="name" value={form?.name} onChange={handleChange} fullWidth />

                        <TextField label="Email" name="email" value={form?.email} onChange={handleChange} fullWidth />

                        <TextField
                            label="Country"
                            name="country"
                            value={form?.country}
                            onChange={handleChange}
                            fullWidth
                        />

                        <div className="flex items-center">
                            <Rating
                                name="rating"
                                value={form?.rating}
                                onChange={(_, newValue) =>
                                    setForm({
                                        ...form,
                                        rating: newValue,
                                    })
                                }
                            />
                        </div>

                        {/* CONTENT */}
                        <TextField
                            label="Content"
                            name="content"
                            value={form?.content}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={5}
                            className="md:col-span-2"
                        />

                        {/* AVATAR */}
                        <div className="md:col-span-2">
                            <p className="font-medium mb-2">Avatar Image</p>

                            <label
                                className="
                                    border-2
                                    border-dashed
                                    rounded-2xl
                                    h-[180px]
                                    flex
                                    flex-col
                                    items-center
                                    justify-center
                                    cursor-pointer
                                    hover:bg-gray-50
                                    transition
                                ">
                                {form?.avatar_url ? (
                                    <img
                                        src={form?.avatar_url}
                                        alt=""
                                        className="
                                            w-full
                                            h-full
                                            object-cover
                                            rounded-2xl
                                        "
                                    />
                                ) : (
                                    <>
                                        <MdAddPhotoAlternate className="text-[40px]" />

                                        <p className="mt-2 text-sm text-gray-500">Upload Avatar</p>
                                    </>
                                )}

                                <input type="file" accept="image/*" hidden onChange={handleAvatarChange} />
                            </label>
                        </div>

                        {/* LIST IMAGES */}
                        <div className="md:col-span-2">
                            <p className="font-medium mb-2">Travel Images</p>

                            <label
                                className="
                                    border-2
                                    border-dashed
                                    rounded-2xl
                                    p-6
                                    flex
                                    flex-col
                                    items-center
                                    justify-center
                                    cursor-pointer
                                    hover:bg-gray-50
                                    transition
                                ">
                                <MdAddPhotoAlternate className="text-[40px]" />

                                <p className="mt-2 text-sm text-gray-500">Upload Multiple Images</p>

                                <input type="file" accept="image/*" multiple hidden onChange={handleListImageChange} />
                            </label>

                            {/* PREVIEW */}
                            {form?.list_image?.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                                    {form?.list_image?.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt=""
                                            className="
                                                w-full
                                                h-[140px]
                                                object-cover
                                                rounded-2xl
                                            "
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{
                                borderRadius: "999px",
                                textTransform: "none",
                                paddingX: 4,
                            }}>
                            {t("review.submit")}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </Box>
    );
}
