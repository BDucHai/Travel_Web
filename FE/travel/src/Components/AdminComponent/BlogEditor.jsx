import { LexicalComposer } from "@lexical/react/LexicalComposer";

import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

import { ContentEditable } from "@lexical/react/LexicalContentEditable";

import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";

import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

import { HeadingNode } from "@lexical/rich-text";

import { $generateHtmlFromNodes } from "@lexical/html";
import { ImageNode } from "../../utils/ImageNode";

import ToolbarPlugin from "./ToolbarPlugin";

const theme = {};

const editorConfig = {
    namespace: "BlogEditor",

    theme,

    onError(error) {
        throw error;
    },

    nodes: [HeadingNode, ImageNode],
};

const BlogEditor = ({ content, setContent }) => {
    return (
        <LexicalComposer initialConfig={editorConfig}>
            <div
                className="
                    border
                    rounded-2xl
                    overflow-hidden
                    bg-transparent
                ">
                <ToolbarPlugin />

                <RichTextPlugin
                    contentEditable={
                        <ContentEditable
                            className="
                min-h-[500px]
                p-6
                outline-none
                prose
                max-w-none
            "
                        />
                    }
                    placeholder={<div className="p-6 text-gray-400">Write your story...</div>}
                    ErrorBoundary={LexicalErrorBoundary}
                />

                <HistoryPlugin />

                <OnChangePlugin
                    onChange={(editorState, editor) => {
                        editor.read(() => {
                            const html = $generateHtmlFromNodes(editor);

                            setContent(html);
                        });
                    }}
                />
            </div>
        </LexicalComposer>
    );
};

export default BlogEditor;
