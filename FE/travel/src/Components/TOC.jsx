import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useHeading } from "../utils/useHeading";
import { useTranslation } from "react-i18next";
import { getBlogRandom } from "../api/Blog";
import useSWR from "swr";
import { useAuth } from "../contexts/AuthContext";

import { CiCalendar } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
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
      const y = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#ffebcd4f] px-[1rem] py-[0.6rem] text-[0.8rem]">
      <div>
        <h3 className="font-bold mb-2 pl-[0.5rem] uppercase border-l-[0.5rem] border-[#ef8d21]">{t("in_this_page")}</h3>
        <ul>
          {headings?.map(h => (
            <li key={h.id}>
              <a
                href={`#${h?.id}`}
                onClick={(e) => handleClick(h?.id, e)}
                className="hover:underline cursor-pointer"
              >
                {h?.text}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-[0.5rem] py-[1.5rem]">
        <h3 className="font-bold pl-[0.5rem] uppercase border-l-[0.5rem] border-[#ef8d21]">{t("you_may_also_like")}</h3>
      </div>
      <div className="overflow-hidden">
        {(listBlogs ? listBlogs.filter(b => b.slug !== slug) : [])?.map((post) => (
          <div
            key={post?.id}
            className="flex cursor-pointer mt-[0.5rem] max-h-[90px]"
            onClick={() => {
              navigate(`/blog/detail/${post?.slug}`);
            }}>
            <div className="flex-1 mr-[0.5rem]">
              <img
                src={post?.heroImageUrl}
                alt={post?.id}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div>
                {/* <p className="text-xs text-gray-500">{post?.guide}</p> */}
                <Tooltip title={post?.title}>
                  <h3
                    className="text-[0.75rem] font-semibold line-clamp-3"
                  >
                    {post?.title}
                  </h3>
                </Tooltip>
              </div>
              <div className="flex items-center text-xs text-dark mt-2">
                <span className="flex items-center mr-[0.8rem]">
                  <CiCalendar className="mr-[0.2rem]" />{" "}
                  {new Date(post?.publishedAt).toLocaleDateString("vi-VN")}
                </span>
                <span className="flex items-center">
                  <FaEye className="mr-[0.2rem]" /> {post?.viewCount} {t("view")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-[0.5rem] mb-[1rem] text-[#d38518] font-semibold uppercase cursor-pointer"
        onClick={() => navigate("/blog")}
      >
        {t("view_more_article")}
      </div>


    </div>
  );
}