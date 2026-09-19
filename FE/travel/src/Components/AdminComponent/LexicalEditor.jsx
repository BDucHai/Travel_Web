import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";

import { $generateNodesFromDOM } from "@lexical/html";
import { HeadingNode } from "@lexical/rich-text";

import { ImageNode } from "../../utils/ImageNode";
import { VideoNode } from "../../utils/VideoNode";

import { useEffect, useRef } from "react";
import ToolbarPlugin from "./ToolbarPlugin";
import { ImageGalleryNode } from "../../utils/ImageGalleryNode";
// import TextColorPlugin from "../../constant/plugin/TextColorPlugin";
// import { TextStyleNode } from "../../utils/TextStyleNode";

const theme = {
  heading: {
    h1: "text-[1.5rem] font-bold",
    h2: "text-[1.2rem] font-bold mt-8 mb-4",
  },
  paragraph: "leading-9",
};


function isJSON(str) {
    try {
        JSON.parse(str);
        return true;
    } catch {
        return false;
    }
}

function InitialContentPlugin({ content }) {
    const [editor] = useLexicalComposerContext();
    const loaded = useRef(false);

    useEffect(() => {
        if (!content || loaded.current) return;

        editor.update(() => {
            try {
                // CASE 1: JSON Lexical
                if (isJSON(content)) {
                    const state = editor.parseEditorState(content);
                    editor.setEditorState(state);
                }

                // CASE 2: HTML cũ
                else {
                    const parser = new DOMParser();
                    const dom = parser.parseFromString(content, "text/html");

                    const nodes = $generateNodesFromDOM(editor, dom);

                    const root = $getRoot();
                    root.clear();
                    root.append(...nodes);
                }
            } catch (e) {
                console.error("Load error:", e);
            }
        });

        loaded.current = true;
    }, [content, editor]);

    return null;
}

const LexicalEditor = ({ content, setContent }) => {
    const skip = useRef(true);

    const editorConfig = {
        namespace: "BlogEditor",
        theme,

        nodes: [HeadingNode, ImageNode, VideoNode,  ImageGalleryNode],

        onError(error) {
            console.error(error);
        },
    };

    return (
        <LexicalComposer initialConfig={editorConfig}>
            {/* TOOLBAR */}
            <ToolbarPlugin />

            {/* EDITOR */}
            <RichTextPlugin
                contentEditable={<ContentEditable className="h-[500px] p-6 outline-none w-full overflow-y-auto whitespace-pre-wrap break-words " />}
                placeholder={<div className="p-4">Write...</div>}
                ErrorBoundary={LexicalErrorBoundary}
            />

            <HistoryPlugin />

            {/* LOAD CONTENT */}
            <InitialContentPlugin content={content} />

            {/* SAVE CONTENT */}
            <OnChangePlugin
                onChange={(editorState) => {
                    if (skip.current) {
                        skip.current = false;
                        return;
                    }

                    setContent(JSON.stringify(editorState));
                }}
            />
        </LexicalComposer>
    );
};

export default LexicalEditor;
