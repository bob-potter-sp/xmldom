import './types';

import { DummyAttr } from './dummy/dummy-attr';
import { NodeTypeTS } from './node-types';

export class AttrImpl extends DummyAttr {
  name: string;
  localName: string;

  specified: boolean;
  ownerElement: Element | null = null;

  ownerDocument: Document;

  constructor() {
    super();

    this.nodeType = NodeTypeTS.ATTRIBUTE_NODE;
  }

  get value() {
    return this.nodeValue || '';
  }

  set value(value: string) {
    this.nodeValue = value;
  }

  get textContent() {
    return this.nodeValue;
  }

  set textContent(data: string | null) {
    this.nodeValue = data;
  }
}
