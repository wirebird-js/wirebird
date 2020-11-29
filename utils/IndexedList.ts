type KeyExtractorFn<V> = (item: V) => string;

export class IndexedList<T> {
    constructor(
        private readonly keyExtractor: KeyExtractorFn<T>,
        public readonly items: T[] = [],
        public readonly itemsByKey: { [key: string]: T } = {}
    ) {
        Object.freeze(this.items);
        Object.freeze(this.itemsByKey);
        Object.freeze(this);
    }
    push(item: T): IndexedList<T> {
        const key = this.keyExtractor(item);
        return new IndexedList<T>(this.keyExtractor, [...this.items, item], {
            ...this.itemsByKey,
            [key]: item,
        });
    }
    get(key: string): T | undefined {
        return this.itemsByKey[key];
    }
}
