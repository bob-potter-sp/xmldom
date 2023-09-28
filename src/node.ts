import './types';

import { _insertBefore, _removeChild } from './document-utils';
import { DummyNode } from './dummy/dummy-node';
import { NodeTypeTS } from './node-types';
import { cloneNode } from './node-utils';
import { serializeToString } from './serializer/serialize';
import { NodeFilterTS, VisibleNamespaces } from './types';
import { asChildNode, isAttr, isDocument, isElement, isText } from './utils';
import { DocumentPositionTS } from './document-position';
import { NodeListOfImpl } from './node-list-of';

class Relations {
  firstChild: ChildNode | null;
  lastChild: ChildNode | null;
  previousSibling: ChildNode | null;
  nextSibling: ChildNode | null;
  //parentNode: (Node & ParentNode) | null;
  childNodes: NodeListOf<ChildNode>;
}

/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
 */
export class NodeImpl extends DummyNode {
  static readonly ELEMENT_NODE = NodeTypeTS.ELEMENT_NODE;
  static readonly ATTRIBUTE_NODE = NodeTypeTS.ATTRIBUTE_NODE;
  static readonly TEXT_NODE = NodeTypeTS.TEXT_NODE;
  static readonly CDATA_SECTION_NODE = NodeTypeTS.CDATA_SECTION_NODE;
  static readonly ENTITY_REFERENCE_NODE = NodeTypeTS.ENTITY_REFERENCE_NODE;
  static readonly ENTITY_NODE = NodeTypeTS.ENTITY_NODE;

  static readonly PROCESSING_INSTRUCTION_NODE = NodeTypeTS.PROCESSING_INSTRUCTION_NODE;
  static readonly COMMENT_NODE = NodeTypeTS.COMMENT_NODE;
  static readonly DOCUMENT_NODE = NodeTypeTS.DOCUMENT_NODE;
  static readonly DOCUMENT_TYPE_NODE = NodeTypeTS.DOCUMENT_TYPE_NODE;
  static readonly DOCUMENT_FRAGMENT_NODE = NodeTypeTS.DOCUMENT_FRAGMENT_NODE;
  static readonly NOTATION_NODE = NodeTypeTS.NOTATION_NODE;

  _relations: Relations | null = null;

  get firstChild(): ChildNode | null {
    if (this._relations == null) {
      return null;
    }
    return this._relations.firstChild;
  }

  set firstChild(firstChild: ChildNode | null) {
    if (this._relations == null) {
      this._relations = new Relations();
    }
    this._relations.firstChild = firstChild;
  }

  get lastChild(): ChildNode | null {
    if (this._relations == null) {
      return null;
    }
    return this._relations.lastChild;
  }

  set lastChild(lastChild: ChildNode | null) {
    if (this._relations == null) {
      this._relations = new Relations();
    }
    this._relations.lastChild = lastChild;
  }

  get previousSibling(): ChildNode | null {
    if (this._relations == null) {
      return null;
    }
    return this._relations.previousSibling;
  }

  set previousSibling(previousSibling: ChildNode | null) {
    if (this._relations == null) {
      this._relations = new Relations();
    }
    this._relations.previousSibling = previousSibling;
  }

  get nextSibling(): ChildNode | null {
    if (this._relations == null) {
      return null;
    }
    return this._relations.nextSibling;
  }

  set nextSibling(nextSibling: ChildNode | null) {
    if (this._relations == null) {
      this._relations = new Relations();
    }
    this._relations.nextSibling = nextSibling;
  }

  get childNodes(): NodeListOf<ChildNode> {
    if (this._relations == null) {
      return new NodeListOfImpl<ChildNode>();
    }
    return this._relations.childNodes;
  }

  set childNodes(childNodes: NodeListOf<ChildNode>) {
    if (this._relations == null) {
      this._relations = new Relations();
    }
    this._relations.childNodes = childNodes;
  }

