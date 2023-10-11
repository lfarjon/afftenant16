import { Link } from './links';
import { v4 as uuid } from 'uuid';
import { lorem } from './lorem';

export interface Product {
  id: string;
  linkId: string;
  title: string;
  badge?: string;
  image?: string;
  buttonLink: string;
  buttonText: string;
  ratings?: number;
  description?: string;
  pros?: string[];
  cons?: string[];
}

export const createProducts = (links: Link[]): Product[] => {
  return links.map((link) => {
    const linkData = {
      id: uuid(),
      linkId: link.id,
      title: link.title,
      buttonLink: link.url,
      buttonText: 'View product',
      image: link.imageUrl,
      ratings: 4.5,
      badge: 'First choice',
    };
    return linkData;
  });
};

export const createProduct = (link: Link): Product => ({
  id: uuid(),
  linkId: link.id,
  title: link.title,
  buttonLink: link.url,
  buttonText: 'View product',
  image: link.imageUrl,
  ratings: 4.5,
  badge: 'First choice',
  description: lorem.generateParagraphs(1),
});

export const createVSBox = (links: Link[]): Product[] => {
  return links.map((link, i) => {
    const linkData = {
      id: uuid(),
      linkId: link.id,
      title: link.title,
      buttonLink: link.url,
      buttonText: 'View product',
      image: link.imageUrl,
      ratings: 4.5,
      badge: i === 0 ? 'Winner' : 'Loser',
    };
    return linkData;
  });
};

export const createSummaryBox = (link: Link): Product => ({
  id: uuid(),
  linkId: link.id,
  title: link.title,
  image: link.imageUrl,
  buttonLink: link.url,
  ratings: 4.5,
  buttonText: 'View product',
  badge: 'First choice',
  description: lorem.generateParagraphs(8),
  pros: [
    lorem.generateSentences(1),
    lorem.generateSentences(1),
    lorem.generateSentences(1),
    lorem.generateSentences(1),
    lorem.generateSentences(1),
  ],
  cons: [
    lorem.generateSentences(1),
    lorem.generateSentences(1),
    lorem.generateSentences(1),
    lorem.generateSentences(1),
    lorem.generateSentences(1),
  ],
});
