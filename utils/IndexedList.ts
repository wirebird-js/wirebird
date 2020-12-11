import { Draft } from '@reduxjs/toolkit';
import produce from 'immer';

type KeyExtractorFn<T> = (item: T) => string;
type IndexKey<T> = keyof T;

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
        private readonly indexNames: IndexKey<T>[] = []
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
    where(
        store: IIndexedListStore<T>,
        property: keyof T,
        value: T[typeof property]
    ): T[] {
        const indexName = this.propertyToIndexName(property);
        const index = store.indices[indexName] || {};
        const indexKey = this.valueToIndexKey(value);
        const keys = index[indexKey] || [];
        return this.getByKeys(store, keys);
    }
    getUniqueValues(store: IIndexedListStore<T>, property: keyof T): string[] {
        const index = store.indices[this.propertyToIndexName(property)] || {};
        return Object.keys(index);
    }
    private getByKeys(store: IIndexedListStore<T>, keys: string[]) {
        return keys.map(k => this.getByKey(store, k)).filter(isNotNull);
    }
    private propertyToIndexName(property: keyof T): string {
        if (typeof property !== 'string') {
            throw new Error('typeof property !== string');
        }
        return property;
    }
    private valueToIndexKey(value: any) {
        return `${value}`;
    }
    private getIndexValue(item: T, indexKey: IndexKey<T>): string {
        return `${item[indexKey]}`;
    }
    private addToIndices(
        store: IIndexedListStore<T>,
        key: string,
        item: T
    ): IIndexedListStore<T> {
        return produce(store, store => {
            for (const indexName of this.indexNames) {
                const indexNameAsString = `${indexName}`;
                if (!store.indices[indexNameAsString]) {
                    store.indices[indexNameAsString] = {};
                }
                const index = store.indices[indexNameAsString];
                const indexValue = this.getIndexValue(item, indexName);
                if (!index[indexValue]) {
                    index[indexValue] = [];
                }
                index[indexValue].push(key);
            }
        });
    }
}
