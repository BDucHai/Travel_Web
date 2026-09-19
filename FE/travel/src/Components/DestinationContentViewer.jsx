import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useRef, useState } from "react";

import { ImageNode } from "../utils/ImageNode";
import { VideoNode } from "../utils/VideoNode";
import HeadingIdPlugin from "../constant/plugin/HeadingIdPlugin";
import { HeadingNode } from "@lexical/rich-text";


import { TOCDestination } from "./TOCDestination";
import { ImageGalleryNode } from "../utils/ImageGalleryNode";

const theme = {};

function InitialStatePlugin({ content }) {
  const [editor] = useLexicalComposerContext();
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!content || loadedRef.current) return;

    try {
      const editorState = editor.parseEditorState(content);
      editor.setEditorState(editorState);
      editor.setEditable(false);
    } catch (error) {
      console.error("Failed to parse blog content:", error);
    }

    loadedRef.current = true;
  }, [content, editor]);

  return null;
}

const DestinationContentViewer = ({ content }) => {
  const initialConfig = {
    namespace: "DestinationContentViewer",
    theme,
    editable: false,
    nodes: [HeadingNode, ImageNode, VideoNode, ImageGalleryNode],
    onError(error) {
      console.error(error);
    },
  };

    const [hideTOC, setHideTOC] = useState(false);


  if (!content) return null;

  return (
    <div className="">
      {/* Content */}
      <LexicalComposer initialConfig={initialConfig}>

       <TOCDestination hideTOC={hideTOC} setHideTOC={setHideTOC} />

          {/* Nội dung blog */}
        <div className="relative content-wrapper flex">
          <div
            className="
              prose prose-lg max-w-none
              [&_h1]:text-[1.2rem] md:[&_h1]:text-[1.3rem]
              [&_h2]:text-[1rem] md:[&_h2]:text-[1.1rem]
              [&_h2]:mt-8 [&_h2]:mb-4
              [&_p]:leading-9
              flex-[2] text-[0.85rem] md:text-[1rem]"
          >
            <RichTextPlugin
              contentEditable={<ContentEditable className="outline-none [&_*]:text-inherit" />}
              placeholder={null}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <InitialStatePlugin content={content} />

            {/* Gắn id cho heading */}
            <HeadingIdPlugin />
          </div>

        </div>
      </LexicalComposer>
    </div>
  );
};


export default DestinationContentViewer;
