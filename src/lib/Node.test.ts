import {convertJSON} from './Node';
import type {NodeObj} from './Node';

describe('Node', () => {
    it('transforms a single node', () => {
        const node:NodeObj = {
            package: 'x',
            value: {}
        }
        const converted = convertJSON(node);
        expect(converted.children).toBeUndefined();
        expect(converted.parent).toBeUndefined();
        expect(converted.type).toBe('x/Object');
    });
    it('sets the parent correctly', () => {
        const node:NodeObj = {
            package: 'x',
            value: {
            },
            children: [{
                package: 'x',
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
            package: 'x',
            value: {},
            children: [{
                package: 'x',
                value: {},
                children: [
                    {
                        package: 'x',
                        value: {}
                    }
                ]
            }]
        }
        const converted = convertJSON(node);
        expect(converted.children[0].children[0].parent).toBe(converted.children[0]);
    });
});