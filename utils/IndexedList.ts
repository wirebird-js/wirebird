import { Draft } from '@reduxjs/toolkit';
import _ from 'lodash';

type KeyExtractorFn<T> = (item: T) => string;

type MaybeDraft<T> = T | Draft<T>;

function undraft<T>(value: MaybeDraft<T>): T {
    return value as T;
}

export interface IIndexedListStore<T> {
    readonly itemsKeys: string[];
    readonly itemsByKey: { [key: string]: T };
}

function isNotNull<T>(v: T | null): v is T {
    return v !== null;
}

export class IndexedList<T> {
    constructor(private readonly keyExtractor: KeyExtractorFn<T>) {}
    init(
        store: MaybeDraft<Partial<IIndexedListStore<T>>> = {}
    ): IIndexedListStore<T> {
        return {
            ...store,
            itemsKeys: [],
            itemsByKey: {},
        };
    }
    push(
        store: MaybeDraft<IIndexedListStore<T>>,
        item: T
    ): IIndexedListStore<T> {
        const key = this.keyExtractor(item);
        store = undraft(store);
        return {
            ...store,
            itemsKeys: [...store.itemsKeys, key],
            itemsByKey: {
                ...store.itemsByKey,
                [key]: item,
            },
        };
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
}
