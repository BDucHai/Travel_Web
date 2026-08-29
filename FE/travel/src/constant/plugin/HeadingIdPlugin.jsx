import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

export default function HeadingIdPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerMutationListener(
      // lắng nghe HeadingNode
      require("@lexical/rich-text").HeadingNode,
      () => {
        editor.update(() => {
          const root = editor.getRootElement();
          if (!root) return;
          const headings = root.querySelectorAll("h1, h2");
          headings.forEach((h, i) => {
            if (!h.id) h.id = `heading-${i}`;
          });
        });
      }
    );
  }, [editor]);

  return null;
}
