import { lorem } from './lorem';
import { Product } from './product';

export interface Feature {
  name: string;
  values: Record<string, string>; // Object where the key is the RankingCard id
}

export const dummyFeatures = ['Feature A', 'Feature B', 'Feature C'];

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
