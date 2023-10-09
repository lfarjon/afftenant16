import { v4 as uuid } from 'uuid';
import { Link } from './links';

export interface ComparisonTableProduct {
  id: string;
  linkId: string;
  title: string;
  badge: string;
  image: string;
  buttonLink: string;
  buttonText: string;
  ratings: number;
  features: string;
}

export const createComparisonTableData = (
  links: Link[]
): ComparisonTableProduct[] =>
  links.map((link: Link) => ({
    id: uuid(),
    linkId: link.id,
    title: link.title,
    badge: "Editor's choice",
    image: link.imageUrl,
    buttonText: 'Buy now',
    buttonLink: link.url,
    ratings: 4.5,
    features: '',
  }));

export const dummyComparisonTableData: ComparisonTableProduct[] = [
  {
    id: uuid(),
    linkId: '',
    title: 'iPhone 13',
    badge: "Editor's Choice",
    image: '',
    buttonText: 'Buy now on Amazon',
    buttonLink: 'Link to iPhone 13',
    ratings: 4.5,
    features: '',
  },
  {
    id: uuid(),
    linkId: '',
    title: 'Samsung Galaxy S21 Ultra',
    badge: 'Top Pick',
    image: '',
    buttonText: 'Buy now on Amazon',
    buttonLink: 'Link to Samsung Galaxy S21 Ultra',
    ratings: 4.5,
    features: '',
  },
  {
    id: uuid(),
    linkId: '',
    title: 'OnePlus 9 Pro',
    badge: 'Best Value',
    image: '',
    buttonText: 'Buy now on Amazon',
    buttonLink: 'Link to OnePlus 9 Pro',
    ratings: 4.5,
    features: '',
  },
];
