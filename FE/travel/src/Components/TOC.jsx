import { useState, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useHeading } from "../utils/useHeading";
import { useTranslation } from "react-i18next";

export default function TOC() {
   const [editor] = useLexicalComposerContext();
  const headings = useHeading(editor);
  const NAV_HEIGHT = 118;

    const { t } = useTranslation();

  const handleClick = (id, e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className = "bg-[#f0c18e] px-[1rem] py-[0.6rem]">
      <div>
        <h3 className="font-bold mb-2 uppercase border-l-[2px] border-[#ef8d21]">{t("in_this_page")}</h3>
      <ul>
        {headings?.map(h => (
          <li key={h.id}>
            <a
              href={`#${h?.id}`}
              onClick={(e) => handleClick(h?.id, e)}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              {h?.text}
            </a>
          </li>
        ))}
      </ul>
        </div>

      <div className="mt-[0.5rem] py-[1.5rem]">
        <h3 className="font-bold mb-2 uppercase border-l-[2px] border-[#ef8d21]">{t("in_this_page")}</h3>
      </div>

    </div>
  );
}