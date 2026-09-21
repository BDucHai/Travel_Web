import React, { useState } from "react";
import useSWR from "swr";
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
    Backdrop,
    CircularProgress,
} from "@mui/material";
import { createQuestionReply, deleteQuestion, deleteReply, getQuestionsAdmin } from "../../api/Question";

export default function AdminQuestionThread() {
    const [tab, setTab] = useState(0);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const [replyText, setReplyText] = useState({});
    const [loading, setLoading] = useState(false);

    const { data: questions, mutate } = useSWR(
        tab === 0 ? "/questions" : `/questions/status/${tab === 1 ? "pending" : "answered"}`,
        getQuestionsAdmin,
    );

    const pendingCount = questions?.filter((q) => q.status === "pending")?.length || 0;

    const filtered = (questions || []).filter((q) => {
        const matchSearch =
            q?.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
            q?.email?.toLowerCase()?.includes(search?.toLowerCase()) ||
            q?.content?.toLowerCase()?.includes(search?.toLowerCase());
        return matchSearch;
    });

    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

    const handleReplySubmit = async (qid) => {
        if (!replyText[qid]?.trim()) return;
        setLoading(true);
        await createQuestionReply({
            data: {
                name: "Reves Indochine - Local Expert",
                email: "reves.indochine@gmail.com",
                avatarUrl: "https://res.cloudinary.com/ds7h9l4xo/image/upload/v1782132529/logo_ekf3vo.png",
                content: replyText[qid],
            },
            qid: qid,
        });
        setReplyText((prev) => ({ ...prev, [qid]: "" }));
        mutate();
        setLoading(false);
    };

    const handleDeleteQuestion = async (id) => {
        setLoading(true);
        await deleteQuestion(id);
        await mutate();
        setLoading(false);
    };

    const handleDeleteReply = async (id) => {
        setLoading(true);
        await deleteReply(id);
        await mutate();
        setLoading(false);
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
                indicatorColor="secondary">
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
                            avatar={<Avatar src={q?.avatarUrl}>{q.name[0]}</Avatar>}
                            title={q?.name}
                            subheader={`${q?.email} • ${new Date(q?.createdAt)?.toLocaleString("vi-VN")}`}
                            subheaderTypographyProps={{ style: { color: "#141414" } }}
                            action={
                                <div className="flex items-center gap-2">
                                    <Chip label={q?.status} color={q.status === "pending" ? "warning" : "success"} />
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDeleteQuestion(q?.id)}>
                                        Delete
                                    </Button>
                                </div>
                            }
                        />
                        <CardContent>
                            <Typography className="mb-4">{q.content}</Typography>

                            {/* Replies */}
                            <div className="space-y-2">
                                {q?.replies?.map((r) => (
                                    <div
                                        key={r?.id}
                                        className={`p-2 rounded flex justify-between ${
                                            r?.type === "admin"
                                                ? "bg-blue-900 text-blue-100"
                                                : "bg-gray-700 text-gray-200"
                                        }`}>
                                        <div>
                                            <strong>{r?.name}:</strong> {r?.content}
                                            <div className="text-xs text-gray-200">
                                                {new Date(r?.createdAt)?.toLocaleString("vi-VN")}
                                            </div>
                                        </div>
                                        <div>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                color="error"
                                                onClick={() => handleDeleteReply(r?.id)}
                                                sx={{
                                                    minWidth: "auto",
                                                    height: "30px",
                                                    alignSelf: "center",
                                                    background: "#fff",
                                                }}>
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Admin reply box */}
                            <div className="mt-3 space-y-2">
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={2}
                                    value={replyText[q.id] || ""}
                                    onChange={(e) => setReplyText((prev) => ({ ...prev, [q.id]: e.target.value }))}
                                    placeholder="Nhập câu trả lời..."
                                />
                                <Button
                                    sx={{ marginTop: "4px" }}
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleReplySubmit(q.id)}>
                                    Send reply
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

            <Backdrop open={loading} sx={{ color: "#fff", zIndex: 9999, backgroundColor: "rgba(0,0,0,0.35)" }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
