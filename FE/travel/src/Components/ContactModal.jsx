import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Avatar,
    TextField,
    Box,
    IconButton,
    Backdrop,
    CircularProgress,
} from "@mui/material";

import { IoIosCloseCircleOutline } from "react-icons/io";
import { createContacts } from "../api/Contact";

const ContactModal = ({ t, open, onClose, content = "" }) => {
    const [loading, setLoading] = useState(false);
    const [contactPlan, setContactPlan] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        message: content || "",
    });

    const handleCreateRequest = async () => {
        setLoading(true);
        const res = await createContacts(contactPlan);
        if (res?.status === 200) {
            onClose();
        }
        setLoading(false);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ m: 0, p: 2 }}>
                {t("contact_us")}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: "#000",
                    }}>
                    <IoIosCloseCircleOutline />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        mb: 2,
                    }}>
                    <Avatar alt="Phuong Hoang" src="/avatar.png" />

                    <Box sx={{ marginLeft: "1rem" }}>
                        <p className="font-semibold">Hello I'm Phuong HOANG, your specialist.</p>
                    </Box>
                </Box>

                {/* Multi-line content area */}
                <TextField
                    label={t("your_request")}
                    multiline
                    rows={5}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    onChange={(e) => setContactPlan((prev) => ({ ...prev, message: e.target.value }))}
                />

                {/* Email + Name + Phone */}
                <TextField
                    label={t("your_email")}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    onChange={(e) => setContactPlan((prev) => ({ ...prev, email: e.target.value }))}
                />
                <TextField
                    label={t("your_name")}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    onChange={(e) => setContactPlan((prev) => ({ ...prev, fullName: e.target.value }))}
                />
                <TextField
                    label={t("your_phone")}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    onChange={(e) => setContactPlan((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                />

                {/* Submit button */}
                <div
                    onClick={handleCreateRequest}
                    className="mt-4 w-full bg-blue-600 text-white text-center py-2 rounded cursor-pointer">
                    {t("send")}
                </div>

                {/* Info text */}
                <p className="mb-2 mt-4 text-sm text-gray-500 text-center">
                    Our information & quotes are free. Don’t hesitate to ask us!
                </p>
            </DialogContent>
            <Backdrop
                open={loading}
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 9999,
                    backgroundColor: "rgba(0,0,0,0.35)",
                }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Dialog>
    );
};

export default ContactModal;
