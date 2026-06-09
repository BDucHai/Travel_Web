import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@mui/material";
import AcceptReviewTab from "../../Components/AdminComponent/AcceptReviewTab";
import ManageReviewTab from "../../Components/AdminComponent/ManageReviewTab";
import { getReviews } from "../../api/Review";

const ReviewAdminPage = () => {
    const [tab, setTab] = useState(0);
    const [reviews, setReviews] = useState([]);


     const fetchReviews = async () => {
          // const res = await getReviews();
          // return res;
         const data = [
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

         return data;
     };

    const loadData = async () => {
        const data = await fetchReviews();
        setReviews(data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleTabChange = (_, v) => {
        setTab(v);
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
                <Tab label="Review Queue" />
                <Tab label="Manage Accepted" />
            </Tabs>

            <div className="mt-6">
                {tab === 0 && <AcceptReviewTab data={reviews?.filter((r) => r.status === 0)} refresh={loadData} />}

                {tab === 1 && <ManageReviewTab data={reviews?.filter((r) => r.status === 1)} refresh={loadData} />}
            </div>
        </div>
    );
}

export default ReviewAdminPage;