import { LoremIpsum } from 'lorem-ipsum';

export const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 5,
    min: 3,
  },
  wordsPerSentence: {
    max: 4,
    min: 3,
  },
});
