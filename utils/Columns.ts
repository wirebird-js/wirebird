export enum Columns {
    name = 'Name',
    requestMethod = 'Method',
    responseStatus = 'Status',
    requestURL = 'URL',
}

export type ColumnName = keyof typeof Columns;

export type ColumnsSelection = {
    [CName in ColumnName]?: boolean;
};
