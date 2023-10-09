import { Link } from './links';
import { v4 as uuid } from 'uuid';

export interface Product {
  id: string;
  linkId: string;
  title: string;
  badge: string;
  image: string;
  buttonLink: string;
  buttonText: string;
  ratings: number;
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
});
