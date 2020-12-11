import { IndexedList } from '../IndexedList';

describe('IndexedList', () => {
    interface FooBarBaz {
        id: string;
        foo?: string;
        bar?: number;
        baz?: boolean;
        meta?: {
            pid: number;
        };
    }

    const simpleList = new IndexedList<FooBarBaz>(_ => _.id);
    const multipleIndexList = new IndexedList<FooBarBaz>(_ => _.id, {
        foo: 'foo',
        bar: 'bar',
        baz: 'baz',
        pid: 'meta.pid'
    });

    it('should init', () => {
        const store = simpleList.init();
        expect(store).toEqual({
            indices: {},
            itemsByKey: {},
            itemsKeys: []
        });
    });

    it('should index by key', () => {
        let store = simpleList.init();
        store = simpleList.push(store, { id: 'one' });
        expect(store).toEqual({
            indices: {},
            itemsByKey: {
                one: {
                    id: 'one'
                }
            },
            itemsKeys: ['one']
        });

        expect(simpleList.getAll(store)).toEqual([{ id: 'one' }]);
        expect(simpleList.getByKey(store, 'one')).toEqual({ id: 'one' });
        expect(simpleList.getByKey(store, 'two')).toEqual(null);
    });

    it('should create multiple indices', () => {
        let store = multipleIndexList.init();
        store = multipleIndexList.push(store, {
            id: '1',
            foo: 'foo1',
            bar: 101,
            baz: true
        });
        store = multipleIndexList.push(store, {
            id: '2',
            foo: 'foo2',
            bar: 102,
            baz: false
        });

        expect(store).toEqual({
            indices: {
                bar: {
                    '101': ['1'],
                    '102': ['2']
                },
                baz: {
                    false: ['2'],
                    true: ['1']
                },
                foo: {
                    foo1: ['1'],
                    foo2: ['2']
                }
            },
            itemsByKey: {
                '1': {
                    bar: 101,
                    baz: true,
                    foo: 'foo1',
                    id: '1'
                },
                '2': {
                    bar: 102,
                    baz: false,
                    foo: 'foo2',
                    id: '2'
                }
            },
            itemsKeys: ['1', '2']
        });

        expect(multipleIndexList.where(store, 'bar', 102)).toEqual([
            {
                bar: 102,
                baz: false,
                foo: 'foo2',
                id: '2'
            }
        ]);
        expect(multipleIndexList.where(store, 'bar', 103)).toEqual([]);
    });
    it('should select by deep index', () => {
        let store = multipleIndexList.init();
        store = multipleIndexList.push(store, {
            id: '1',
            meta: { pid: 1000 }
        });
        store = multipleIndexList.push(store, {
            id: '2',
            meta: { pid: 2000 }
        });
        expect(multipleIndexList.where(store, 'pid', 1000)).toEqual([
            {
                id: '1',
                meta: {
                    pid: 1000
                }
            }
        ]);
        expect(multipleIndexList.where(store, 'pid', 2000)).toEqual([
            {
                id: '2',
                meta: {
                    pid: 2000
                }
            }
        ]);
        expect(multipleIndexList.getUniqueValues(store, 'pid')).toEqual([
            '1000',
            '2000'
        ]);
    });
});
