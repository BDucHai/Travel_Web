import React, { useState } from "react";
import { Tabs, Tab, Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import useSWR from "swr";
import {getContacts, deleteContacts, updateStatusContact} from "../../api/Contact"


const contacts = [
  {
    id: 1,
    full_name: "Nguyen Van A",
    email: "a@example.com",
    phone_number: "0123456789",
    message: "Xin chào, tôi cần hỗ trợ",
    status: 0,
    created_at: "2026-06-09",
  },
  {
    id: 2,
    full_name: "Tran Thi B",
    email: "b@example.com",
    phone_number: "0987654321",
    message: "Vui lòng gọi lại",
    status: 1,
    created_at: "2026-06-08",
  },
  {
    id: 3,
    full_name: "Tran Thi B",
    email: "b@example.com",
    phone_number: "0987654321",
    message: "Vui lòng gọi lại",
    status: 2,
    created_at: "2026-06-08",
  },
   {
    id: 4,
    full_name: "Tran Thi B",
    email: "b@example.com",
    phone_number: "0987654321",
    message: "Vui lòng gọi lại",
    status: 3,
    created_at: "2026-06-08",
  },
];



export default function Contact() {

  const statusTabs = [
  { label: "New", value: 0 },
  { label: "Processing", value: 1 },
  { label: "Done", value: 2 },
  { label: "Reject", value: 3 },
];

  const [tab, setTab] = useState(0);

  const { data, mutate } = useSWR(
    ["/contacts", { status: statusTabs[tab].value }],
    ([url, params]) => getContacts(url, params)
  );

  const handleChange = (_, newValue) => setTab(newValue);

 
  const updateStatus = async (id, newStatus) => {
      await updateStatusContact(id, newStatus);
      mutate(["/contacts", { status: statusTabs[tab].value }]);
  };

  const deleteContact = async (id) => {
    await deleteContacts(id);
    mutate(["/contacts", { status: statusTabs[tab].value }]);
  };


  return (
    <Box className="bg-[radial-gradient(circle,_#0e3637_0%,_#0d0d11ab_70%)] text-white min-h-screen p-6">
      <Tabs
        value={tab}
        onChange={handleChange}
        textColor="inherit"
        indicatorColor="secondary"
      >
        {statusTabs.map((s, idx) => (
          <Tab key={s.value} label={s.label} />
        ))}
      </Tabs>

      <div className="mt-6 space-y-4">
        {contacts?.map((c) => (
          <motion.div
            key={c?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-4 shadow-md"
          >
            <h3 className="text-lg font-semibold">{c?.full_name}</h3>
            <p className="text-sm text-gray-400">
              {c?.email} | {c?.phone_number}
            </p>
            <p className="mt-2">{c?.message}</p>
            <p className="text-xs text-gray-500 mt-2">
              Request Date: {c?.created_at}
            </p>

            <div className="mt-4 flex gap-2">
              {c?.status === 0 && (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => updateStatus(c?.id, 1)}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => updateStatus(c?.id, 3)}
                  >
                    Reject
                  </Button>
                </>
              )}
              {c?.status === 1 && (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => updateStatus(c?.id, 2)}
                  >
                    Done
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => updateStatus(c?.id, 3)}
                  >
                    Reject
                  </Button>
                </>
              )}
              {(c?.status === 2 || c?.status === 3) && (
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => deleteContact(c?.id)}
                >
                  Delete
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Box>
  );
}
