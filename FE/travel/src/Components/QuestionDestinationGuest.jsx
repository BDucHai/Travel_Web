import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";

export default function QuestionDestinationGuest() {
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    avatar_url: "",
    content: "",
  });
  const [replyText, setReplyText] = useState({});

  const handleSubmit = () => {
    if (!form?.name || !form?.email || !form?.content) return;
    const newQ = {
      id: Date.now(),
      name: form?.name,
      email: form?.email,
      avatar_url: form?.avatar_url,
      content: form?.content,
      created_at: new Date().toLocaleString(),
      replies: [],
    };
    setQuestions([newQ, ...questions]);
    setForm({ name: "", email: "", avatar_url: "", content: "" });
  };

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
                  author: "Khách",
                  type: "user",
                  content: replyText[qid],
                  created_at: new Date().toLocaleString(),
                },
              ],
            }
          : q
      )
    );
    setReplyText((prev) => ({ ...prev, [qid]: "" }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Form tạo question */}
      <Card className="mb-6">
        <CardContent className="space-y-4">
          <Typography variant="h6">Đăng câu hỏi</Typography>
          <TextField
            fullWidth
            label="Tên"
            value={form?.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            fullWidth
            label="Email"
            value={form?.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            fullWidth
            label="Avatar URL (tùy chọn)"
            value={form?.avatar_url}
            onChange={(e) => setForm({ ...form, avatar_url: e.target.value })}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Nội dung câu hỏi"
            value={form?.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Đăng
          </Button>
        </CardContent>
      </Card>

      {/* Danh sách question */}
      <div className="space-y-4">
        {questions.map((q) => (
          <Card key={q.id}>
            <CardHeader
              avatar={<Avatar src={q?.avatar_url}>{q?.name[0]}</Avatar>}
              title={q?.name}
              subheader={`${q?.email} • ${q?.created_at}`}
            />
            <CardContent>
              <Typography className="mb-4">{q?.content}</Typography>

              {/* Replies */}
              <div className="space-y-2">
                {q?.replies?.map((r) => (
                  <div
                    key={r?.id}
                    className="p-2 rounded bg-gray-200 text-gray-800"
                  >
                    <strong>{r.author}:</strong> {r?.content}
                    <div className="text-xs text-gray-500">{r?.created_at}</div>
                  </div>
                ))}
              </div>

              {/* Reply box */}
              <div className="mt-3 space-y-2">
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  value={replyText[q.id] || ""}
                  onChange={(e) =>
                    setReplyText((prev) => ({ ...prev, [q.id]: e.target.value }))
                  }
                  placeholder="Viết phản hồi..."
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleReplySubmit(q.id)}
                >
                  Gửi phản hồi
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
