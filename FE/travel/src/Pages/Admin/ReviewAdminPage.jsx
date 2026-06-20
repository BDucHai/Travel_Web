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


    const [params, setParams] = useState({
        status: "PENDING",
        page: 0,
        limit: 10,
    });

    const { data: reviews, mutate } = useSWR(["/admin/testimonials", params], ([url, params]) =>
        getReviews(url, params),
    );

    return (
        <div className="p-6 text-white">
            <div className="text-xl font-semibold mb-4">Review Management</div>
            <Tabs
            value={params?.status}
            textColor="inherit"
            indicatorColor="secondary"
            sx={{
                "& .MuiTab-root": {
                color: "#fff",          
                textTransform: "none",  
                fontWeight: 500,
                },
                "& .Mui-selected": {
                color: "#fff",         
                },
            }}
            onChange={(_, newValue) => {
                setParams(prev => ({
                ...prev,
                status: newValue,
                page: 0,
                }));
            }}
            >
            {statusTabs.map((s, idx) => (
                <Tab key={s.value} label={s.label} value={s.value} />
            ))}
            </Tabs>

            <div className="mt-6">
                {params?.status === "PENDING" && <AcceptReviewTab data={reviews?.data || []} mutate={mutate} />}

                {params?.status === "APPROVED" && <ManageReviewTab data={reviews?.data || []} mutate={mutate} />}

                <div className="flex justify-center mt-6">
                    <Pagination
                        page={params?.page + 1}
                        count={reviews?.totalPages || 1}
                         sx={{
                            "& .MuiPaginationItem-root": {
                            color: "#fff", 
                            },
                            "& .MuiPaginationItem-root.Mui-selected": {
                            backgroundColor: "#fff", 
                            color: "#000",           
                            },
                            "& .MuiPaginationItem-root:hover": {
                            backgroundColor: "rgba(255,255,255,0.2)", 
                            },
                        }}
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
