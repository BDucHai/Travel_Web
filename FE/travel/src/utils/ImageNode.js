import { DecoratorNode } from "lexical";
import React from "react";

function ImageComponent({ src, alt }) {
    return (
        <div className="my-4">
            <img src={src} alt={alt} className="w-full rounded-xl" />
        </div>
    );
}

export class ImageNode extends DecoratorNode {
    __src;
    __alt;

    static getType() {
        return "image";
    }

    static clone(node) {
        return new ImageNode(node.__src, node.__alt, node.__key);
    }

    // ✅ FIX IMPORT
    static importJSON(serializedNode) {
        const { src, alt } = serializedNode;
        return $createImageNode({ src, alt });
    }

    // ✅ FIX EXPORT
    exportJSON() {
        return {
            type: "image",
            version: 1,
            src: this.__src,
            alt: this.__alt,
        };
    }

    constructor(src = "", alt = "", key) {
        super(key);
        this.__src = src;
        this.__alt = alt;
    }

    createDOM() {
        return document.createElement("div");
    }

    updateDOM() {
        return false;
    }

    decorate() {
        return <ImageComponent src={this.__src} alt={this.__alt} />;
    }
}

export function $createImageNode({ src, alt }) {
    return new ImageNode(src, alt);
}
