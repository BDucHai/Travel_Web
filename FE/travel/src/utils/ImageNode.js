import { DecoratorNode } from "lexical";
import React from "react";

export class ImageNode extends DecoratorNode {
    __src;
    __alt;

    static getType() {
        return "image";
    }

    static clone(node) {
        return new ImageNode(node.__src, node.__alt, node.__key);
    }

    static importJSON(serializedNode) {
        return new ImageNode(serializedNode.src, serializedNode.alt);
    }

    constructor(src = "", alt = "", key) {
        super(key);

        this.__src = src;
        this.__alt = alt;
    }

    exportJSON() {
        return {
            type: "image",
            version: 1,
            src: this.__src,
            alt: this.__alt,
        };
    }

    createDOM() {
        return document.createElement("span");
    }

    updateDOM() {
        return false;
    }

    decorate() {
        return React.createElement(
            "div",
            {
                className: "relative group my-4",
            },

            [
                React.createElement("img", {
                    key: "img",

                    src: this.__src,

                    alt: this.__alt,

                    className: "w-full rounded-2xl",
                }),

                React.createElement(
                    "button",
                    {
                        key: "btn",

                        onClick: () => {
                            this.remove();
                        },

                        className: `
                        absolute
                        top-3
                        right-3
                        w-8
                        h-8
                        rounded-full
                        bg-black/70
                        text-white
                        hidden
                        group-hover:flex
                        items-center
                        justify-center
                    `,
                    },

                    "✕",
                ),
            ],
        );
    }
}

export function $createImageNode({ src, alt }) {
    return new ImageNode(src, alt);
}
