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
} from "@mui/material";
import { motion } from "framer-motion";
import { CiUnlock, CiLock } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { createUser, deleteUser, getUsers, lockUnlockUser } from "../../api/User";
import useSWR from "swr";
import Pagination from "@mui/material/Pagination";

export default function UserManagePage() {
  const [open, setOpen] = useState(false);

  const [params, setParams] = useState({
    page: 1,
    limit: 20, 
  });

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    avatar_url: "",
    is_active: true,
    roles: "user",
    note: "",
  });

  const { data: users, mutate } = useSWR(
    ["/users", params],
    ([_, params]) => getUsers(params)
  );

  const userFake = [
  {
    id: 1,
    full_name: "Nguyen Van A",
    email: "a@example.com",
    avatar_url: "https://i.pravatar.cc/100?img=1",
    is_active: true,
    roles: "admin",
  },
  {
    id: 2,
    full_name: "Tran Thi B",
    email: "b@example.com",
    avatar_url: "https://i.pravatar.cc/100?img=2",
    is_active: false,
    roles: "user",
  },
];

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const newUser = await createUser(form);
    if (newUser?.status === 200) {
      mutate();
      setOpen(false);
      setForm({
        full_name: "",
        email: "",
        password: "",
        avatar_url: "",
        is_active: true,
        roles: "user",
        note: "",
      });
    }
  };

  const handleDelete = async(id) => {
    await deleteUser(id);
    mutate();
  };

  const toggleActive = async({id, status}) => {
    await lockUnlockUser({id, status});
    mutate();
  };

  return (
    <Box className="bg-gray-900 text-gray-100 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
      >
        Add User
      </Button>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {(users || userFake)?.map((u) => (
          <motion.div
            key={u?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-4 shadow-md flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Avatar src={u?.avatar_url} alt={u?.full_name} />
              <div>
                <h3 className="font-semibold">{u?.full_name}</h3>
                <p className="text-sm text-gray-400">{u?.email}</p>
                <p className="text-sm">
                  Role: <span className="font-medium">{u?.roles}</span>
                </p>
                <p className="text-xs text-gray-500">
                  {u?.is_active ? "Active" : "Inactive"}
                </p>
                <p className="text-xs text-gray-400">Note: {u?.note}</p>
              </div>
            </div>
            <div className="flex gap-3 text-xl cursor-pointer">
              {u?.is_active ? (
                <CiLock
                  onClick={() => toggleActive({id: u?.id, status: 0})}
                  className="text-green-400 hover:text-green-600"
                />
              ) : (
                <CiUnlock
                  onClick={() => toggleActive({id: u?.id, status: 1})}
                  className="text-yellow-400 hover:text-yellow-600"
                />
              )}
              <MdDelete
                onClick={() => handleDelete(u?.id)}
                className="text-red-400 hover:text-red-600"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination
          count={users?.data?.totalPage || 3}
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
            label="Email"
            name="email"
            value={form?.email}
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
            label="Avatar URL"
            name="avatar_url"
            value={form?.avatar_url}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Note"
            name="note"
            value={form?.note}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: "1rem" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form?.is_active}
                onChange={(e) =>
                  setForm({ ...form, is_active: e.target.checked })
                }
              />
            }
            label="Active"
          />
          <Select
            name="roles"
            value={form?.roles}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
