import { Draft } from '@reduxjs/toolkit';
import produce from 'immer';
import _ from 'lodash';

type KeyExtractorFn<T> = (item: T) => string;
type keypath = string;

type MaybeDraft<T> = T | Draft<T>;

function undraft<T>(value: MaybeDraft<T>): T {
    return value as T;
}

export interface IIndexedListStore<T> {
    readonly itemsKeys: string[];
    readonly itemsByKey: { [key: string]: T };
    readonly indices: {
        [indexName: string]: { [indexValue: string]: string[] };
    };
}

function isNotNull<T>(v: T | null): v is T {
    return v !== null;
}

export class IndexedList<T> {
    constructor(
        private readonly keyExtractor: KeyExtractorFn<T>,
        private readonly indexers: { [name: string]: keypath } = {}
    ) {}
    init(
        store: MaybeDraft<Partial<IIndexedListStore<T>>> = {}
    ): IIndexedListStore<T> {
        return {
            ...store,
            itemsKeys: [],
            itemsByKey: {},
            indices: {}
        };
    }
    push(
        store: MaybeDraft<IIndexedListStore<T>>,
        item: T
    ): IIndexedListStore<T> {
        const key = this.keyExtractor(item);
        store = undraft(store);
        store = {
            ...store,
            itemsKeys: [...store.itemsKeys, key],
            itemsByKey: {
                ...store.itemsByKey,
                [key]: item
            }
        };

        return this.addToIndices(store, key, item);
    }
    getByKey(store: IIndexedListStore<T>, key: string): T | null {
        return Object.prototype.hasOwnProperty.call(store.itemsByKey, key)
            ? store.itemsByKey[key]
            : null;
    }
    getAll(store: IIndexedListStore<T>): T[] {
        return store.itemsKeys
            .map(k => this.getByKey(store, k))
            .filter(isNotNull);
    }
    where(store: IIndexedListStore<T>, indexName: string, value: any): T[] {
        const index = store.indices[indexName] || {};
        const indexValue = `${value}`;
        const keys = index[indexValue] || [];
        return this.getByKeys(store, keys);
    }
    getUniqueValues(store: IIndexedListStore<T>, indexName: string): string[] {
        const index = store.indices[indexName] || {};
        return Object.keys(index);
    }
    private getByKeys(store: IIndexedListStore<T>, keys: string[]) {
        return keys.map(k => this.getByKey(store, k)).filter(isNotNull);
    }
    private addToIndices(
        store: IIndexedListStore<T>,
        key: string,
        item: T
    ): IIndexedListStore<T> {
        return produce(store, store => {
            for (const [name, path] of Object.entries(this.indexers)) {
                if (!store.indices[name]) {
                    store.indices[name] = {};
                }
                const index = store.indices[name];
                const indexValue = `${_.get(item, path)}`;
                if (!index[indexValue]) {
                    index[indexValue] = [];
                }
                index[indexValue].push(key);
            }
        });
    }
}
