import { $getRoot, $getSelection } from "lexical";
import { $isHeadingNode } from "@lexical/rich-text";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

function HeadingIdPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const root = $getRoot();
        root.getChildren().forEach((node, index) => {
          if ($isHeadingNode(node)) {
            if (!node.getId()) {
              node.setId(`heading-${index}`);
            }
          }
        });
      });
    });
  }, [editor]);

  return null;
}

export default HeadingIdPlugin;