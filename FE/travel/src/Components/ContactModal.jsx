import {useState}, React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  TextField,
  Box,
} from "@mui/material";

const ContactModal = ({ open, onClose }) => {
  const [contactPlan, setContactPlan] = useState({
    name: "",
    email: "",
    phone: "",
    content: "",
  })
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
         onChange={(e) => {
            setContactPlan((prev) => ({ ...prev, content: e.target.value }));
          }}
          margin="normal"
        />

        {/* Email + Name */}
        <TextField
          label="Your Email"
          fullWidth
          variant="outlined"
          margin="normal"
          onChange={(e) => {
            setContactPlan((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
        <TextField
          label="Your Name"
          fullWidth
          variant="outlined"
          margin="normal"
          onChange={(e) => {
            setContactPlan((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
        <TextField
          label="Your phone"
          fullWidth
          variant="outlined"
          margin="normal"
          onChange={(e) => {
            setContactPlan((prev) => ({ ...prev, phone: e.target.value }));
          }}
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
