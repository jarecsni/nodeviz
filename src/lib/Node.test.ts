import {convertJSON} from './Node';
import type {NodeObj} from './Node';

describe('Node', () => {
    it('transforms a single node', () => {
        const node:NodeObj = {
            widgetName: 'x',
            value: {}
        }
        const converted = convertJSON(node);
        expect(converted.children).toBeUndefined();
        expect(converted.parent).toBeUndefined();
        expect(converted.widgetName).toBe('x');
    });
    it('sets the parent correctly', () => {
        const node:NodeObj = {
            widgetName: 'x',
            value: {
            },
            children: [{
                widgetName: 'x',
                value: {
                    someValue: 1,
                    someFunction: () => (2)
                }
            }]
        }
        const converted = convertJSON(node);
        expect(converted.children.length).toBe(1);
        expect(converted.children[0].parent).toBe(converted);
    });
    it('sets works with nested children', () => {
        const node:NodeObj = {
            widgetName: 'x',
            value: {},
            children: [{
                widgetName: 'x',
                value: {},
                children: [
                    {
                        widgetName: 'x',
                        value: {}
                    }
                ]
            }]
        }
        const converted = convertJSON(node);
        expect(converted.children[0].children[0].parent).toBe(converted.children[0]);
    });
});