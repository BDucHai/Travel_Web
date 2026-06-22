import React, { useState } from "react";
import {
    Box,
    Button,
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControlLabel,
    Checkbox,
    Select,
    MenuItem,
    Backdrop,
    CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { CiUnlock, CiLock } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { createUser, deleteUser, getUsers, lockUnlockUser } from "../../api/User";
import useSWR from "swr";
import Pagination from "@mui/material/Pagination";
import { uploadImage } from "../../utils/uploadImage";

export default function UserManagePage() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState({
        page: 0,
        limit: 20,
    });

    const [form, setForm] = useState({
        full_name: "",
        username: "",
        password: "",
        email: "",
        phone: "",
        avatar_url: "",
        is_active: true,
        roles: "USER",
        note: "",
    });

    const { data: users, mutate } = useSWR("/auth/users", getUsers);


    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        setLoading(true);
        const newUser = await createUser({
            username: form?.username,
            fullName: form?.full_name,
            email: form?.email,
            phone: form?.phone,
            password: form?.password,
            avatarUrl: form?.avatar_url,
            isActive: form?.is_active,
            roleId: form?.roles === "ROLE_ADMIN"? 1: 2,
            // note: form?.note,
        });
        if (newUser?.username) {
            mutate();
            setOpen(false);
            setForm({
                full_name: "",
                username: "",
                password: "",
                avatar_url: "",
                is_active: true,
                roles: "USER",
                note: "",
            });
        }
        setLoading(false);
    };

    const handleAvatarUpload = async (e) => {
        setLoading(true);
        const file = e.target.files?.[0];

        if (!file) return;

        try {
            const res = await uploadImage(file);

            setForm((prev) => ({
                ...prev,
                avatar_url: res.url,
            }));
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        setLoading(true);
        await deleteUser(id);
        mutate();
        setLoading(false);
    };

    const toggleActive = async ({ id, status }) => {
        await lockUnlockUser({ id, status });
        mutate();
    };

    return (
        <Box className="bg-gray-900 text-gray-100 min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-6">User Management</h1>

            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                Add User
            </Button>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {(users)?.map((u) => (
                    <motion.div
                        key={u?.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-800 rounded-lg p-4 shadow-md flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar src={u?.avatar_url} alt={u?.full_name} />
                            <div>
                                <h3 className="font-semibold">{u?.full_name}</h3>
                                <p className="text-sm text-gray-400">{u?.username}</p>
                                <p className="text-sm">
                                    Role: <span className="font-medium">{u?.roles}</span>
                                </p>
                                <p className="text-xs text-gray-500">{u?.is_active ? "Active" : "Inactive"}</p>
                                <p className="text-xs text-gray-400">Note: {u?.note}</p>
                            </div>
                        </div>
                        <div className="flex gap-3 text-xl cursor-pointer">
                            {u?.is_active ? (
                                <CiLock
                                    onClick={() => toggleActive({ id: u?.id, status: 0 })}
                                    className="text-green-400 hover:text-green-600"
                                />
                            ) : (
                                <CiUnlock
                                    onClick={() => toggleActive({ id: u?.id, status: 1 })}
                                    className="text-yellow-400 hover:text-yellow-600"
                                />
                            )}
                            <MdDelete onClick={() => handleDelete(u?.id)} className="text-red-400 hover:text-red-600" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
                <Pagination
                    count={users?.data?.totalPage}
                    page={params?.page}
                    onChange={(e, value) => setParams({ ...params, page: value })}
                    sx={{
                        "& .MuiPaginationItem-root": {
                            color: "#fff",
                        },
                        "& .MuiPaginationItem-root.Mui-selected": {
                            backgroundColor: "#1976d2",
                            color: "#fff",
                        },
                    }}
                />
            </div>

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <DialogTitle>Add New User</DialogTitle>
                <DialogContent className="space-y-4 overflow-scroll">
                    <TextField
                        label="Full Name"
                        name="full_name"
                        value={form?.full_name}
                        onChange={handleChange}
                        fullWidth
                        sx={{ marginBottom: "1rem" }}
                    />
                    <TextField
                        label="Username"
                        name="username"
                        value={form?.username}
                        onChange={handleChange}
                        fullWidth
                        sx={{ marginBottom: "1rem" }}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={form?.password}
                        onChange={handleChange}
                        fullWidth
                        sx={{ marginBottom: "1rem" }}
                    />
                    <TextField
                        type="file"
                        fullWidth
                        inputProps={{ accept: "image/*" }}
                        onChange={handleAvatarUpload}
                        sx={{ mb: 2 }}
                    />
                    {form?.avatar_url && <img src={form.avatar_url} alt="" width={100} />}
                    <TextField
                        label="Email"
                        name="email"
                        value={form?.email}
                        onChange={handleChange}
                        fullWidth
                        sx={{ marginBottom: "1rem" }}
                    />
                    <TextField
                        label="phone"
                        name="phone"
                        value={form?.phone}
                        onChange={handleChange}
                        fullWidth
                        sx={{ marginBottom: "1rem" }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={form?.is_active}
                                onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                            />
                        }
                        label="Active"
                    />
                    <Select name="roles" value={form?.roles} onChange={handleChange} fullWidth>
                        <MenuItem value="USER">User</MenuItem>
                        <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <Backdrop
                open={loading}
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
