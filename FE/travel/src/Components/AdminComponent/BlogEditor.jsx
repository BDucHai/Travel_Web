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
import { useEffect, useRef } from "react";
import ToolbarPlugin from "../AdminComponent/ToolbarPlugin";

const theme = {};

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

                // CASE 2: HTML cũ (fallback)
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

const BlogEditor = ({ content, setContent }) => {
    const skip = useRef(true);

    const editorConfig = {
        namespace: "BlogEditor",
        theme,
        nodes: [HeadingNode, ImageNode],
        onError(error) {
            throw error;
        },
    };

    return (
        <LexicalComposer initialConfig={editorConfig}>
            <ToolbarPlugin />

            <RichTextPlugin
                contentEditable={<ContentEditable className="min-h-[500px] p-6 outline-none" />}
                placeholder={<div className="p-4 text-gray-400">Write...</div>}
                ErrorBoundary={LexicalErrorBoundary}
            />

            <HistoryPlugin />

            <InitialContentPlugin content={content} />

            {/* SAVE */}
            <OnChangePlugin
                onChange={(editorState) => {
                    if (skip.current) {
                        skip.current = false;
                        return;
                    }

                    // 👉 vẫn gửi string (JSON)
                    setContent(JSON.stringify(editorState));
                }}
            />
        </LexicalComposer>
    );
};

export default BlogEditor;
