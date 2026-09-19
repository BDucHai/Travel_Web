import {
  DecoratorNode,
  $applyNodeReplacement,
} from "lexical";
import React from "react";

function getGridClass(count) {
  if (count === 2) {
    return "grid-cols-1 sm:grid-cols-2";
  }

  if (count === 3) {
    return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
  }

  if (count === 4) {
    return "grid-cols-1 sm:grid-cols-2";
  }

  // 5 - 6 ảnh
  return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
}

function ImageGalleryComponent({ images }) {
  const gridClass = getGridClass(images.length);

  return (
    <div
      className={`
        grid
        ${gridClass}
        gap-4
        my-4
        w-full
      `}
    >
      {images.map((image, index) => (
        <div
          key={`${image.src}-${index}`}
          className="w-full overflow-hidden rounded-lg"
        >
          <img
            src={image.src}
            alt={image.alt || ""}
            className="
              block
              w-full
              h-auto
              object-cover
              rounded-lg
            "
          />
        </div>
      ))}
    </div>
  );
}

export class ImageGalleryNode extends DecoratorNode {
  __images;

  static getType() {
    return "image-gallery";
  }

  static clone(node) {
    return new ImageGalleryNode(
      node.__images,
      node.__key
    );
  }

  constructor(images = [], key) {
    super(key);
    this.__images = images;
  }

  createDOM() {
    const div = document.createElement("div");

    div.className = "w-full";

    return div;
  }

  updateDOM() {
    return false;
  }

  decorate() {
    return (
      <ImageGalleryComponent
        images={this.__images}
      />
    );
  }

  exportJSON() {
    return {
      type: "image-gallery",
      version: 1,
      images: this.__images,
    };
  }

  static importJSON(serializedNode) {
    return $createImageGalleryNode(
      serializedNode.images || []
    );
  }

  isInline() {
    return false;
  }
}

export function $createImageGalleryNode(images) {
  return $applyNodeReplacement(
    new ImageGalleryNode(images)
  );
}

export function $isImageGalleryNode(node) {
  return node instanceof ImageGalleryNode;
}