import React, { useState } from "react";
import { Tabs, Tab, Pagination } from "@mui/material";
import AcceptReviewTab from "../../Components/AdminComponent/AcceptReviewTab";
import ManageReviewTab from "../../Components/AdminComponent/ManageReviewTab";
import { getReviews } from "../../api/Review";
import useSWR from "swr";

const ReviewAdminPage = () => {
    const statusTabs = [
        { label: "PENDING", value: "PENDING" },
        { label: "APPROVED", value: "APPROVED" },
    ];

    const [tab, setTab] = useState(0);

    const [params, setParams] = useState({
        status: "PENDING",
        page: 0,
        limit: 10,
    });

    const { data: reviews, mutate } = useSWR(["/admin/testimonials", params], ([url, params]) =>
        getReviews(url, params),
    );

    const handleTabChange = (_, value) => {
        setTab(value);

        setParams((prev) => ({
            ...prev,
            status: statusTabs[value].value,
            page: 0,
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
                {tab === "PENDING" && <AcceptReviewTab data={reviews?.data} mutate={mutate} />}

                {tab === "APPROVED" && <ManageReviewTab data={reviews?.data} mutate={mutate} />}

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
