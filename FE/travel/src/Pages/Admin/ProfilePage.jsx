import React, { useState, useEffect } from "react";
import { Avatar, Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getUserById, updateUser, userChangeAvatar } from "../../api/User";
import { MdOutlineCameraswitch } from "react-icons/md"

export default function ProfilePage() {
  const { id } = useParams();

  const { data: user, mutate } = useSWR(
    id ? ["/users", { id }] : null,
    ([_, params]) => getUserById(params)
  );

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    avatar_url: "",
    note: "",
  });

  // khi user load xong thì fill form
  useEffect(() => {
    if (user) {
      setForm({
        full_name: user.full_name || "",
        email: user.email || "",
        password: "",
        avatar_url: user.avatar_url || "",
        note: user.note || "",
      });
    }
  }, [user]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async() => {
    await updateUser(form);
    mutate(); 
  };

  const handleUpdateAvatar = async(file) => {
    await userChangeAvatar({file: file});
    mutate();
  }

  return (
    <div className="h-screen bg-black flex items-center justify-center p-6">
      <div className="bg-[#fff] rounded-xl shadow-lg w-full max-w-md p-8 overflow-y-scroll oveflow-x-hidden">
      {/* Avatar */}
        <div className="flex flex-col items-center relative">
        <div className="relative">
            <Avatar
            src={form?.avatar_url}
            alt={form?.full_name}
            sx={{ width: 100, height: 100 }}
            />
            {/* Icon camera overlay */}
            <label
            htmlFor="avatarUpload"
            className="absolute bottom-0 right-0 bg-black bg-opacity-60 rounded-full p-1 cursor-pointer"
            >
            <MdOutlineCameraswitch className="text-white text-xl" />
            </label>
            <input
            id="avatarUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
                const file = e.target.files[0];     
                    handleUpdateAvatar(file);
            }}
            />
        </div>
        <h2 className="text-white text-2xl font-semibold mt-4">
            {form?.full_name || "Your Name"}
        </h2>
        </div>

        {/* Form inputs */}
        <div className="mt-4 space-y-4">
          <TextField
            label="Full Name"
            name="full_name"
            value={form?.full_name}
            onChange={handleChange}
            fullWidth
    
  sx={{marginBottom: "0.5rem"}}
          />
          <TextField
            label="Email"
            name="email"
            value={form?.email}
            onChange={handleChange}
            fullWidth
          
   sx={{marginBottom: "0.5rem"}}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form?.password}
            onChange={handleChange}
            fullWidth
         
   sx={{marginBottom: "0.5rem"}}
          />
          <TextField
            label="Avatar URL"
            name="avatar_url"
            value={form?.avatar_url}
            onChange={handleChange}
            fullWidth
         
   sx={{marginBottom: "0.5rem"}}
          />
          <TextField
            label="Note"
            name="note"
            value={form?.note}
            onChange={handleChange}
            fullWidth
            multiline
        
   sx={{marginBottom: "0.5rem"}}
          />
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center">
          <Button
            variant="contained"
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
