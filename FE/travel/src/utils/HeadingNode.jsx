import { HeadingNode as BaseHeadingNode } from "@lexical/rich-text";

export class HeadingNode extends BaseHeadingNode {
  constructor(tag, key, id) {
    super(tag, key);
    this.__id = id || null;
  }

  getId() {
    return this.__id;
  }

  setId(id) {
    this.getWritable().__id = id;
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      id: this.__id,
    };
  }
}
