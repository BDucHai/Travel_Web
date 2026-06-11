import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { deleteTours, getTours } from "../../api/Tour";
import { DataGrid } from "@mui/x-data-grid";
import { motion } from "framer-motion";
import Tooltip from "@mui/material/Tooltip";
import { CiUnlock, CiLock } from "react-icons/ci";

const TourManage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [query, setQuery] = useState({
        title: "",
        page: 1,
        limit: 20,
    });

    const { data: tours, isLoading, mutate } = useSWR(["/tours", query], ([_, params]) => getTours(params));

    const toursFake = [
  {
    id: 1,
    code: "TOUR001",
    title_en: "Discover Paris",
    title_fr: "Découvrir Paris",
    duration_days: 5,
    tour_styles: [
      { name: "City" },
      { name: "Culture" },
    ],
    isActive: true,
    created_by: "Admin",
    created_at: "2026-06-01",
  },
  {
    id: 2,
    code: "TOUR002",
    title_en: "Safari Adventure",
    title_fr: "Aventure Safari",
    duration_days: 7,
    tour_styles: [
      { name: "Wildlife" },
      { name: "Adventure" },
    ],
    isActive: false,
    created_by: "Editor",
    created_at: "2026-06-05",
  },
  {
    id: 3,
    code: "TOUR003",
    title_en: "Beach Relaxation",
    title_fr: "Détente à la plage",
    duration_days: 3,
    tour_styles: [
      { name: "Beach" },
      { name: "Luxury" },
    ],
    isActive: true,
    created_by: "Admin",
    created_at: "2026-06-07",
  },
  {
    id: 4,
    code: "TOUR004",
    title_en: "Mountain Hiking",
    title_fr: "Randonnée en montagne",
    duration_days: 4,
    tour_styles: [
      { name: "Nature" },
      { name: "Adventure" },
    ],
    isActive: true,
    created_by: "Moderator",
    created_at: "2026-06-09",
  },
];


    const handleDeleteTour = async (id) => {
        await deleteTours(id);
        mutate();
    };

    const handleSearch = () => {
        setParams((prev) => ({
            ...prev,
            page: 1,
        }));
        mutate();
    };
    const columns = [
          {
            field: "code",
            headerName: "Code Tour",
            flex: 1,
            minWidth: 120,
            renderCell: (params) => <div className="text-white overflow-hidden text-ellipsis">{params?.value}</div>,
        },
        {
            field: "title_en",
            headerName: "Title",
            flex: 1.5,
            minWidth: 200,
            renderCell: (params) => <Tooltip title={params?.value}><div className="text-white overflow-hidden text-ellipsis">{params?.value}</div> </Tooltip>,
        },
                {
            field: "title_fr",
            headerName: "Title",
            flex: 1.5,
            minWidth: 200,
            renderCell: (params) => <Tooltip title={params?.value}><div className="text-white overflow-hidden text-ellipsis">{params?.value}</div> </Tooltip>,
        },
        {
            field: "duration_days",
            headerName: "Duration Days",
            flex: 1,
            minWidth: 120,
            renderCell: (params) => <div className="text-white overflow-hidden text-ellipsis">{params?.value}</div>,
        },
          {
            field: "tour_styles",
            headerName: "Duration Days",
            flex: 1,
            minWidth: 120,
            renderCell: (params) => {
                const styles = params?.value || [];
                const styleList = styles?.map((s) => s?.name).join(", ");
                return <Tooltip title={params?.value}><div className="text-white overflow-hidden text-ellipsis">{params?.value}</div> </Tooltip>;
            },
        },
        {
            field: "isActive",
            headerName: "Author",
            flex: 1,
            minWidth: 120,
            renderCell: (params) => <div className="text-white">{params?.value}</div>,
        },
        {
            field: "created_by",
            headerName: "Published Date",
            flex: 1,
            minWidth: 150,
            renderCell: (params) => <div className="text-white">{params?.value}</div>,
        },
        {
            field: "created_at",
            headerName: "Views",
            flex: 1,
            minWidth: 100,
            renderCell: (params) => <div className="text-white">{params?.value}</div>,
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
                            {params?.row?.isActive? <CiLock />: <CiUnlock />}
                        </button>

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
                            onClick={() => handleDeleteTour(params.row?.id)}
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
                    + Add Tour
                </motion.button>
            </div>

            {/* FILTER BAR */}
            <div className="flex flex-wrap gap-3 mb-6">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={params.search}
                    onChange={(e) =>
                        setParams((prev) => ({
                            ...prev,
                            name: e.target.value,
                        }))
                    }
                />

                <button onClick={handleSearch}>Search</button>
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
                    rows={tours?.data || toursFake}
                    columns={columns}
                    paginationMode="server"
                    loading={isLoading}
                    rowCount={tours?.pagination?.total || 0}
                    pageSizeOptions={[20, 50, 100]}
                    paginationModel={{
                        page: params?.page - 1,
                        pageSize: params?.limit,
                    }}
                    onPaginationModelChange={(model) => {
                        setParams((prev) => ({
                            ...prev,
                            page: model.page + 1,
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

export default TourManage;
