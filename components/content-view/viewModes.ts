export const viewModes = {
    plain: 'Text',
    image: 'Image',
    json : 'JSON',
    xml  : 'XML',
    form : 'Form',
};
export type ViewMode = keyof typeof viewModes;
