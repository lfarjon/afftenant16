import { v4 as uuid } from 'uuid';

interface ProductDetail {
  detail: string;
}

interface ComparisonPoint {
  value: string;
  productsDetails: ProductDetail[];
}

interface Product {
  id: string; // Assuming uuid() returns a string
  title: string;
  badge: string;
  image: string;
  link: string;
  linkText: string;
}

export interface ComparisonTable {
  comparisonPoints: ComparisonPoint[];
  products: Product[];
}

export const dummyComparisonTableData: ComparisonTable = {
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
      title: 'iPhone 13',
      badge: "Editor's Choice",
      image: '',
      linkText: 'Buy now on Amazon',
      link: 'Link to iPhone 13',
    },
    {
      id: uuid(),
      title: 'Samsung Galaxy S21 Ultra',
      badge: 'Top Pick',
      image: '',
      linkText: 'Buy now on Amazon',
      link: 'Link to Samsung Galaxy S21 Ultra',
    },
    {
      id: uuid(),
      title: 'OnePlus 9 Pro',
      badge: 'Best Value',
      image: '',
      linkText: 'Buy now on Amazon',
      link: 'Link to OnePlus 9 Pro',
    },
  ],
} as ComparisonTable;
