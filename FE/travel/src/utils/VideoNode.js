import { DecoratorNode } from "lexical";

export class VideoNode extends DecoratorNode {
    static getType() {
        return "video";
    }

    static clone(node) {
        return new VideoNode(node.__url, node.__key);
    }

    constructor(url, key) {
        super(key);
        this.__url = url;
    }

    createDOM() {
        const div = document.createElement("div");
        return div;
    }

    updateDOM() {
        return false;
    }

    decorate() {
        return (
            <div className="my-6 w-full aspect-video">
                <iframe
                    src={this.__url}
                    className="w-full h-full rounded-lg"
                    title="Blog video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        );
    }

    exportJSON() {
        return {
            type: "video",
            version: 1,
            url: this.__url,
        };
    }

    static importJSON(serializedNode) {
        return new VideoNode(serializedNode.url);
    }
}

export function $createVideoNode(url) {
    return new VideoNode(url);
}

export function $isVideoNode(node) {
    return node instanceof VideoNode;
}
