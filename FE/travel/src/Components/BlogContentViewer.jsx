import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { HeadingNode } from "@lexical/rich-text";
import { useEffect, useRef } from "react";

import { ImageNode } from "../utils/ImageNode";
import { VideoNode } from "../utils/VideoNode";

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
            <div
                className="
                    prose
                    prose-lg
                    max-w-none

                    [&_h1]:text-[2.5rem]
                    [&_h1]:font-bold

                    [&_h2]:text-[2rem]
                    [&_h2]:font-bold
                    [&_h2]:mt-8
                    [&_h2]:mb-4

                    [&_p]:leading-9
                    [&_p]:text-gray-700
                ">
                <RichTextPlugin
                    contentEditable={<ContentEditable className="outline-none" />}
                    placeholder={null}
                    ErrorBoundary={LexicalErrorBoundary}
                />

                <InitialStatePlugin content={content} />
            </div>
        </LexicalComposer>
    );
};

export default BlogContentViewer;
