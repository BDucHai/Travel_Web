import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { HeadingNode } from "@lexical/rich-text";
import { useEffect, useRef } from "react";
import { ImageNode } from "../utils/ImageNode";

const theme = {};

function InitialStatePlugin({ content }) {
    const [editor] = useLexicalComposerContext();
    const loadedRef = useRef(false);

    useEffect(() => {
        if (!content || loadedRef.current) return;

        try {
            const editorState = editor.parseEditorState(content);
            editor.setEditorState(editorState);
            editor.setEditable(false); // read only
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
        nodes: [HeadingNode, ImageNode],
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
                    prose-img:rounded-2xl
                    prose-img:w-full
                    prose-img:shadow-xl
                    prose-img:my-10
                    prose-h1:text-5xl
                    prose-h1:font-bold
                    prose-h2:text-4xl
                    prose-p:leading-9
                    prose-p:text-gray-700
                ">
                <RichTextPlugin
                    contentEditable={<ContentEditable className="outline-none pointer-events-none" />}
                    placeholder={null}
                    ErrorBoundary={LexicalErrorBoundary}
                />

                <InitialStatePlugin content={content} />
            </div>
        </LexicalComposer>
    );
};

export default BlogContentViewer;
