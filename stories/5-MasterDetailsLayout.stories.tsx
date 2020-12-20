import { LoremIpsum } from 'lorem-ipsum';
import React, { FC } from 'react';
import { MasterDetailsLayout } from '../components/MasterDetailsLayout';

export default {
    title: 'Master-Details Layout',
};

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4,
    },
    wordsPerSentence: {
        max: 16,
        min: 4,
    },
});

const left = lorem.generateParagraphs(50);
const right = lorem.generateParagraphs(10);
// const right = null;
const toolbar = lorem.generateSentences(2);

export const main: FC = () => {
    return <MasterDetailsLayout left={left} right={right} toolbar={toolbar} />;
};