  //readonly ELEMENT_NODE = NodeTypeTS.ELEMENT_NODE;
  get ELEMENT_NODE() {
    return NodeTypeTS.ELEMENT_NODE;
  }
  //readonly ATTRIBUTE_NODE = NodeTypeTS.ATTRIBUTE_NODE;
  get ATTRIBUTE_NODE() {
    return NodeTypeTS.ATTRIBUTE_NODE;
  }
  //readonly TEXT_NODE = NodeTypeTS.TEXT_NODE;
  get TEXT_NODE() {
    return NodeTypeTS.TEXT_NODE;
  }
  //readonly CDATA_SECTION_NODE = NodeTypeTS.CDATA_SECTION_NODE;
  get CDATA_SECTION_NODE() {
    return NodeTypeTS.CDATA_SECTION_NODE;
  }
  //readonly ENTITY_REFERENCE_NODE = NodeTypeTS.ENTITY_REFERENCE_NODE;
  get ENTITY_REFERENCE_NODE() {
   return NodeTypeTS.ENTITY_REFERENCE_NODE;
  }
  //readonly ENTITY_NODE = NodeTypeTS.ENTITY_NODE;
  get ENTITY_NODE() {
    return NodeTypeTS.ENTITY_NODE;
  }
  //readonly PROCESSING_INSTRUCTION_NODE = NodeTypeTS.PROCESSING_INSTRUCTION_NODE;
  get PROCESSING_INSTRUCTION_NODE() {
    return NodeTypeTS.PROCESSING_INSTRUCTION_NODE;
  }
  //readonly COMMENT_NODE = NodeTypeTS.COMMENT_NODE;
  get COMMENT_NODE() {
   return NodeTypeTS.COMMENT_NODE;
  }
  //readonly DOCUMENT_NODE = NodeTypeTS.DOCUMENT_NODE;
  get DOCUMENT_NODE() {
   return NodeTypeTS.DOCUMENT_NODE;
  }
  //readonly DOCUMENT_TYPE_NODE = NodeTypeTS.DOCUMENT_TYPE_NODE;
  get DOCUMENT_TYPE_NODE() {
   return NodeTypeTS.DOCUMENT_TYPE_NODE;
  }
  //readonly DOCUMENT_FRAGMENT_NODE = NodeTypeTS.DOCUMENT_FRAGMENT_NODE;
  get DOCUMENT_FRAGMENT_NODE() {
   return NodeTypeTS.DOCUMENT_FRAGMENT_NODE;
  }
  //readonly NOTATION_NODE = NodeTypeTS.NOTATION_NODE;
  get NOTATION_NODE() {
   return NodeTypeTS.NOTATION_NODE;
  }

  static readonly DOCUMENT_POSITION_CONTAINED_BY = DocumentPositionTS.CONTAINED_BY;
  static readonly DOCUMENT_POSITION_CONTAINS = DocumentPositionTS.CONTAINS;
  static readonly DOCUMENT_POSITION_DISCONNECTED = DocumentPositionTS.DISCONNECTED;
  static readonly DOCUMENT_POSITION_FOLLOWING = DocumentPositionTS.FOLLOWING;
  static readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = DocumentPositionTS.IMPLEMENTATION_SPECIFIC;
  static readonly DOCUMENT_POSITION_PRECEDING = DocumentPositionTS.PRECEDING;

  //readonly DOCUMENT_POSITION_CONTAINED_BY = DocumentPositionTS.CONTAINED_BY;
  get DOCUMENT_POSITION_CONTAINED_BY() {
    return DocumentPositionTS.CONTAINED_BY;
  }
  //readonly DOCUMENT_POSITION_CONTAINS = DocumentPositionTS.CONTAINS;
  get DOCUMENT_POSITION_CONTAINS() {
   return DocumentPositionTS.CONTAINS;
  }
  //readonly DOCUMENT_POSITION_DISCONNECTED = DocumentPositionTS.DISCONNECTED;
  get DOCUMENT_POSITION_DISCONNECTED() {
   return DocumentPositionTS.DISCONNECTED;
  }
  //readonly DOCUMENT_POSITION_FOLLOWING = DocumentPositionTS.FOLLOWING;
  get DOCUMENT_POSITION_FOLLOWING() {
   return DocumentPositionTS.FOLLOWING;
  }
  //readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = DocumentPositionTS.IMPLEMENTATION_SPECIFIC;
  get DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC() {
   return DocumentPositionTS.IMPLEMENTATION_SPECIFIC;
  }
  //readonly DOCUMENT_POSITION_PRECEDING = DocumentPositionTS.PRECEDING;
  get DOCUMENT_POSITION_PRECEDING() {
   return DocumentPositionTS.PRECEDING;
  }

  nodeType: number;
  nodeName: string;
  //firstChild: ChildNode | null = null;
  //lastChild: ChildNode | null = null;
  //previousSibling: ChildNode | null = null;
  //nextSibling: ChildNode | null = null;
  parentNode: Node & ParentNode | null = null;
  //childNodes: NodeListOf<ChildNode> = null as never; // todo: use empty list instead of null maybe
  ownerDocument: Document | null;
  nodeValue: string | null = null;
  namespaceURI: string | null = null;
  prefix: string | null = null;

  lineNumber?: number;
  columnNumber?: number;

  // value: string | null = null; // todo: what is the purpose of this

  // ata: string | null = null;

