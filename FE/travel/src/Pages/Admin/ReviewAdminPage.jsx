import React, { useEffect, useState } from "react";
import { Tabs, Tab, Pagination } from "@mui/material";
import AcceptReviewTab from "../../Components/AdminComponent/AcceptReviewTab";
import ManageReviewTab from "../../Components/AdminComponent/ManageReviewTab";
import { getReviews } from "../../api/Review";
import useSWR from "swr";
import { useTranslation } from "react-i18next";

const ReviewAdminPage = () => {
    const { t } = useTranslation();

    const statusTabs = [
        { label: t("review.review_queue"), value: 0 },
        { label: t("review.manage_accepted"), value: 1 },
    ];

    const [tab, setTab] = useState(0);

    const reviewsFake = [
        {
            id: 1,
            content: "Amazing place!",
            rating: 5,
            name: "Jessica M.",
            country: "Australia",
            date: "06/25/2026",
            images: [
                "https://cdn-media.sforum.vn/storage/app/media/anh-dep-16.jpg",
                "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/meme_cute_co_chu_db5f361ff3.jpg",
                "https://cdn-media.sforum.vn/storage/app/media/anh-dep-82.jpg",
            ],
            status: 0,
        },
        {
            id: 2,
            content: "Not bad",
            rating: 4,
            name: "John D.",
            country: "USA",
            date: "06/25/2026",
            images: ["https://thf.bing.com/th/id/OIP.zwFcHylMP8dnd3O64uj8HQHaE7"],
            status: 1,
        },
        {
            id: 3,
            content: "Amazing place!",
            rating: 5,
            name: "Jessica M.",
            country: "Australia",
            date: "06/25/2026",
            images: [
                "https://cdn-media.sforum.vn/storage/app/media/anh-dep-16.jpg",
                "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/meme_cute_co_chu_db5f361ff3.jpg",
                "https://cdn-media.sforum.vn/storage/app/media/anh-dep-82.jpg",
            ],
            status: 1,
        },
        {
            id: 4,
            content: "Not bad",
            rating: 4,
            name: "John D.",
            country: "USA",
            date: "06/25/2026",
            images: ["https://thf.bing.com/th/id/OIP.zwFcHylMP8dnd3O64uj8HQHaE7"],
            status: 0,
        },
    ];

    const [params, setParams] = useState({
        status: 0,
        page: 1,
        limit: 10,
    });

    const { data: reviews, mutate } = useSWR(["/reviews", params], ([url, params]) => getReviews(url, params));

    const handleTabChange = (_, value) => {
        setTab(value);

        setParams((prev) => ({
            ...prev,
            status: statusTabs[value].value,
            page: 1,
        }));
    };

    return (
        <div className="p-6 text-white">
            <div className="text-xl font-semibold mb-4">Review Management</div>
            <Tabs
                value={tab}
                onChange={handleTabChange}
                sx={{
                    "& .MuiTab-root": {
                        color: "#fcfdff",
                        textTransform: "none",
                        fontWeight: 500,
                    },
                }}>
                {statusTabs.map((s, idx) => (
                    <Tab key={s.value} label={s.label} />
                ))}
            </Tabs>

            <div className="mt-6">
                {tab === 0 && <AcceptReviewTab data={reviews?.data || reviewsFake} mutate={mutate} />}

                {tab === 1 && <ManageReviewTab data={reviews?.data || reviewsFake} mutate={mutate} />}

                <div className="flex justify-center mt-6">
                    <Pagination
                        page={params?.page}
                        count={reviews?.pagination?.totalPages || 1}
                        onChange={(_, page) =>
                            setParams((prev) => ({
                                ...prev,
                                page,
                            }))
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default ReviewAdminPage;
