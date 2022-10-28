import type {SvelteComponent} from 'svelte';
import {v4 as uuidv4} from 'uuid';

export type NodeObj = {
    widgetName: string,
    value: unknown,
    children?: NodeObj[]
}

export type ManagementAction<T extends object> = {
    iconName:string
    label?:string
    tooltip?:string
    callback(node:Node<T>):void
}

export interface NodeHandler<T extends object> {
    isVisible(node:Node<T>):boolean;
    getManagementActions(node:Node<T>): ManagementAction<T>[]
}

const defaultHandler = {
    isVisible: () => true,
    getManagementActions: () => []
}

interface Args<T extends object> {
    widgetName: string
    value: T
    index: number
    id?: string
    handler?: NodeHandler<T>
}

export class Node<T extends object> {
    private _active:boolean;
    private _componentRef:SvelteComponent;
    private _widgetName:string;
    private _value:T;
    private _id:string;
    private _index:number;
    private _handler: NodeHandler<T>;
    private _children?:Node<T>[];
    private _parent?:Node<T>;
    private _config?:unknown

    constructor({widgetName, value, index, id = uuidv4(), handler = defaultHandler}: Args<T>) {
        this._widgetName = widgetName;
        this._value = value;
        this._id = id;
        this._index = index;
        this._handler = handler;
        this._active = false;
    }
    get id() {
        return this._id;
    }
    get index() {
        return this._index;
    }
    get widgetName() {
        return this._widgetName;
    }
    get active() {
        return this._active;
    }
    get handler() {
        return this._handler;
    }
    set handler(handler: NodeHandler<T>) {
        this._handler = handler;
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
    get config() {
        return this._config;
    }
    set config(configObject: unknown) {
        this._config = configObject;
    }
}

export function convertJSON<T extends object>(json:NodeObj, parentNode?:Node<T>):Node<T> {
    const currentNode = new Node<T>({widgetName: json.widgetName, value: json.value as T, index: 0});
    currentNode.parent = parentNode;
    if (json.children && json.children.length > 0) {
        json.children.forEach(child => {
            currentNode.addChild(convertJSON(child, currentNode));
        });
    }
    return currentNode;   
}