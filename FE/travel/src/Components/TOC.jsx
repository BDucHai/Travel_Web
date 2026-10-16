
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useHeading } from "../utils/useHeading";
import { useTranslation } from "react-i18next";
import { getBlogRandom } from "../api/Blog";
import useSWR from "swr";
import { useAuth } from "../contexts/AuthContext";

import { CiCalendar } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { Tooltip } from "@mui/material";

export default function TOC() {
    const { slug } = useParams();

    const [editor] = useLexicalComposerContext();
    const headings = useHeading(editor);
    const NAV_HEIGHT = 118;

    const navigate = useNavigate();
    const { lang } = useAuth();
    const { t } = useTranslation();

    const { data: listBlogs } = useSWR(
        lang ? ["/blogs/blogs/random", { lang }] : null,
        ([_, params]) => getBlogRandom(params),
    );

    const handleClick = (id, e) => {
        e.preventDefault();

        const el = document.getElementById(id);

        if (el) {
            const y =
                el.getBoundingClientRect().top +
                window.scrollY -
                NAV_HEIGHT;

            window.scrollTo({
                top: y,
                behavior: "smooth",
            });
        }
    };

    const relatedBlogs = listBlogs
        ? listBlogs.filter((b) => b.slug !== slug)
        : [];

    return (
        <aside className="rounded-2xl border border-[#eadfd2] bg-[#fffdf9] text-[#183b36] shadow-[0_8px_30px_rgba(55,40,20,0.05)]">

            {/* TABLE OF CONTENTS */}
            <section className="p-5 md:p-6">
                <div className="mb-5">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="h-px w-6 bg-[#e38c2b]" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b7793b]">
                            {t("blog")}
                        </span>
                    </div>

                    <h3 className="border-l-[3px] border-[#e38c2b] pl-3 text-base font-bold uppercase tracking-wide text-[#183b36]">
                        {t("in_this_page")}
                    </h3>
                </div>

                {headings?.length > 0 ? (
                    <ul className="space-y-1.5">
                        {headings.map((h, index) => (
                            <li key={h.id}>
                                <a
                                    href={`#${h.id}`}
                                    onClick={(e) => handleClick(h.id, e)}
                                    className="group flex items-start gap-3 rounded-lg px-3 py-2.5 text-sm leading-2 text-[#000] transition-all duration-200 hover:bg-[#f6eee3] hover:text-[#183b36]"
                                >

                                    <span className="flex-1">
                                        {h.text}
                                    </span>

                                    <span className="translate-x-[-4px] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                                        <span className="text-[#c47a32]">
                                            →
                                        </span>
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm leading-6 text-gray-400">
                        {t("in_this_page")}
                    </p>
                )}
            </section>

            {/* DIVIDER */}
            <div className="mx-5 border-t border-[#eadfd2] md:mx-6" />

            {/* RELATED ARTICLES */}
            <section className="p-5 md:p-6">
                <div className="mb-5">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="h-px w-6 bg-[#e38c2b]" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b7793b]">
                            {t("discover_your_jouney")}
                        </span>
                    </div>

                    <h3 className="border-l-[3px] border-[#e38c2b] pl-3 text-base font-bold uppercase tracking-wide text-[#183b36]">
                        {t("you_may_also_like")}
                    </h3>
                </div>

                <div className="space-y-4">
                    {relatedBlogs.map((post) => (
                        <article
                            key={post?.id}
                            onClick={() =>
                                navigate(`/blog/detail/${post?.slug}`)
                            }
                            className="group flex cursor-pointer gap-3"
                        >
                            {/* Thumbnail */}
                            <div className="relative h-[88px] w-[100px] shrink-0 overflow-hidden rounded-xl bg-[#f1dece]">
                                <img
                                    src={post?.heroImageUrl}
                                    alt={post?.title || ""}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                            </div>

                            {/* Article info */}
                            <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                                <Tooltip title={post?.title || ""} placement="top">
                                    <h4 className="line-clamp-3 text-[13px] font-semibold leading-5 text-[#183b36] transition-colors duration-200 group-hover:text-[#c47a32]">
                                        {post?.title}
                                    </h4>
                                </Tooltip>

                                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#8b918b]">
                                    <CiCalendar
                                        className="shrink-0 text-[#c47a32]"
                                        size={15}
                                    />

                                    <span>
                                        {post?.publishedAt
                                            ? new Date(
                                                  post.publishedAt,
                                              ).toLocaleDateString(
                                                  lang === "fr"
                                                      ? "fr-FR"
                                                      : "en-GB",
                                              )
                                            : ""}
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* VIEW MORE */}
                <button
                    type="button"
                    onClick={() => navigate("/blog")}
                    className="group mt-6 flex w-full items-center justify-between rounded-xl border border-[#e4d4c1] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#183b36] transition-all duration-300 hover:border-[#183b36] hover:bg-[#183b36] hover:text-white"
                >
                    <span>{t("view_more_article")}</span>

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                    </span>
                </button>
            </section>
        </aside>
    );
}
