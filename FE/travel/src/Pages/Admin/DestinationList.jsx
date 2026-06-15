import { useState } from "react";
import useSWR from "swr";
import { Box, Button, Chip, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { deleteDestination, getDestinations } from "../../api/Destinations";
import { MdEdit, MdDelete } from "react-icons/md";

export default function DestinationList() {
    const [params, setParams] = useState({
        page: 0,
        limit: 20,
    });

    const { data, isLoading, mutate } = useSWR(["/destinations", params], ([url, params]) => getDestinations(params));

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this destination?")) return;

        await deleteDestination(id);

        mutate(
            (prev) => ({
                ...prev,
                data: prev.data.filter((item) => item.id !== id),
            }),
            false,
        );
    };

    const columns = [
        {
            field: "thumbnailUrl",
            headerName: "Image",
            width: 100,
            renderCell: (params) => <img src={params.value} alt="" className="w-16 h-12 object-cover rounded" />,
        },
        {
            field: "name",
            headerName: "Name EN",
            flex: 1,
        },
        {
            field: "region",
            headerName: "Region",
            width: 120,
        },
        {
            field: "isActive",
            headerName: "Active",
            width: 120,
            renderCell: (params) =>
                params.value ? (
                    <Chip label="Active" color="success" size="small" />
                ) : (
                    <Chip label="Hidden" color="error" size="small" />
                ),
        },
        {
            field: "display_order",
            headerName: "Order",
            width: 100,
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton component={Link} to={`/admin/destinations/create/${params.row.id}`}>
                        <MdEdit className="text-white" />
                    </IconButton>

                    <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
                        <MdDelete />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <Box
            sx={{
                bgcolor: "#121212",
                color: "#fff",
                minHeight: "100vh",
                p: 3,
            }}>
            <Box display="flex" justifyContent="space-between" mb={3}>
                <Typography variant="h5">Destinations</Typography>

                <Button component={Link} to="/admin/destinations/create" variant="contained" sx={{ marginY: "2rem" }}>
                    Add Destination
                </Button>
            </Box>

            <DataGrid
                rows={data || []}
                columns={columns}
                loading={isLoading}
                getRowId={(row) => row.id}
                paginationMode="server"
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
        </Box>
    );
}
