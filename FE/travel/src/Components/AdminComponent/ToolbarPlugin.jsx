import {
  FORMAT_TEXT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $insertNodes,
  $getRoot,
} from "lexical";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $setBlocksType } from "@lexical/selection";
import {
  $createHeadingNode,
  $isHeadingNode,
} from "@lexical/rich-text";

import { useEffect, useState } from "react";

import { uploadImage } from "../../utils/uploadImage";
import { $createImageNode } from "../../utils/ImageNode";
import { $createImageGalleryNode } from "../../utils/ImageGalleryNode";
import { $createVideoNode } from "../../utils/VideoNode";

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();

  const [loading, setLoading] = useState(false);
  const [blockType, setBlockType] = useState("paragraph");

  const [formats, setFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  // =========================
  // TRACK CURRENT FORMAT
  // =========================

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();

        if (!$isRangeSelection(selection)) return;

        const anchorNode = selection.anchor.getNode();

        const topLevelElement =
          anchorNode.getKey() === "root"
            ? anchorNode
            : anchorNode.getTopLevelElementOrThrow();

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

  // =========================
  // HEADING
  // =========================

  const formatHeading = (type) => {
    editor.update(() => {
      let selection = $getSelection();

      if (!$isRangeSelection(selection)) {
        const root = $getRoot();

        const paragraph = $createParagraphNode();

        root.append(paragraph);

        paragraph.select();

        selection = $getSelection();
      }

      if (!$isRangeSelection(selection)) return;

      $setBlocksType(
        selection,
        () => $createHeadingNode(type)
      );
    });
  };

  // =========================
  // PARAGRAPH
  // =========================

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        $setBlocksType(
          selection,
          () => $createParagraphNode()
        );
      }
    });
  };

  // =========================
  // INSERT SINGLE IMAGE
  // =========================

  const handleSingleImage = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setLoading(true);

    try {
      const res = await uploadImage(file);

      editor.update(() => {
        const node = $createImageNode({
          src: res.url,
          alt: file.name,
        });

        $insertNodes([node]);
      });
    } catch (error) {
      console.error("Upload image error:", error);

      alert("Upload ảnh thất bại!");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  // =========================
  // INSERT IMAGE GALLERY
  // =========================

  const handleGallery = async (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    if (files.length < 2) {
      alert("Gallery cần ít nhất 2 ảnh!");
      e.target.value = "";
      return;
    }

    if (files.length > 6) {
      alert("Gallery tối đa 6 ảnh!");
      e.target.value = "";
      return;
    }

    setLoading(true);

    try {
      const uploadedImages = [];

      for (const file of files) {
        const res = await uploadImage(file);

        uploadedImages.push({
          src: res.url,
          alt: file.name,
        });
      }

      editor.update(() => {
        const galleryNode =
          $createImageGalleryNode(uploadedImages);

        $insertNodes([galleryNode]);
      });
    } catch (error) {
      console.error("Upload gallery error:", error);

      alert("Upload gallery thất bại!");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  // =========================
  // YOUTUBE
  // =========================

  const getYoutubeEmbedUrl = (url) => {
    try {
      const parsedUrl = new URL(url);

      // https://www.youtube.com/embed/xxxxx
      if (
        parsedUrl.hostname.includes("youtube.com") &&
        parsedUrl.pathname.startsWith("/embed/")
      ) {
        const videoId =
          parsedUrl.pathname.split("/embed/")[1];

        return videoId
          ? `https://www.youtube.com/embed/${videoId}`
          : null;
      }

      // https://www.youtube.com/watch?v=xxxxx
      if (
        parsedUrl.hostname.includes("youtube.com")
      ) {
        const videoId =
          parsedUrl.searchParams.get("v");

        return videoId
          ? `https://www.youtube.com/embed/${videoId}`
          : null;
      }

      // https://youtu.be/xxxxx
      if (
        parsedUrl.hostname === "youtu.be"
      ) {
        const videoId =
          parsedUrl.pathname.substring(1);

        return videoId
          ? `https://www.youtube.com/embed/${videoId}`
          : null;
      }

      return null;
    } catch {
      return null;
    }
  };

  // =========================
  // INSERT VIDEO
  // =========================

  const handleVideo = () => {
    const url = window.prompt(
      "Enter the YouTube link (Click share then select embed):"
    );

    if (!url) return;

    const embedUrl =
      getYoutubeEmbedUrl(url.trim());

    if (!embedUrl) {
      alert("Link YouTube Invalid!");
      return;
    }

    editor.update(() => {
      const videoNode =
        $createVideoNode(embedUrl);

      $insertNodes([videoNode]);
    });
  };

  // =========================
  // STYLE
  // =========================

  const activeClass =
    "bg-white text-black";

  const buttonClass = `
    px-3
    py-1
    border
    rounded-lg
    cursor-pointer
    hover:bg-white
    hover:text-black
    transition
  `;

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
      "
    >

      {/* ================= BOLD ================= */}

      <button
        type="button"
        onClick={() =>
          editor.dispatchCommand(
            FORMAT_TEXT_COMMAND,
            "bold"
          )
        }
        className={`${buttonClass} ${
          formats.bold ? activeClass : ""
        }`}
      >
        Bold
      </button>

      {/* ================= ITALIC ================= */}

      <button
        type="button"
        onClick={() =>
          editor.dispatchCommand(
            FORMAT_TEXT_COMMAND,
            "italic"
          )
        }
        className={`${buttonClass} ${
          formats.italic ? activeClass : ""
        }`}
      >
        Italic
      </button>

      {/* ================= UNDERLINE ================= */}

      <button
        type="button"
        onClick={() =>
          editor.dispatchCommand(
            FORMAT_TEXT_COMMAND,
            "underline"
          )
        }
        className={`${buttonClass} ${
          formats.underline ? activeClass : ""
        }`}
      >
        Underline
      </button>

      {/* ================= H1 ================= */}

      <button
        type="button"
        onClick={() =>
          formatHeading("h1")
        }
        className={`${buttonClass} ${
          blockType === "h1"
            ? activeClass
            : ""
        }`}
      >
        H1
      </button>

      {/* ================= H2 ================= */}

      <button
        type="button"
        onClick={() =>
          formatHeading("h2")
        }
        className={`${buttonClass} ${
          blockType === "h2"
            ? activeClass
            : ""
        }`}
      >
        H2
      </button>

      {/* ================= PARAGRAPH ================= */}

      <button
        type="button"
        onClick={formatParagraph}
        className={`${buttonClass} ${
          blockType === "paragraph"
            ? activeClass
            : ""
        }`}
      >
        P
      </button>

      {/* ================= SINGLE IMAGE ================= */}

      <label
        className="
          px-4
          py-2
          bg-black
          text-white
          rounded-lg
          cursor-pointer
          hover:bg-gray-800
        "
      >
        Insert Image

        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleSingleImage}
          disabled={loading}
        />
      </label>

      {/* ================= IMAGE GALLERY ================= */}

      <label
        className="
          px-4
          py-2
          bg-black
          text-white
          rounded-lg
          cursor-pointer
          hover:bg-gray-800
        "
      >
        Insert Gallery

        <input
          type="file"
          hidden
          multiple
          accept="image/*"
          onChange={handleGallery}
          disabled={loading}
        />
      </label>

      {/* ================= VIDEO ================= */}

      <button
        type="button"
        onClick={handleVideo}
        disabled={loading}
        className="
          px-4
          py-2
          bg-black
          text-white
          rounded-lg
          cursor-pointer
          hover:bg-gray-800
          disabled:opacity-50
        "
      >
        Insert Video
      </button>

      {/* ================= LOADING ================= */}

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
            text-[#fff]
          "
        />
      )}
    </div>
  );
};

export default ToolbarPlugin;