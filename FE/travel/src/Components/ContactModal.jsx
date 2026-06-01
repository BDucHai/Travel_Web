import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Avatar, TextField, Box, IconButton } from "@mui/material";

import { IoIosCloseCircleOutline } from "react-icons/io";

const ContactModal = ({ open, onClose }) => {
    const [contactPlan, setContactPlan] = useState({
        name: "",
        email: "",
        phone: "",
        content: "",
    });

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ m: 0, p: 2 }}>
                Contact Us
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}>
                    <IoIosCloseCircleOutline />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <Box display="flex" alignItems="center" mb={2}>
                    <Avatar alt="Phuong Hoang" src="/avatar.png" />
                    <Box ml={2}>
                        <p className="font-semibold">Hello I'm Phuong HOANG, your specialist.</p>
                    </Box>
                </Box>

                {/* Multi-line content area */}
                <TextField
                    label="Your Content"
                    multiline
                    rows={5}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    onChange={(e) => setContactPlan((prev) => ({ ...prev, content: e.target.value }))}
                />

                {/* Email + Name + Phone */}
                <TextField
                    label="Your Email"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    onChange={(e) => setContactPlan((prev) => ({ ...prev, email: e.target.value }))}
                />
                <TextField
                    label="Your Name"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    onChange={(e) => setContactPlan((prev) => ({ ...prev, name: e.target.value }))}
                />
                <TextField
                    label="Your Phone"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    onChange={(e) => setContactPlan((prev) => ({ ...prev, phone: e.target.value }))}
                />

                {/* Submit button */}
                <div
                    onClick={onClose}
                    className="mt-4 w-full bg-blue-600 text-white text-center py-2 rounded cursor-pointer">
                    Submit
                </div>

                {/* Info text */}
                <p className="mt-2 text-sm text-gray-500">
                    Our information & quotes are free. Don’t hesitate to ask us!
                </p>
            </DialogContent>
        </Dialog>
    );
};

export default ContactModal;
