import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { motion } from "framer-motion";
import { deleteBlog, getBlogAdmin } from "../../api/Blog";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

const BlogManage = () => {
    const navigate = useNavigate();
    const [params, setParams] = useState({
        // search: "",
        // dateFilter: "",
        page: 0,
        limit: 20,
    });

    const { data, mutate, isLoading } = useSWR(["/blogs", params], ([_, params]) => getBlogAdmin(params), {
        keepPreviousData: true,
    });

    // const { data, mutate } = useSWR(["/blogs/search", filters], ([_, body]) => searchBlog(body));
    const blog = data?.data;

    const handleDeleteBlog = async (id) => {
        await deleteBlog(id);
        await mutate();
    };

    const handleSearch = async () => {
        setParams((prev) => ({
            ...prev,
            page: 0,
        }));

        await mutate();
    };

    const columns = [
        {
            field: "titleEn",
            headerName: "Title En",
            flex: 2,
            minWidth: 250,
            renderCell: (params) => <div className="text-white font-medium">{params?.value}</div>,
        },
        {
            field: "titleFr",
            headerName: "Title Fr",
            flex: 2,
            minWidth: 250,
            renderCell: (params) => <div className="text-white font-medium">{params?.value}</div>,
        },
        {
            field: "authorName",
            headerName: "Author",
            flex: 1,
            minWidth: 120,
            renderCell: (params) => <div className="text-gray-300">{params?.value}</div>,
        },
        {
            field: "createdAt",
            headerName: "Published Date",
            flex: 1,
            minWidth: 150,
            renderCell: (params) => (
                <div className="text-gray-300">{new Date(params?.value)?.toLocaleDateString("vi-VN")}</div>
            ),
        },
        {
            field: "viewCount",
            headerName: "Views",
            flex: 1,
            minWidth: 100,
            renderCell: (params) => <div className="text-blue-400 font-semibold">{params?.value}</div>,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            minWidth: 150,
            sortable: false,
            renderCell: (params) => {
                return (
                    <div className="flex items-center justify-center w-full h-full gap-2">
                        <button
                            onClick={() => navigate(`/admin/create/blog/${params?.row?.id}`)}
                            className="
                        px-3 py-1
                        rounded-md
                        bg-blue-600
                        hover:bg-blue-500
                        text-white
                        text-sm
                        cursor-pointer
                    ">
                            Edit
                        </button>

                        <button
                            onClick={() => handleDeleteBlog(params.row?.id)}
                            className="
                        px-3 py-1
                        rounded-md
                        bg-red-600
                        hover:bg-red-500
                        text-white
                        text-sm
                        cursor-pointer
                    ">
                            Delete
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <div
            className="
                min-h-screen
                p-6
                text-white
                bg-[radial-gradient(circle,_#0e3637_0%,_#0d0d11ab_70%)]
            ">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold">Blog Management</h1>
                    <p className="text-gray-400 text-sm">Manage your articles with style ✨</p>
                </div>

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="
                        px-5
                        py-3
                        rounded-xl
                        bg-gradient-to-r
                        from-[#0ea5e9]
                        to-[#22c55e]
                        text-black
                        font-medium
                        hover:scale-[1.02]
                        transition
                        cursor-pointer  
                    "
                    onClick={() => navigate("/admin/create/blog")}>
                    + Add Blog
                </motion.button>
            </div>

            {/* FILTER BAR */}
            <div className="flex flex-wrap gap-3 mb-6">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={params.search}
                    onChange={(e) =>
                        setParams((prev) => ({
                            ...prev,
                            search: e.target.value,
                        }))
                    }
                    className="py-[0.5rem] px-[1rem] rounded-md border-[1px] border-[#fff]"
                />

                <input
                    type="date"
                    value={params.dateFilter}
                    onChange={(e) =>
                        setParams((prev) => ({
                            ...prev,
                            dateFilter: e.target.value,
                        }))
                    }
                    className="py-[0.5rem] px-[1rem] rounded-md border-[1px] border-[#fff] mx-[2rem] text-white  [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />

                <button
                    onClick={handleSearch}
                    className="py-[0.5rem] px-[1rem] rounded-md border-[1px] border-[#fff] cursor-pointer hover:bg-[#fff] hover:text-[#000]">
                    Search
                </button>
            </div>

            {/* TABLE WRAPPER */}
            <div
                className="
                    h-[650px]
                    overflow-y-auto
                    bg-[#0f172a]/70
                    backdrop-blur-md
                    rounded-2xl
                    border
                    border-[#334155]
                    p-3
                ">
                <DataGrid
                    rows={blog || []}
                    columns={columns || []}
                    paginationMode="server"
                    loading={isLoading}
                    rowCount={data?.pagination?.total || 0}
                    pageSizeOptions={[20, 50, 100]}
                    paginationModel={{
                        page: params?.page,
                        pageSize: params?.limit,
                    }}
                    onPaginationModelChange={(model) => {
                        setParams((prev) => ({
                            ...prev,
                            page: model.page,
                            limit: model.pageSize,
                        }));
                    }}
                    sx={{
                        border: "none",
                        color: "#e5e7eb",

                        "& .MuiDataGrid-main": {
                            backgroundColor: "#0f172a",
                        },

                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: "#0f172a",
                        },

                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#0f172a !important",
                            borderBottom: "1px solid #1f2937",
                        },

                        "& .MuiDataGrid-columnHeaderTitle": {
                            color: "#e8edf1 !important",
                            fontWeight: 600,
                        },

                        "& .MuiDataGrid-columnHeader": {
                            color: "#e5e7eb !important",
                        },

                        "& .MuiDataGrid-sortIcon": {
                            color: "#111214 !important",
                        },

                        "& .MuiDataGrid-menuIcon": {
                            color: "#010102 !important",
                        },

                        "& .MuiDataGrid-cell": {
                            borderColor: "#1f2937",
                            color: "#e5e7eb",
                        },

                        "& .MuiDataGrid-row:hover": {
                            backgroundColor: "#13171e",
                        },

                        "& .MuiDataGrid-row.Mui-selected": {
                            backgroundColor: "#13171e !important",
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "1px solid #1f2937",
                            backgroundColor: "#0f172a",
                            color: "#e5e7eb",
                        },

                        "& .MuiTablePagination-root": {
                            color: "#e5e7eb",
                        },

                        "& .MuiSvgIcon-root": {
                            color: "#94a3b8",
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default BlogManage;
