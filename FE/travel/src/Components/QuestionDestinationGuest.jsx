import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Pagination,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import useSWR from "swr";
import {
  createQuestion,
  createQuestionReply,
  getQuestions,
} from "../api/Question";
import { uploadImage } from "../utils/uploadImage";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function QuestionDestinationGuest({ destId }) {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const { data: questions, mutate } = useSWR(
    destId ? [`/questions/destination/${destId}`, destId] : null,
    ([_, destId]) => getQuestions(destId)
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    avatarFile: null,
    avatarUrl: "",
    content: "",
  });

  const [replyText, setReplyText] = useState({});
  const [activeReply, setActiveReply] = useState(null);
  const [loadingQues, setLoadingQues] = useState(false)


  //  SUBMIT QUESTION 
  const handleSubmit = async () => {
    if (!form.name || !form.content) {
      toast.error(t("fill_info"));
      return false;
    }
              setLoadingQues(true);
    try {
      
      let avatarUrl = form.avatarUrl;
      if (form.avatarFile) {
        const { url } = await uploadImage(form.avatarFile);
        avatarUrl = url;
      }

      await createQuestion({
        data: {
          name: form.name,
          email: form.email,
          avatarUrl,
          content: form.content,
          createdAt: new Date().toISOString()
        },
        destId,
      });

      // Reset form
      setForm({
        name: "",
        email: "",
        avatarFile: null,
        avatarUrl: "",
        content: "",
      });

      mutate();
      setLoadingQues(true);
      return true;
    } catch (error) {
      toast.error(t("question.submit_error"));
      setLoadingQues(true);
      return false;
    }
  };

  //SUBMIT REPLY
  const handleReplySubmit = async (qid) => {
    setLoadingQues(true);
    if (!replyText[qid]?.trim()) {
      toast.error(t("question.empty_reply"));
      return false;
    }

    try {
      let avatarUrl = form.avatarUrl;

      if (form.avatarFile) {
        const { url } = await uploadImage(form.avatarFile);
        avatarUrl = url;
      }

      await createQuestionReply({
        data: {
          name: form.name?.trim() || "Guest",
          avatarUrl,
          content: replyText[qid].trim(),
        },
        qid,
      });

      setReplyText((prev) => ({
        ...prev,
        [qid]: "",
      }));

      await mutate();
      setLoadingQues(false)
      return true;
    } catch (error) {
      toast.error(t("question.reply_error"));
      setLoadingQues(false)
      return false;
    }
  };

  const paginatedQuestions = questions?.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="p-6 bg-[#cce1df4d] rounded-[4px] min-h-screen">
      <Card className="mb-6 shadow-md" sx={{ backgroundColor: "#fff" }}>
        <CardContent className="space-y-4">
          <Typography variant="h6" color="primary">
            {t("question.ask_question")}
          </Typography>

          <div className="flex gap-4">
            <TextField
              fullWidth
              size="small"
              label={t("your_name")}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="flex-1"
            />
            <TextField
              fullWidth
              size="small"
              label={t("your_email")}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="flex-1"
            />
            <div className="hidden md:block flex-1 flex items-center gap-2">
              <Button variant="outlined" component="label" size="small" className="w-full md:w-auto">
                {t("upload_avatar")}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setForm({ ...form, avatarFile: file });
                  }}
                />
              </Button>
              {form.avatarFile && (
                <Avatar
                  src={URL.createObjectURL(form.avatarFile)}
                  alt="avatar preview"
                  sx={{ width: 40, height: 40 }}
                />
              )}
            </div>
          </div>

          <div className="block md:hidden flex-1 flex items-center gap-2">
            <Button variant="outlined" component="label" size="small" className="w-full md:w-auto">
              {t("upload_avatar")}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) setForm({ ...form, avatarFile: file });
                }}
              />
            </Button>
            {form.avatarFile && (
              <Avatar
                src={URL.createObjectURL(form.avatarFile)}
                alt="avatar preview"
                sx={{ width: 40, height: 40 }}
              />
            )}
          </div>

          {/* Hàng 3: Nội dung */}
          <TextField
            fullWidth
            size="small"
            multiline
            rows={3}
            label={t("question.your_question")}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />

          <Button variant="contained" sx={{ marginTop: "4px" }} color="primary" onClick={handleSubmit}>
            {t("question.submit")}
          </Button>
        </CardContent>
      </Card>

      {/* Danh sách question */}
      <div className="space-y-5">
        {paginatedQuestions?.map((q) => (
          <Card
            key={q.id}
            className="shadow-sm overflow-hidden"
            sx={{
              backgroundColor: "#fbfbf9",
              borderRadius: "10px",
            }}
          >
            <CardContent className="!p-4 md:!p-5">
              <div className="flex gap-3">
                {/*QUESTION AVATAR */}
                <Avatar
                  src={q?.avatarUrl}
                  sx={{
                    width: 40,
                    height: 40,
                    flexShrink: 0,
                  }}
                >
                  {q?.name?.charAt(0).toUpperCase()}
                </Avatar>

                <div className="flex-1 min-w-0">
                  {/*  QUESTION HEADER  */}
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold md:text-[1.1rem]">
                      {q?.name}
                    </span>

                    <span className="text-gray-600">
                      {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(new Date(q?.createdAt))}
                    </span>
                  </div>

                  {/* QUESTION CONTENT */}
                  <p className="text-[#000] leading-6">
                    {q?.content}
                  </p>

                  {/*  REPLIES  */}
                  {q?.replies?.length > 0 && (
                    <div className="mt-4 ml-1 pl-4 border-l-2 border-[#dce7e3] space-y-3">
                      {q.replies.map((r) => (
                        <div
                          key={r?.id}
                          className="bg-white rounded-lg px-4 py-3 border border-gray-100"
                        >
                          <div className="flex gap-3">
                            {/* Reply avatar */}
                            <Avatar
                              src={r?.avatarUrl}
                              sx={{
                                width: 34,
                                height: 34,
                                flexShrink: 0,
                              }}
                            >
                              {r?.name?.charAt(0).toUpperCase()}
                            </Avatar>

                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className="font-semibold text-[#345f5b]">
                                  {r?.name}
                                </span>


                                <span className="text-[0.9rem] text-gray-600">
                                  {new Intl.DateTimeFormat("en-US", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                  }).format(new Date(r?.createdAt))}
                                </span>
                              </div>

                              <p className=" leading-6">
                                {r?.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/*  REPLY BUTTON  */}
                  <div className="flex justify-end mt-3">
                    <Button
                      variant="text"
                      size="medium"
                      onClick={() =>
                        setActiveReply((prev) =>
                          prev === q.id ? null : q.id
                        )
                      }
                      sx={{
                        textTransform: "none",
                        color: "#557a75",
                        fontSize: "0.85rem",
                        minWidth: "auto",
                        padding: "3px 6px",
                        "&:hover": {
                          backgroundColor: "#e9f1ef",
                        },
                      }}
                    >
                      {activeReply === q.id
                        ? t("cancel")
                        : t("reply")}
                    </Button>
                  </div>

                  {/*  REPLY FORM  */}
                  {activeReply === q.id && (
                    <div className="mt-2 ml-1 pl-4 border-l-2 border-dashed border-[#dce7e3]">
                      <div className="bg-[#f8faf9] rounded-lg p-4 border border-[#e5ece9]">
                        {/* Form title */}
                        <div className="mb-3">
                          <div className="font-semibold">
                            {t("reply")}
                          </div>

                          <p className="text-gray-800 mt-[0.15rem]">
                            {t("question.write_question")}
                          </p>
                        </div>

                        {/* Name + avatar */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <TextField
                            size="small"
                            label={t("your_name")}
                            value={form?.name || ""}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                name: e.target.value,
                              })
                            }
                            sx={{
                              backgroundColor: "#fff",
                            }}
                          />

                          <Button
                            variant="outlined"
                            component="label"
                            size="small"
                            sx={{
                              textTransform: "none",
                            }}
                          >
                            {t("upload_avatar")}

                            <input
                              type="file"
                              hidden
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];

                                if (file) {
                                  setForm({
                                    ...form,
                                    avatarFile: file,
                                  });
                                }
                              }}
                            />
                          </Button>

                          {form?.avatarFile && (
                            <Avatar
                              src={URL.createObjectURL(form.avatarFile)}
                              alt="avatar preview"
                              sx={{
                                width: 32,
                                height: 32,
                              }}
                            />
                          )}
                        </div>

                        {/* Reply content */}
                        <TextField
                          fullWidth
                          size="small"
                          multiline
                          rows={3}
                          value={replyText[q.id] || ""}
                          onChange={(e) =>
                            setReplyText((prev) => ({
                              ...prev,
                              [q.id]: e.target.value,
                            }))
                          }
                          placeholder={t("question.type_question")}
                          sx={{
                            backgroundColor: "#fff",
                          }}
                        />

                        {/* Buttons */}
                        <div className="flex justify-end gap-2 mt-3">
                          <Button
                            variant="text"
                            size="small"
                            onClick={() => setActiveReply(null)}
                            sx={{
                              textTransform: "none",
                              color: "#777",
                            }}
                          >
                            {t("cancel")}
                          </Button>

                          <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={async () => {
                              await handleReplySubmit(q.id);
                              setActiveReply(null);
                            }}
                            sx={{
                              textTransform: "none",
                              px: 2.5,
                            }}
                          >
                            {t("send")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {questions && questions.length > pageSize && (
        <div className="flex justify-center mt-6">
          <Pagination
            count={Math.ceil(questions.length / pageSize)}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </div>
      )}

      {/* Loading */}
      <Backdrop open={loadingQues} sx={{ color: "#fff", zIndex: 9999, backgroundColor: "rgba(0,0,0,0.35)" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
