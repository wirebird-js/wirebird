import { IndexedList } from '../IndexedList';

describe('IndexedList', () => {
    interface FooBarBaz {
        id: string;
        foo?: string;
    }

    const simpleList = new IndexedList<FooBarBaz>(_ => _.id);

    it('should init', () => {
        const store = simpleList.init();
        expect(store).toEqual({
            itemsByKey: {},
            itemsKeys: [],
        });
    });

    it('should index by key', () => {
        let store = simpleList.init();
        store = simpleList.push(store, { id: 'one' });
        expect(store).toEqual({
            itemsByKey: {
                one: {
                    id: 'one',
                },
            },
            itemsKeys: ['one'],
        });

        expect(simpleList.getAll(store)).toEqual([{ id: 'one' }]);
        expect(simpleList.getByKey(store, 'one')).toEqual({ id: 'one' });
        expect(simpleList.getByKey(store, 'two')).toEqual(null);
    });
});
