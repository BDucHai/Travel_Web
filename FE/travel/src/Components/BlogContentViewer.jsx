import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useRef } from "react";

import { ImageNode } from "../utils/ImageNode";
import { VideoNode } from "../utils/VideoNode";
import { HeadingNode } from "../utils/HeadingNode";
import { useHeading } from "../utils/useHeading";
import TOC from "./TOC";
import HeadingIdPlugin from "../constant/plugin/HeadingIdPlugin";

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

// const BlogContentViewer = ({ content }) => {
//     const initialConfig = {
//         namespace: "BlogContentViewer",
//         theme,
//         editable: false,

//         nodes: [HeadingNode, ImageNode, VideoNode],

//         onError(error) {
//             console.error(error);
//         },
//     };

//     if (!content) return null;

//     return (
//         <LexicalComposer initialConfig={initialConfig}>
//             <div
//                 className="
//                     prose
//                     prose-lg
//                     max-w-none

//                     [&_h1]:text-[1.5rem]
//                     [&_h1]:font-bold

//                     [&_h2]:text-[1.2rem]
//                     [&_h2]:font-bold
//                     [&_h2]:mt-8
//                     [&_h2]:mb-4

//                     [&_p]:leading-9
//                 ">
//                 <RichTextPlugin
//                     contentEditable={<ContentEditable className="outline-none" />}
//                     placeholder={null}
//                     ErrorBoundary={LexicalErrorBoundary}
//                 />

//                 <InitialStatePlugin content={content} />
//             </div>
//         </LexicalComposer>
//     );
// };
const BlogContentViewer = ({ content }) => {
  const initialConfig = {
    namespace: "BlogContentViewer",
    theme,
    editable: false,
    nodes: [HeadingNode, ImageNode, VideoNode],
    onError(error) {
      console.error(error);
    },
  };

  if (!content) return null;

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="relative">
        {/* Nội dung blog */}
        <div
          className="
            prose prose-lg max-w-none
            [&_h1]:text-[1.5rem] [&_h1]:font-bold
            [&_h2]:text-[1.2rem] [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4
            [&_p]:leading-9
          "
        >
          <RichTextPlugin
            contentEditable={<ContentEditable className="outline-none" />}
            placeholder={null}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <InitialStatePlugin content={content} />

          {/* Gắn id cho heading */}
          <HeadingIdPlugin />
        </div>

        {/* TOC nằm trong LexicalComposer */}
        <TOCWrapper />
      </div>
    </LexicalComposer>
  );
};

function TOCWrapper() {
  const [editor] = useLexicalComposerContext();
  const headings = useHeading(editor);

  return <TOC headings={headings} />;
}

export default BlogContentViewer;
