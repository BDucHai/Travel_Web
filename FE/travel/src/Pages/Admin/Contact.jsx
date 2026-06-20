import React, { useState } from "react";
import { Tabs, Tab, Box, Button, Pagination, Backdrop, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import useSWR from "swr";
import { getContacts, deleteContacts, updateStatusContact } from "../../api/Contact";

export default function Contact() {
    const statusTabs = [
        { label: "NEW", value: "NEW" },
        { label: "DONE", value: "DONE" },
    ];

    const [params, setParams] = useState({
        status: "NEW",
        page: 0,
        limit: 10,
    });

    const { data: contacts, mutate, isLoading } = useSWR(["/admin/contact-messages", params], ([url, params]) =>
        getContacts(url, params),
    );


    const updateStatus = async (id) => {
        await updateStatusContact(id);
        await mutate();
    };

    const deleteContact = async (id) => {
        await deleteContacts(id);
        await mutate();
    };

    return (
        <Box className="bg-[radial-gradient(circle,_#0e3637_0%,_#0d0d11ab_70%)] text-white min-h-screen p-6">
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
                onChange={(_, newValue) =>
                    setParams((prev) => ({
                    ...prev,
                    status: newValue,
                    page: 0,
                    }))
                }
                >
                {statusTabs.map((s) => (
                    <Tab key={s.value} label={s.label} value={s.value} />
                ))}
                </Tabs>


            <div className="mt-6 space-y-4">
                {contacts?.data?.map((c) => (
                    <motion.div
                        key={c?.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-800 rounded-lg p-4 shadow-md">
                        <h3 className="text-lg font-semibold">{c?.fullName}</h3>
                        <p className="text-sm text-gray-400">
                            {c?.email} | {c?.phoneNumber}
                        </p>
                        <p className="mt-2">{c?.message}</p>
                        <p className="text-xs text-gray-500 mt-2">
                            Request Date: {new Date(c?.createdAt)?.toLocaleDateString("vi-VN")}
                        </p>

                        <div className="mt-4 flex gap-2">
                            {c?.status === "NEW" && (
                                <>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        size="small"
                                        onClick={() => updateStatus(c?.id)}>
                                        Accept
                                    </Button>
                                </>
                            )}
                            {c?.status === "DONE" && (
                                <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    onClick={() => deleteContact(c?.id)}>
                                    Delete
                                </Button>
                            )}
                        </div>
                    </motion.div>
                ))}
                <div className="flex justify-center mt-6">
                    <Pagination
                        page={params?.page + 1}
                        count={contacts?.totalPages || 1}
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
                        color="primary"
                        onChange={(_, value) =>
                            setParams((prev) => ({
                                ...prev,
                                page: value,
                            }))
                        }
                    />
                </div>
            </div>
            <Backdrop
                open={isLoading}
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 9999,
                    backgroundColor: "rgba(0,0,0,0.35)",
                }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
}
