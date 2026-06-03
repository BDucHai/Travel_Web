import { LexicalComposer } from "@lexical/react/LexicalComposer";

import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

import { ContentEditable } from "@lexical/react/LexicalContentEditable";

import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";

import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

import { $getRoot, $createParagraphNode, $createTextNode } from "lexical";

import { $generateHtmlFromNodes } from "@lexical/html";

import { HeadingNode } from "@lexical/rich-text";

import { useRef } from "react";
import { uploadImage } from "../../utils/uploadImage";

const theme = {};

const editorConfig = {
    namespace: "BlogEditor",
    theme,

    onError(error) {
        throw error;
    },

    nodes: [HeadingNode],
};

const BlogEditor = ({ setContent }) => {
    const editorRef = useRef(null);

    const handleInsertImage = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const imageUrl = await uploadImage(file);

        const editor = editorRef.current;

        editor.update(() => {
            const root = $getRoot();

            const paragraph = $createParagraphNode();

            paragraph.append($createTextNode(`<img src="${imageUrl}" />`));

            root.append(paragraph);
        });
    };

    return (
        <LexicalComposer initialConfig={editorConfig}>
            <div className="border rounded-2xl overflow-hidden">
                {/* TOOLBAR */}
                <div className="border-b p-3 flex items-center gap-3 bg-gray-50">
                    <label
                        className="
                            px-4 py-2
                            bg-black
                            text-white
                            rounded-lg
                            cursor-pointer
                        ">
                        Insert Image
                        <input type="file" hidden onChange={handleInsertImage} />
                    </label>
                </div>

                {/* EDITOR */}
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
                />

                <HistoryPlugin />

                <OnChangePlugin
                    onChange={(editorState, editor) => {
                        editorRef.current = editor;

                        editorState.read(() => {
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
