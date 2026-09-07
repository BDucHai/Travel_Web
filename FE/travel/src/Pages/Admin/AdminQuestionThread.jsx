import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  Chip,
  Tabs,
  Tab,
  Badge,
  Pagination,
} from "@mui/material";


const sampleQuestions = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "a@example.com",
    content: "Cho tôi hỏi về tour Đà Nẵng?",
    created_at: "2026-09-07",
    status: "pending",
    replies: [
      {
        id: 101,
        author: "Khách B",
        type: "user",
        content: "Tôi cũng quan tâm tour này.",
        created_at: "2026-09-07 10:00",
      },
    ],
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "b@example.com",
    content: "Có khuyến mãi gì cho tour Hạ Long không?",
    created_at: "2026-09-06",
    status: "answered",
    replies: [
      {
        id: 102,
        author: "Admin",
        type: "admin",
        content: "Hiện có giảm giá 20% cho đoàn từ 5 người.",
        created_at: "2026-09-06 12:00",
      },
    ],
  },
];

export default function AdminQuestionThread() {
  const [questions, setQuestions] = useState(sampleQuestions);
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [replyText, setReplyText] = useState({});

  const pendingCount = questions?.filter((q) => q?.status === "pending")?.length;

  const filtered = questions.filter((q) => {
    const matchSearch =
      q?.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
      q?.email?.toLowerCase()?.includes(search?.toLowerCase()) ||
      q?.content?.toLowerCase()?.includes(search?.toLowerCase());

    const matchTab =
      tab === 0
        ? true
        : tab === 1
        ? q?.status === "pending"
        : q?.status === "answered";

    return matchSearch && matchTab;
  });

  const paginated = filtered?.slice((page - 1) * pageSize, page * pageSize);

  const handleReplySubmit = (qid) => {
    if (!replyText[qid]?.trim()) return;
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qid
          ? {
              ...q,
              replies: [
                ...q.replies,
                {
                  id: Date.now(),
                  author: "Admin",
                  type: "admin",
                  content: replyText[qid],
                  created_at: new Date().toISOString(),
                },
              ],
              status: "answered",
            }
          : q
      )
    );
    setReplyText((prev) => ({ ...prev, [qid]: "" }));
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {/* Tabs with badge */}
      <Tabs
        value={tab}
        onChange={(_, v) => {
          setTab(v);
          setPage(1);
        }}
        textColor="inherit"
        indicatorColor="secondary"
      >
        <Tab label="All" />
        <Tab
          label={
            <Badge badgeContent={pendingCount} color="error">
              Pending
            </Badge>
          }
        />
        <Tab label="Answered" />
      </Tabs>

      {/* Search box */}
      <div className="mt-4">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name, email, or content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{ style: { color: "white" } }}
        />
      </div>

      {/* Question list */}
      <div className="mt-6 space-y-4">
        {paginated.map((q) => (
          <Card key={q?.id} className="bg-gray-800 text-white">
            <CardHeader
              avatar={<Avatar src={q?.avatar_url}>{q?.name[0]}</Avatar>}
              title={q?.name}
              subheader={`${q?.email} • ${q?.created_at}`}
              subheaderTypographyProps={{ style: { color: "#ccc" } }}
              action={
                <Chip
                  label={q?.status}
                  color={q?.status === "pending" ? "warning" : "success"}
                />
              }
            />
            <CardContent>
              <Typography className="mb-4">{q.content}</Typography>

              {/* Replies */}
              <div className="space-y-2">
                {q?.replies?.map((r) => (
                  <div
                    key={r?.id}
                    className={`p-2 rounded ${
                      r?.type === "admin"
                        ? "bg-blue-900 text-blue-100"
                        : "bg-gray-700 text-gray-200"
                    }`}
                  >
                    <strong>{r?.author}:</strong> {r?.content}
                    <div className="text-xs text-gray-400">{r?.created_at}</div>
                  </div>
                ))}
              </div>

              {/* Admin reply box */}
              <div className="mt-3 space-y-2">
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  value={replyText[q?.id] || ""}
                  onChange={(e) =>
                    setReplyText((prev) => ({ ...prev, [q.id]: e.target.value }))
                  }
                  placeholder="Nhập câu trả lời..."
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleReplySubmit(q.id)}
                >
                  Gửi trả lời
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination
          count={Math.ceil(filtered.length / pageSize)}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="secondary"
        />
      </div>
    </div>
  );
}