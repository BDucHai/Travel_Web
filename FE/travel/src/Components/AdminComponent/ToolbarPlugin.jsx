import { FORMAT_TEXT_COMMAND, $getSelection, $isRangeSelection, $createParagraphNode, $insertNodes } from "lexical";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { $setBlocksType } from "@lexical/selection";

import { $createHeadingNode } from "@lexical/rich-text";

import { useState } from "react";

import { uploadImage } from "../../utils/uploadImage";

import { $createImageNode } from "../../utils/ImageNode";

const ToolbarPlugin = () => {
    const [editor] = useLexicalComposerContext();

    const [loading, setLoading] = useState(false);

    const formatHeading = (type) => {
        editor.update(() => {
            const selection = $getSelection();

            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createHeadingNode(type));
            }
        });
    };

    const formatParagraph = () => {
        editor.update(() => {
            const selection = $getSelection();

            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createParagraphNode());
            }
        });
    };

    const handleImage = async (e) => {
        const files = Array.from(e.target.files);

        if (!files.length) return;

        setLoading(true);

        try {
            for (const file of files) {
                const imageUrl = await uploadImage(file);

                editor.update(() => {
                    const imageNode = $createImageNode({
                        id: imageUrl?.id,
                        src: imageUrl?.url,
                        alt: file.name,
                    });

                    $insertNodes([imageNode]);
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

        e.target.value = "";
    };

    return (
        <div
            className="
                border-b
                p-3
                flex
                flex-wrap
                items-center
                gap-2
                bg-transparent
            ">
            <button
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
                className="px-3 py-1 border rounded-lg">
                Bold
            </button>

            <button
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
                className="px-3 py-1 border rounded-lg">
                Italic
            </button>

            <button
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
                className="px-3 py-1 border rounded-lg">
                Underline
            </button>

            <button onClick={() => formatHeading("h1")} className="px-3 py-1 border rounded-lg">
                H1
            </button>

            <button onClick={() => formatHeading("h2")} className="px-3 py-1 border rounded-lg">
                H2
            </button>

            <button onClick={formatParagraph} className="px-3 py-1 border rounded-lg">
                P
            </button>

            <label
                className="
                    px-4
                    py-2
                    bg-black
                    text-white
                    rounded-lg
                    cursor-pointer
                ">
                {loading ? "Uploading..." : "Insert Image"}

                <input type="file" hidden multiple accept="image/*" onChange={handleImage} />
            </label>

            {loading && (
                <div
                    className="
                        w-5
                        h-5
                        border-2
                        border-black
                        border-t-transparent
                        rounded-full
                        animate-spin
                    "
                />
            )}
        </div>
    );
};

export default ToolbarPlugin;
