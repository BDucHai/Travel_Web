import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { motion } from "framer-motion";
import { deleteBlog, getBlog } from "../../api/Blog";
import { useNavigate } from "react-router-dom";

const BlogManage = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [dateFilter, setDateFilter] = useState("");

    const [blog, setBlog] = useState([
        {
            id: 1,
            title: "How to build React Admin Panel",
            date: "2026-06-01",
            author: "Admin",
            views: 1200,
        },
        {
            id: 2,
            title: "Tailwind + MUI best practice",
            date: "2026-06-05",
            author: "John",
            views: 980,
        },
        {
            id: 3,
            title: "Framer Motion UI tricks",
            date: "2026-06-06",
            author: "Jane",
            views: 1450,
        },
    ]);

    const handleDeleteBlog = async (id) => {
        await deleteBlog(id);
    };

    const handleSearch = async (filter) => {
        const res = await getBlog(filter);
        setBlog(res);
    };

    const columns = [
        {
            field: "title",
            headerName: "Title",
            flex: 2,
            minWidth: 250,
            renderCell: (params) => <div className="text-white font-medium">{params?.value}</div>,
        },
        {
            field: "author",
            headerName: "Author",
            flex: 1,
            minWidth: 120,
            renderCell: (params) => <div className="text-gray-300">{params?.value}</div>,
        },
        {
            field: "date",
            headerName: "Published Date",
            flex: 1,
            minWidth: 150,
            renderCell: (params) => <div className="text-gray-300">{params?.value}</div>,
        },
        {
            field: "views",
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
                            onClick={() => navigate(`/admin/update/blog/${params?.row?.id}`)}
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
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="
                        w-[280px]
                        px-4
                        py-3
                        rounded-xl
                        bg-[#0f172a]
                        border
                        border-[#334155]
                        text-white
                        outline-none
                    "
                />

                <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="
                        px-4
                        py-3
                        rounded-xl
                        bg-[#0f172a]
                        border
                        border-[#334155]
                        text-white
                        outline-none
                    "
                />

                <button
                    onClick={() => {
                        handleSearch({ title: search, date: dateFilter });
                    }}
                    className="
                        px-4
                        py-3
                        rounded-xl
                        bg-[#1e293b]
                        border
                        border-[#334155]
                        hover:bg-[#263245]
                        transition
                        cursor-pointer
                    ">
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
                    rows={blog}
                    columns={columns}
                    pageSizeOptions={[20, 50, 100]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 20,
                            },
                        },
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
                            color: "#090a0b !important",
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
