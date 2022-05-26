import type {SvelteComponent} from 'svelte';
import {v4 as uuidv4} from 'uuid';

export type NodeObj = {
    package: string,
    value: unknown,
    children?: NodeObj[]
}

export interface NodeHandler {
    isVisible(node:Node<object>):boolean;
}

const defaultHandler = {
    isVisible: () => true
}

export class Node<T extends object> {
    private _active:boolean;
    private _componentRef:SvelteComponent;
    private _package:string;
    private _value:T;
    private _handler: NodeHandler;
    private _children?:Node<T>[];
    private _parent?:Node<T>;
    private _id = uuidv4();
    constructor(pkg: string, value:T, handler:NodeHandler = defaultHandler) {
        this._package = pkg;
        this._value = value;
        this._active = false;
        this._handler = handler;
    }
    get id() {
        return this._id;
    }
    get package() {
        return this._package;
    }
    get type() {
        return this.package + '/' + this.value.constructor.name;
    }
    get active() {
        return this._active;
    }
    getHandler() {
        return this._handler;
    }
    set active(active:boolean) {
        this._active = active;
    }
    get componentRef() {
        return this._componentRef;
    }
    set componentRef(componentRef:SvelteComponent) {
        this._componentRef = componentRef;
    }
    get value() {
        return this._value;
    }
    set value(v:T) {
        this._value = v;
    }
    get children() {
        return this._children;
    }
    get parent() {
        return this._parent;
    }
    set parent(parent:Node<T>) {
        this._parent = parent;
    }
    addChild(child:Node<T>) {
        if (!this._children) {
            this._children = [];
        }
        child.parent = this;
        this._children.push(child);
    }
}

export function convertJSON<T extends object>(json:NodeObj, parentNode?:Node<T>):Node<T> {
    const currentNode = new Node<T>(json.package, json.value as T);
    currentNode.parent = parentNode;
    if (json.children && json.children.length > 0) {
        json.children.forEach(child => {
            currentNode.addChild(convertJSON(child, currentNode));
        });
    }
    return currentNode;   
}