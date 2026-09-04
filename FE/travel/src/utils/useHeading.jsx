import { useState, useEffect } from "react";

export function useHeading(editor) {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const updateHeadings = () => {
      const root = editor.getRootElement();
      if (!root) return;
      const nodes = root.querySelectorAll("h1");
      const list = Array.from(nodes).map((h) => ({
        id: h.id,
        text: h.innerText,
      }));
      setHeadings(list);
    };

    const unregister = editor.registerUpdateListener(() => {
      updateHeadings();
    });

    updateHeadings();

    return unregister;
  }, [editor]);

  return headings;
}
