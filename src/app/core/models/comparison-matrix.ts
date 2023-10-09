import { v4 as uuid } from 'uuid';
import { Link } from './links';

interface ProductDetail {
  detail: string;
}

interface ComparisonPoint {
  value: string;
  productsDetails: ProductDetail[];
}

interface Product {
  id: string; // Assuming uuid() returns a string
  linkId: string;
  title: string;
  badge: string;
  image: string;
  link: string;
  linkText: string;
}

export interface ComparisonMatrix {
  comparisonPoints: ComparisonPoint[];
  products: Product[];
}

export const createComparisonMatrixData = (
  links: Link[]
): ComparisonMatrix => ({
  comparisonPoints: [
    {
      value: 'Point 1',
      productsDetails: links.map((link: Link) => ({
        detail: 'Detail 1',
      })),
    },
    {
      value: 'Point 2',
      productsDetails: links.map((link: Link) => ({
        detail: 'Detail 2',
      })),
    },
    {
      value: 'Point 3',
      productsDetails: links.map((link: Link) => ({
        detail: 'Detail 3',
      })),
    },
  ],
  products: links.map((link: Link) => ({
    id: uuid(),
    linkId: link.id,
    title: link.title,
    badge: "Editor's choice",
    image: link.imageUrl,
    linkText: 'Buy now',
    link: link.url,
  })),
});

export const dummyComparisonMatrixData: ComparisonMatrix = {
  comparisonPoints: [
    {
      value: 'Screen Size',
      productsDetails: [
        { detail: '6.1 inches' },
        { detail: '6.7 inches' },
        { detail: '6.2 inches' },
      ],
    },
    {
      value: 'Camera',
      productsDetails: [
        { detail: '12MP + 12MP + 12MP' },
        { detail: '108MP + 12MP + 12MP' },
        { detail: '64MP + 12MP' },
      ],
    },
    {
      value: 'Battery Life',
      productsDetails: [
        { detail: 'Up to 17 hours' },
        { detail: 'Up to 20 hours' },
        { detail: 'Up to 18 hours' },
      ],
    },
    {
      value: 'Processor',
      productsDetails: [
        { detail: 'A14 Bionic chip' },
        { detail: 'Snapdragon 888' },
        { detail: 'Exynos 2100' },
      ],
    },
  ],
  products: [
    {
      id: uuid(),
      linkId: '',
      title: 'iPhone 13',
      badge: "Editor's Choice",
      image: '',
      linkText: 'Buy now on Amazon',
      link: 'Link to iPhone 13',
    },
    {
      id: uuid(),
      linkId: '',
      title: 'Samsung Galaxy S21 Ultra',
      badge: 'Top Pick',
      image: '',
      linkText: 'Buy now on Amazon',
      link: 'Link to Samsung Galaxy S21 Ultra',
    },
    {
      id: uuid(),
      linkId: '',
      title: 'OnePlus 9 Pro',
      badge: 'Best Value',
      image: '',
      linkText: 'Buy now on Amazon',
      link: 'Link to OnePlus 9 Pro',
    },
  ],
} as ComparisonMatrix;
