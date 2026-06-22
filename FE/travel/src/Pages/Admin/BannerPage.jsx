import React, { useState } from "react";
import useSWR from "swr";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { uploadImage } from "../../utils/uploadImage";
import { createBanner, deleteBanner, getBanners } from "../../api/Banner";

export default function BannerPage() {
  const {
    data: banners,
    isLoading,
    mutate,
  } = useSWR("/api/admin/banners", getBanners);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleUpload = async () => {
    setLoading(true);
    if (!file) return;
    try {
      const data = await uploadImage(file);
      await createBanner({ imageUrl: data.url });
      await mutate();
      setFile(null);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    await deleteBanner(id);
    await mutate();
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Banner</h1>

      {/* Upload */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-sm"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!file}
        >
          Thêm Banner
        </Button>
      </div>

      {/* Danh sách banner */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {banners?.map((banner) => (
          <div
            key={banner?.id}
            className="relative bg-gray-800 rounded shadow overflow-hidden"
          >
            <img
              src={banner?.imageUrl}
              alt="banner"
              className="w-full h-40 object-cover"
            />
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handleDelete(banner?.id)}
              className="absolute top-2 right-2"
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
      <Backdrop
        open={loading || isLoading}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 9999,
          backgroundColor: "rgba(0,0,0,0.35)",
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
