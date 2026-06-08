import { Dialog } from "@mui/material";

export default function ImagePreviewDialog({ open, onClose, src }) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md">
            <div className="bg-black flex items-center justify-center">
                <img src={src} alt="preview" className="max-h-[80vh] object-contain" />
            </div>
        </Dialog>
    );
}
