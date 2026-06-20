import { LexicalComposer } from "@lexical/react/LexicalComposer";

import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

import { ContentEditable } from "@lexical/react/LexicalContentEditable";

import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";

import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

import { HeadingNode } from "@lexical/rich-text";

import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { ImageNode } from "../../utils/ImageNode";

import ToolbarPlugin from "./ToolbarPlugin";

const theme = {};

const BlogEditor = ({ content, setContent }) => {
    const editorConfig = {
        namespace: "BlogEditor",
        editorState: (editor) => {
        if (content) {
            const parser = new DOMParser();
            const dom = parser.parseFromString(content, "text/html");
            const nodes = $generateNodesFromDOM(editor, dom);
            editor.update(() => {
            const root = editor.getRootElement();
            root.append(...nodes);
            });
        }
        },
        theme,

        onError(error) {
            throw error;
        },

        nodes: [HeadingNode, ImageNode],
    };

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
