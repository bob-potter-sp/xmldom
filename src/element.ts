import './types';

import { _appendSingleChild, _visitNode } from './document-utils';
import { DOMExceptionImpl } from './dom-exception';
import { DummyElement } from './dummy/dummy-element';
import { LiveNodeListImpl } from './live-node-list';
import { NodeListImpl } from './node-list';
import { NodeTypeTS } from './node-types';
import { asChildNode, isDocumentFragment, isElement, isProcessingInstruction, isComment } from './utils';

export class ElementImpl extends DummyElement {
  _nsMap: Record<string, string> | null;
  tagName: string;
  attributes: NamedNodeMap;
  localName: string;
  ownerDocument: Document;

  constructor() {
    super();

    this._nsMap = null;
    this.nodeType = NodeTypeTS.ELEMENT_NODE;
  }

  hasAttribute(name: string) {
    return this.getAttributeNode(name) != null;
  }
  getAttribute(name: string) {
    const attr = this.getAttributeNode(name);
    return attr != null ? attr.value || '' : null;
  }
  getAttributeNode(name: string) {
    return this.attributes.getNamedItem(name);
  }
  setAttribute(name: string, value: string) {
    const attr = this.ownerDocument.createAttribute(name);
    //attr.value = attr.nodeValue = '' + value;
    attr.value = attr.nodeValue = value;
    this.setAttributeNode(attr);
  }
  removeAttribute(name: string) {
    const attr = this.getAttributeNode(name);
    if (attr) {
      this.removeAttributeNode(attr);
    }
  }

  // four real opeartion method
  appendChild<T extends Node>(newChild: T): T {
    if (isDocumentFragment(newChild)) {
      return this.insertBefore(newChild, null);
    } else {
      const _newChild = _appendSingleChild(this, asChildNode(newChild));
      return _newChild;
    }
  }
  setAttributeNode(newAttr: Attr) {
    if (this.ownerDocumentInternal() !== newAttr.ownerDocument) {
      throw new DOMExceptionImpl(DOMExceptionImpl.WRONG_DOCUMENT_ERR);
    }

    const oldAttr = this.attributes.setNamedItem(newAttr);
    return oldAttr;
  }
  setAttributeNodeNS(newAttr: Attr) {
    if (this.ownerDocumentInternal() !== newAttr.ownerDocument) {
      throw new DOMExceptionImpl(DOMExceptionImpl.WRONG_DOCUMENT_ERR);
    }

    const oldAttr = this.attributes.setNamedItemNS(newAttr);
    return oldAttr;
  }
  removeAttributeNode(attr: Attr) {
    // console.log(this == oldAttr.ownerElement)
    const oldAttr = this.attributes.removeNamedItem(attr.nodeName);
    return oldAttr;
  }

  // get real attribute name,and remove it by removeAttributeNode
  removeAttributeNS(namespaceURI: string, localName: string) {
    const old = this.getAttributeNodeNS(namespaceURI, localName);
    if (old) {
      this.removeAttributeNode(old);
    }
  }

  hasAttributeNS(namespaceURI: string, localName: string) {
    return this.getAttributeNodeNS(namespaceURI, localName) != null;
  }
  getAttributeNS(namespaceURI: string, localName: string) {
    const attr = this.getAttributeNodeNS(namespaceURI, localName);
    return (attr && attr.value) || '';
  }
  setAttributeNS(namespaceURI: string, qualifiedName: string, value: string) {
    const attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
    //attr.value = attr.nodeValue = '' + value;
    attr.value = attr.nodeValue = value;
    this.setAttributeNode(attr);
  }
  getAttributeNodeNS(namespaceURI: string, localName: string) {
    return this.attributes.getNamedItemNS(namespaceURI, localName);
  }

  getElementsByTagName(tagName: string): any {
    return new LiveNodeListImpl<Element>(this, (base) => {
      const ls: Element[] = [];

      _visitNode(base, (node) => {
        if (node !== base && isElement(node) && (tagName === '*' || node.tagName === tagName)) {
          ls.push(node);
        }
      });
      return ls;
    });
  }
  getElementsByTagNameNS(namespaceURI: string, localName: string): any {
    return new LiveNodeListImpl<Element>(this, (base) => {
      const ls: Element[] = [];
      _visitNode(base, (node) => {
        if (
          node !== base &&
          isElement(node) &&
          (namespaceURI === '*' || node.namespaceURI === namespaceURI) &&
          (localName === '*' || node.localName === localName)
        ) {
          ls.push(node);
        }
      });
      return ls;
    });
  }

  get outerHTML() {
    return this.toString();
  }

  get firstElementChild() {
    const { childNodes } = this;

    for (let i = 0; i < childNodes.length; i++) {
      const child = childNodes.item(i);

      if (isElement(child)) {
        return child;
      }
    }

    return null;
  }

  get children() {
    const collection: NodeListImpl<Element> = new NodeListImpl<Element>();

    const { childNodes } = this;

    for (let i = 0; i < childNodes.length; i++) {
      const child = childNodes.item(i);

      if (isElement(child)) {
        collection.push(child);
      }
    }

    return collection;
  }

  get childElementCount() {
    let counter = 0;
    const { childNodes } = this;

    for (let i = 0; i < childNodes.length; i++) {
      const child = childNodes.item(i);

      if (isElement(child)) {
        counter++;
      }
    }

    return counter;
  }

  get textContent() {
    let node: Node | null = this;

    const buf: string[] = [];
    node = node.firstChild;
    while (node) {
      if (!isProcessingInstruction(node) && !isComment(node)) {
        const content = node.textContent;

        if (content != null) {
          buf.push(content);
        }
      }
      node = node.nextSibling;
    }
    return buf.join('');
  }

  set textContent(data: string | null) {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
    if (data) {
      this.appendChild(this.ownerDocument.createTextNode(data));
    }
  }

  get parentElement(): HTMLElement | null {
    return isElement(this.parentNode) ? this.parentNode as HTMLElement : null;
  }
}
