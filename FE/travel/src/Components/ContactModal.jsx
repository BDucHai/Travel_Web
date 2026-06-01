import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  TextField,
  Box,
} from "@mui/material";

const ContactModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Contact Us</DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar alt="Phuong Hoang" src="/avatar.png" />
          <Box ml={2}>
            <p className="font-semibold">
              Hello I'm Phuong HOANG, your specialist.
            </p>
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
        />

        {/* Email + Name */}
        <TextField
          label="Your Email"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="Your Name"
          fullWidth
          variant="outlined"
          margin="normal"
        />

        {/* Submit button */}
        <div
          onClick={onClose}
          className="mt-4 w-full bg-blue-600 text-white text-center py-2 rounded cursor-pointer"
        >
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