  // Modified in DOM Level 2:
  insertBefore<T extends Node>(newChild: T, refChild: Node | null): T {
    // raises
    const _newChild = _insertBefore(this, asChildNode(newChild), refChild == null ? null : asChildNode(refChild));
    return _newChild;
  }
  replaceChild<T extends Node>(newChild: Node, oldChild: T): T {
    // raises
    this.insertBefore(newChild, oldChild);
    return this.removeChild(oldChild);
  }
  removeChild<T extends Node>(oldChild: T): T {
    const _oldChild = _removeChild(this, oldChild);
    return _oldChild;
  }
  appendChild<T extends Node>(newChild: T): T {
    return this.insertBefore(newChild, null);
  }
  hasChildNodes() {
    return this.firstChild != null;
  }
  cloneNode<T extends Node>(deep: boolean): T {
    if (isDocument(this)) {
      return (cloneNode(this, this, deep) as unknown) as T;
    } else {
      return (cloneNode(this.ownerDocument!, this, deep) as unknown) as T;
    }
  }
  // Modified in DOM Level 2:
  normalize() {
    let child = this.firstChild;
    while (child) {
      const next = child.nextSibling;
      if (next && isText(next) && isText(child)) {
        this.removeChild(next);
        child.appendData(next.data);
      } else {
        child.normalize();
        child = next;
      }
    }
  }
  // Introduced in DOM Level 2:
  isSupported(feature: string, version: string) {
    if (isDocument(this)) {
      return this.implementation.hasFeature(feature, version);
    } else {
      return this.ownerDocument!.implementation.hasFeature(feature, version);
    }
  }
  // Introduced in DOM Level 2:
  hasAttributes() {
    return isElement(this) ? this.attributes.length > 0 : false;
  }
  lookupPrefix(namespaceURI: string): string | null {
    let el: Node | null = this;
    while (el) {
      if (isElement(el)) {
        const map = el._nsMap;
        // console.dir(map)
        if (map) {
          for (const n in map) {
            if (map[n] === namespaceURI) {
              return n;
            }
          }
        }
      }

      el = isAttr(el) ? el.ownerDocument : el.parentNode; // fixme: isn't this reversed ?
    }
    return null;
  }
  // Introduced in DOM Level 3:
  lookupNamespaceURI(prefix: string): string | null {
    let el: Node | null = this;
    while (el) {
      if (isElement(el)) {
        const map = el._nsMap;
        // console.dir(map)
        if (map) {
          if (prefix in map) {
            return map[prefix];
          }
        }
      }

      el = isAttr(el) ? el.ownerDocument : el.parentNode; // fixme: isn't this reversed ?
    }
    return null;
  }
  // Introduced in DOM Level 3:
  isDefaultNamespace(namespaceURI: string) {
    const prefix = this.lookupPrefix(namespaceURI);
    return prefix == null;
  }

  toString(isHtml?: boolean, nodeFilter?: NodeFilterTS) {
    const buf: string[] = [];
    const refNode = (isDocument(this) && this.documentElement) || this;
    let prefix = refNode.prefix;
    const uri = refNode.namespaceURI;

    let visibleNamespaces: VisibleNamespaces | undefined;

    if (uri && prefix == null) {
      // console.log(prefix)
      prefix = refNode.lookupPrefix(uri);
      if (prefix == null) {
        // isHTML = true;
        visibleNamespaces = [
          { namespace: uri, prefix: null },
          // {namespace:uri,prefix:''}
        ];
      }
    }
    serializeToString(this, buf, isHtml, nodeFilter, visibleNamespaces);
    // console.log('###',this.nodeType,uri,prefix,buf.join(''))
    return buf.join('');
  }

  get textContent() {
    return this.nodeValue;
  }
  set textContent(data: string | null) {
    // this.data = data;
    // this.value = data;
    this.nodeValue = data;
  }

  protected ownerDocumentInternal() {
    if (isDocument(this)) {
      return this;
    } else {
      return this.ownerDocument;
    }
  }

  replaceWith(..._nodes: Array<string | Node>): void {
    if (_nodes.length !== 1) {
      throw new Error('Method not implemented.');
    }

    const node = _nodes[0];
    if (!(node instanceof NodeImpl)) {
      throw new Error('Method not implemented.');
    }

    const parentNode = this.parentNode;

    if (parentNode == null) {
      throw new Error('Node does not have parent.');
    }
    parentNode.replaceChild(node, this);
  }

  get isConnected() {
    let node: Node | null = this;

    while (node != null) {
      if (isDocument(node)) {
        return true;
      } else {
        node = node.parentNode;
      }
    }

    return false;
  }
  
}
