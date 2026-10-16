
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import useSWR from "swr";
import { getBlogById } from "../api/Blog";
import RelatedTours from "../Components/RelatedTours";
import BlogContentViewer from "../Components/BlogContentViewer";
import {
    Backdrop,
    CircularProgress,
    Typography,
} from "@mui/material";
import ContactModalFrm from "../Components/ContactModalFrm";
import { createContacts } from "../api/Contact";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";

const BlogDetail = () => {
    const { slug } = useParams();
    const { t } = useTranslation();
    const { lang, setNotiContact } = useAuth();
    const navigate = useNavigate();

    const [openContactModal, setOpenContactModal] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const [request, setRequest] = useState({
        name: "",
        email: "",
        phone: "",
        question: "",
    });

    const { data: blog, isLoading } = useSWR(
        slug ? ["/blogs/detail", { slug, lang }] : null,
        ([_, params]) => getBlogById(params),
    );

    const handleChangeValueRequest = (e) => {
        const { name, value } = e.target;

        setRequest((prev) => ({
            ...prev,
            [name]: value,
        }));

        setSubmitError(false);
    };

    const handleSendRequest = async (e) => {
        e.preventDefault();

        if (isSending) return;

        setIsSending(true);
        setSubmitError(false);

        try {
            await createContacts({
                fullName: request?.name,
                email: request?.email,
                phoneNumber: request?.phone,
                message: request?.question,
                nationality: "None",
                contactMethod: "email",
                hearFrom: "None",
            });

            setNotiContact(true);

            setRequest({
                name: "",
                email: "",
                phone: "",
                question: "",
            });
        } catch (error) {
            setSubmitError(true);
        } finally {
            setIsSending(false);
        }
    };

    const publishedDate = blog?.publishedAt
        ? new Date(blog.publishedAt).toLocaleDateString(
              lang === "fr" ? "fr-FR" : "en-GB",
              {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
              },
          )
        : "";

    const inputClass =
        "w-full rounded-xl border border-[#e4d8c9] bg-white px-4 py-3.5 text-sm text-[#183b36] placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-[#c47a32] focus:ring-4 focus:ring-[#e38c2b]/10";

    return (
        <div className="min-h-screen bg-[#fffdf9] text-[#183b36]">
            {/* HERO */}
            <section className="relative isolate min-h-[380px] overflow-hidden bg-[#183b36] md:min-h-[480px] lg:min-h-[580px]">
                {blog?.heroImageUrl && (
                    <img
                        src={blog.heroImageUrl}
                        alt={blog?.title || "Travel article"}
                        fetchPriority="high"
                        className="absolute inset-0 -z-20 h-full w-full object-cover"
                    />
                )}

                {/* Layer overlays */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#101b18]/95 via-[#101b18]/35 to-black/10" />

                <div className="mx-auto flex min-h-[380px] max-w-[1400px] flex-col justify-end px-5 pb-10 pt-24 md:min-h-[480px] md:px-10 md:pb-14 lg:min-h-[580px] lg:px-16 lg:pb-20">
                    {/* Category label */}
                    <div className="mb-5 flex items-center gap-3">
                        <span className="h-px w-9 bg-[#e38c2b]" />
                        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f3c18a] md:text-sm">
                            {t("blog")}
                        </span>
                    </div>

                    <h1 className="max-w-4xl text-xl font-bold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
                        {blog?.title}
                    </h1>

                    <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/80">
                        {publishedDate && (
                            <div className="flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="17"
                                    height="17"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect
                                        x="3"
                                        y="5"
                                        width="18"
                                        height="16"
                                        rx="2"
                                    />
                                    <path d="M16 3v4M8 3v4M3 11h18" />
                                </svg>
                                <span>{publishedDate}</span>
                            </div>
                        )}

                        <span className="h-1 w-1 rounded-full bg-[#e38c2b]" />

                        <div className="flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                            <span>{blog?.viewCount ?? 0} views</span>
                        </div>
                    </div>

                    <div className="mt-8 h-1 w-20 rounded-full bg-[#e38c2b]" />
                </div>
            </section>

            {/* BREADCRUMB */}
            <div className="border-b border-[#eadfd2] bg-white">
                <div className="mx-auto max-w-[1400px] px-5 py-4 md:px-10 lg:px-16">
                    <Breadcrumbs
                        separator={
                            <NavigateNextIcon
                                fontSize="small"
                                sx={{ color: "#c47a32" }}
                            />
                        }
                        aria-label="breadcrumb"
                        sx={{
                            "& .MuiBreadcrumbs-ol": {
                                flexWrap: "wrap",
                                rowGap: "6px",
                            },
                        }}
                    >
                        <Link
                            underline="hover"
                            color="inherit"
                            component="button"
                            onClick={() => navigate("/")}
                            sx={{
                                fontSize: "0.875rem",
                                fontWeight: 500,
                                color: "#6b7280",
                                cursor: "pointer",
                                "&:hover": { color: "#c47a32" },
                            }}
                        >
                            {t("home")}
                        </Link>

                        <Link
                            underline="hover"
                            color="inherit"
                            component="button"
                            onClick={() => navigate("/blog")}
                            sx={{
                                fontSize: "0.875rem",
                                fontWeight: 500,
                                color: "#6b7280",
                                cursor: "pointer",
                                "&:hover": { color: "#c47a32" },
                            }}
                        >
                            {t("blog")}
                        </Link>

                        <Typography
                            sx={{
                                fontSize: "0.875rem",
                                fontWeight: 600,
                                color: "#183b36",
                                maxWidth: { xs: "180px", md: "500px" },
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {blog?.title}
                        </Typography>
                    </Breadcrumbs>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <main className="bg-[#fffdf9]">
                <div className="mx-auto px-4 pt-4 pb-12 md:px-10 md:py-16 lg:px-16 lg:pb-20">
                    {/* ARTICLE */}
                    <article className="mx-auto">
                        <div className="rounded-2xl border border-[#eee5da] bg-white p-4 shadow-[0_8px_35px_rgba(55,40,20,0.04)] md:rounded-3xl md:p-8 lg:p-12">
                            <BlogContentViewer content={blog?.content} />
                        </div>
                    </article>

                    {/* CONTACT FORM */}
                    <section className="relative mt-16 overflow-hidden rounded-3xl bg-[#183b36] md:mt-24">
                        {/* Decorative circles */}
                        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/10" />
                        <div className="pointer-events-none absolute -right-8 -top-12 h-48 w-48 rounded-full border border-white/10" />
                        <div className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-[#e38c2b]/10 blur-3xl" />

                        <div className="relative grid grid-cols-1 gap-10 p-6 md:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:p-14">
                            {/* Intro */}
                            <div className="flex flex-col justify-center">
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="h-px w-9 bg-[#e38c2b]" />
                                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f3c18a]">
                                        {t("blog")}
                                    </span>
                                </div>

                                <h2 className="max-w-md font-serif text-3xl font-bold leading-tight text-white md:text-4xl">
                                    {t("need_help_plan")}
                                </h2>

                                <p className="mt-5 max-w-md text-sm leading-7 text-white/70 md:text-base">
                                    {t("travel_help")}
                                </p>

                                <div className="mt-8 flex items-center gap-4 border-t border-white/15 pt-6">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#f3c18a]">
                                        <CgMail size={25} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">
                                            {t("send_inquiry")}
                                        </p>
                                        <p className="mt-1 text-xs text-white/60">
                                            We would love to hear from you.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Form */}
                            <form
                                onSubmit={handleSendRequest}
                                className="rounded-2xl bg-[#fffdf9] p-5 shadow-xl md:p-8"
                            >
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-[#183b36]">
                                        {t("send_inquiry")}
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Share your questions with our team.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="blog-contact-name"
                                            className="mb-2 block text-sm font-semibold text-[#183b36]"
                                        >
                                            {t("your_name")}
                                        </label>
                                        <input
                                            id="blog-contact-name"
                                            type="text"
                                            placeholder={t("your_name")}
                                            className={inputClass}
                                            name="name"
                                            value={request.name}
                                            onChange={handleChangeValueRequest}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="blog-contact-email"
                                            className="mb-2 block text-sm font-semibold text-[#183b36]"
                                        >
                                            {t("your_email")}
                                        </label>
                                        <input
                                            id="blog-contact-email"
                                            type="email"
                                            placeholder={t("your_email")}
                                            className={inputClass}
                                            name="email"
                                            value={request.email}
                                            onChange={handleChangeValueRequest}
                                            required
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="blog-contact-phone"
                                            className="mb-2 block text-sm font-semibold text-[#183b36]"
                                        >
                                            {t("what_app")}
                                        </label>
                                        <input
                                            id="blog-contact-phone"
                                            type="tel"
                                            placeholder={t("what_app")}
                                            className={inputClass}
                                            name="phone"
                                            value={request.phone}
                                            onChange={handleChangeValueRequest}
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="blog-contact-question"
                                            className="mb-2 block text-sm font-semibold text-[#183b36]"
                                        >
                                            {t("your_question")}
                                        </label>
                                        <textarea
                                            id="blog-contact-question"
                                            rows={4}
                                            placeholder={t("your_question")}
                                            className={`${inputClass} resize-y`}
                                            name="question"
                                            value={request.question}
                                            onChange={handleChangeValueRequest}
                                            required
                                        />
                                    </div>
                                </div>

                                {submitError && (
                                    <p
                                        role="alert"
                                        className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
                                    >
                                        Something went wrong. Please try again.
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSending}
                                    className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#e38c2b] px-6 py-4 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:bg-[#c47a32] hover:shadow-lg hover:shadow-[#e38c2b]/20 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                                >
                                    {isSending && (
                                        <CircularProgress
                                            size={17}
                                            sx={{ color: "white" }}
                                        />
                                    )}
                                    {isSending
                                        ? "Sending..."
                                        : t("send_inquiry")}
                                    {!isSending && (
                                        <span aria-hidden="true">→</span>
                                    )}
                                </button>
                            </form>
                        </div>
                    </section>

                    {/* RELATED TOURS */}
                    <section className="mt-16 md:mt-24">
                        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <div className="mb-3 flex items-center gap-3">
                                    <span className="h-px w-8 bg-[#e38c2b]" />
                                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c47a32]">
                                        {t("discover_your_jouney")}
                                    </span>
                                </div>

                                <h2 className="font-serif text-3xl font-bold text-[#183b36] md:text-4xl">
                                    {t("related_tour")}
                                </h2>

                                <div className="mt-4 h-1 w-16 rounded-full bg-[#e38c2b]" />
                            </div>

                            <button
                                type="button"
                                onClick={() => navigate("/tours")}
                                className="group inline-flex w-fit items-center gap-3 rounded-full border border-[#d9c6ae] px-5 py-3 text-sm font-semibold text-[#183b36] transition-all duration-300 hover:border-[#183b36] hover:bg-[#183b36] hover:text-white"
                            >
                                {t("view_all_tour")}
                                <span className="transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </button>
                        </div>

                        <div className="mt-8">
                            <RelatedTours tours={blog?.relatedTours} />
                        </div>
                    </section>
                </div>
            </main>

            {/* FLOATING CONTACT BUTTONS */}
            <div className="fixed bottom-5 right-4 z-40 flex flex-col items-center gap-3 md:bottom-7 md:right-7">
                <button
                    type="button"
                    aria-label="Contact us by email"
                    onClick={() => setOpenContactModal(true)}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#183b36] text-white shadow-lg shadow-black/15 transition-all duration-300 hover:-translate-y-1 hover:bg-[#28564d] hover:shadow-xl active:scale-95 md:h-14 md:w-14"
                >
                    <CgMail size={25} />
                </button>

                <a
                    href="https://wa.me/84968133933"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact us on WhatsApp"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/15 transition-all duration-300 hover:-translate-y-1 hover:bg-[#1fb85a] hover:shadow-xl active:scale-95 md:h-14 md:w-14"
                >
                    <FaWhatsapp size={25} />
                </a>
            </div>

            {/* LOADING */}
            <Backdrop
                open={Boolean(isLoading)}
                sx={{
                    color: "#fff",
                    zIndex: 9999,
                    backgroundColor: "rgba(24,59,54,0.45)",
                    backdropFilter: "blur(4px)",
                }}
            >
                <CircularProgress sx={{ color: "#e38c2b" }} />
            </Backdrop>

            {/* CONTACT MODAL */}
            {blog && (
                <ContactModalFrm
                    t={t}
                    open={openContactModal}
                    content={`I am interested in blog ${blog.title}`}
                    onClose={() => setOpenContactModal(false)}
                />
            )}
        </div>
    );
};

export default BlogDetail;
