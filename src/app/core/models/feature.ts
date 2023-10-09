import { Link } from './links';
import { Product } from './product';
import { LoremIpsum } from 'lorem-ipsum';

export interface Feature {
  name: string;
  values: Record<string, string>; // Object where the key is the RankingCard id
}

export const dummyFeatures = ['Feature A', 'Feature B', 'Feature C'];

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 2,
    min: 1,
  },
  wordsPerSentence: {
    max: 4,
    min: 3,
  },
});

export const buildFeatures = (
  products: Product[],
  features: string[]
): Feature[] => {
  const featureObjects: Feature[] = features.map((feature) => {
    const values: Record<string, string> = {};

    // Initialize the values object with empty strings for each RankingCard ID
    products.map((product) => {
      values[product.id] = lorem.generateSentences(1); // Initialize with empty string
    });

    return {
      name: feature,
      values: values,
    };
  });

  return featureObjects;
};

export const buildProductFeatures = (): any[] => {
  let featureObjects: string[] = [];

  dummyFeatures.map(() => {
    featureObjects.push(lorem.generateSentences(1));
  });

  return featureObjects;
};
