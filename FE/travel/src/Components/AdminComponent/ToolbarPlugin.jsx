import { FORMAT_TEXT_COMMAND, $getSelection, $isRangeSelection, $createParagraphNode, $insertNodes } from "lexical";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { $setBlocksType } from "@lexical/selection";

import { $createHeadingNode, $isHeadingNode } from "@lexical/rich-text";

import { useEffect, useState } from "react";

import { uploadImage } from "../../utils/uploadImage";

import { $createImageNode } from "../../utils/ImageNode";

const ToolbarPlugin = () => {
    const [editor] = useLexicalComposerContext();

    const [loading, setLoading] = useState(false);

    const [blockType, setBlockType] = useState("paragraph");

    const [formats, setFormats] = useState({
        bold: false,
        italic: false,
        underline: false,
    });

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const selection = $getSelection();

                if (!$isRangeSelection(selection)) return;

                const anchorNode = selection.anchor.getNode();

                const topLevelElement =
                    anchorNode.getKey() === "root" ? anchorNode : anchorNode.getTopLevelElementOrThrow();

                if ($isHeadingNode(topLevelElement)) {
                    setBlockType(topLevelElement.getTag());
                } else {
                    setBlockType("paragraph");
                }

                setFormats({
                    bold: selection.hasFormat("bold"),
                    italic: selection.hasFormat("italic"),
                    underline: selection.hasFormat("underline"),
                });
            });
        });
    }, [editor]);

    const formatHeading = (type) => {
        editor.update(() => {
            const selection = $getSelection();

            if (!$isRangeSelection(selection)) return;

            const anchorNode = selection.anchor.getNode();

            const topLevelElement = anchorNode.getTopLevelElementOrThrow();

            if ($isHeadingNode(topLevelElement) && topLevelElement.getTag() === type) {
                $setBlocksType(selection, () => $createParagraphNode());
            } else {
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
        setLoading(true);
        const files = Array.from(e.target.files);

        for (const file of files) {
            const res = await uploadImage(file);

            editor.update(() => {
                const node = $createImageNode({
                    src: res.url,
                    alt: file.name,
                });

                $insertNodes([node]);
            });
        }
        setLoading(false);
    };

    const activeClass = "bg-white text-[#000]";

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
                className={`px-3 py-1 border rounded-lg ${formats.bold ? activeClass : ""}`}>
                Bold
            </button>

            <button
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
                className={`px-3 py-1 border rounded-lg ${formats.italic ? activeClass : ""}`}>
                Italic
            </button>

            <button
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
                className={`px-3 py-1 border rounded-lg ${formats.underline ? activeClass : ""}`}>
                Underline
            </button>

            <button
                onClick={() => formatHeading("h1")}
                className={`px-3 py-1 border rounded-lg ${blockType === "h1" ? activeClass : ""}`}>
                H1
            </button>

            <button
                onClick={() => formatHeading("h2")}
                className={`px-3 py-1 border rounded-lg ${blockType === "h2" ? activeClass : ""}`}>
                H2
            </button>

            <button
                onClick={formatParagraph}
                className={`px-3 py-1 border rounded-lg ${blockType === "paragraph" ? activeClass : ""}`}>
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
