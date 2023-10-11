import { lorem } from './lorem';
import { Product } from './product';

export interface GlobalFeature {
  name: string;
  values: Record<string, string>; // Object where the key is the RankingCard id
}

export interface LocalFeature {
  name: string;
  value: string; // Object where the key is the RankingCard id
}

export const dummyFeatures = ['Feature A', 'Feature B', 'Feature C'];

export const buildGlobalFeatures = (
  products: Product[],
  features: string[]
): GlobalFeature[] => {
  const featureObjects: GlobalFeature[] = features.map((feature) => {
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

export const addLocalFeaturesToProducts = (products: Product[]): Product[] => {
  products.map((product) => {
    const localFeatures = dummyFeatures.map((feature) => {
      return {
        name: feature,
        value: lorem.generateSentences(1),
      };
    });
    product.localFeatures = localFeatures;
    return product;
  });
  return products;
};

export const addLocalFeaturesToProduct = (product: Product): Product => {
  const localFeatures = dummyFeatures.map((feature) => {
    return {
      name: feature,
      value: lorem.generateSentences(1),
    };
  });
  product.localFeatures = localFeatures;

  return product;
};
