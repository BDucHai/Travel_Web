import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useTranslation } from "react-i18next";
import { useHeading } from "../utils/useHeading";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

import { motion } from "framer-motion";

export function TOCDestination({ hideTOC, setHideTOC }) {
  const { t } = useTranslation();
  const [editor] = useLexicalComposerContext();
  const headings = useHeading(editor);
  const NAV_HEIGHT = 118;
  
  const handleClick = (id, e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (!headings || headings.length === 0) return null;

  return (
    <div className="my-[1.5rem] border-[1px] border-[#e4fae3] rounded-[0.25rem] shadow-lg py-[1rem] text-[#446bd1] bg-[#f9fafa]">
      <div className="flex justify-between items-center md:px-[2rem] ">
        <div className="uppercase text-[1.15rem] font-bold">{t("table_content")}</div>
        <div className="text-[0.8rem]">
          {hideTOC ? (
            <div className="flex items-center cursor-pointer" onClick={() => setHideTOC(false)}>
              {t("show")} <FaArrowDown />
            </div>
          ) : (
            <div className="flex items-center cursor-pointer" onClick={() => setHideTOC(true)}>
              {t("hide")} <FaArrowUp />
            </div>
          )}
        </div>
      </div>
      <motion.div
        initial={{ height: "100%" }}
        animate={{
          height: hideTOC ? 0 : "auto",
          opacity: hideTOC ? 0 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="overflow-hidden grid grid-cols-1 md:grid-cols-2 px-[0.25rem] md:px-[2rem] mt-[1rem]"
      >
        {headings?.map((heading) => (
          <div key={heading?.id} className="text-wrap cursor-pointer hover:text-[#ef8d21]" onClick={(e) => handleClick(heading?.id, e)}>
            {heading?.text}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
