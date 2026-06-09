import React, { useState } from "react";
import { Box, Button, TextField, Avatar, Rating } from "@mui/material";
import { motion } from "framer-motion";
import useSWR from "swr";
import axiosClient from "./axiosClient";
import { createReview, getReviews } from "./api/Review";
import { useTranslation } from "react-i18next";

export default function ReviewPage() {

    const {t} = useTranslation();
  const [page, setPage] = useState(1);
  const { data, error, isLoading, mutate } = useSWR(
    ["/reviews", { page, limit: 20 }],
    ([url, params]) => getReviews([url, params])
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    rating: 0,
    content: "",
    avatar_url: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await createReview(form);
    setForm({
      name: "",
      email: "",
      country: "",
      rating: 0,
      content: "",
      avatar_url: "",
    });
    mutate();
  };

  const loadMore = () => setPage((prev) => prev + 1);

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error loading reviews</p>;

  return (
    <Box className="bg-gray-100 text-gray-900 min-h-screen p-6">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow-md p-4 mb-6">
        <h1 className="text-2xl font-bold">{t("review.customer_review")}</h1>
      </header>

      {/* Form tạo review */}
      <Box className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">{t("review.title")}</h2>
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Name"
            name="name"
            value={form?.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={form?.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Country"
            name="country"
            value={form?.country}
            onChange={handleChange}
            fullWidth
          />
          <Rating
            name="rating"
            value={form?.rating}
            onChange={(_, newValue) =>
              setForm({ ...form, rating: newValue })
            }
          />
          <TextField
            label="Content"
            name="content"
            value={form?.content}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            className="col-span-2"
          />
          <TextField
            label="Avatar URL"
            name="avatar_url"
            value={form?.avatar_url}
            onChange={handleChange}
            fullWidth
            className="col-span-2"
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          className="mt-4"
          onClick={handleSubmit}
        >
          {t("review.submit")}
        </Button>
      </Box>

      {/* Danh sách review */}
      <div className="space-y-4">
        {data?.map((r) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-4 flex gap-4"
          >
            <Avatar src={r?.avatar_url} alt={r?.name} />
            <div>
              <h3 className="font-semibold">{r?.name}</h3>
              <p className="text-sm text-gray-500">
                {r?.country} | {r?.email}
              </p>
              <Rating value={r?.rating} readOnly size="small" />
              <p className="mt-2">{r?.content}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(r?.created_at).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load more */}
      <div className={`${data?.totalPage <= page ? "hidden" : "flex"} justify-center mt-6`}>
        <Button variant="outlined" onClick={loadMore}>
          {t("load_more")}
        </Button>
      </div>
    </Box>
  );
}
