import { produce } from 'immer';

export type LookupStore<
    Lookup extends Record<string, { key: string; value: any }>
> = {
    [LookupName in keyof Lookup]?: {
        [LookupKey: string]: Lookup[LookupName]['value'];
    };
};

const EMPTY = {};

export class LookupManager<
    T,
    L extends Record<string, { key: string; value: any }>
> {
    constructor(private lookupExtractor: (item: T) => L) {}
    init(): LookupStore<L> {
        return {};
    }
    push(store: LookupStore<L>, item: T): LookupStore<L> {
        const itemLookups = this.lookupExtractor(item);
        return produce(store, (store: any) => {
            for (const [lookupName, lookup] of Object.entries(itemLookups)) {
                if (!store[lookupName]) {
                    store[lookupName] = {};
                }
                store[lookupName][lookup.key] = lookup.value;
            }
        });
    }
    getLookups<K extends keyof LookupStore<L>>(
        store: LookupStore<L>,
        lookupName: K
    ): Required<LookupStore<L>>[K] {
        return store[lookupName] ? store[lookupName] : EMPTY;
    }
}
