import { v4 as uuid } from 'uuid';
import { Link } from './links';
import { Feature } from './feature';

export interface RankingCards {
  id: string;
  linkId: string;
  title: string;
  badge: string;
  image: string;
  buttonLink: string;
  buttonText: string;
  ratings: number;
}
export interface ComparisonData {
  rankingCards: RankingCards[];
  features: Feature[];
}

export const createRankingCardsData = (links: Link[]): RankingCards[] => {
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

export const dummyRankingCardsData: RankingCards[] = [
  {
    id: uuid(),
    linkId: '',
    title: 'Dual band apple watch 5g',
    badge: 'Editor choice',
    buttonLink: 'https://www.nba.com/',
    buttonText: 'View on Amazon',
    image: 'assets/placeholders/450x250.png',
    ratings: 9.7,
  },
  {
    id: uuid(),
    linkId: '',
    title: 'Dual band apple watch 5g',
    badge: 'Editor choice',
    buttonLink: 'https://www.nba.com/',
    buttonText: 'View on Amazon',
    image: 'assets/placeholders/450x250.png',
    ratings: 9.7,
  },
  {
    id: uuid(),
    linkId: '',
    title: 'Dual band apple watch 5g',
    badge: 'Editor choice',
    buttonLink: 'https://www.nba.com/',
    buttonText: 'View on Amazon',
    image: 'assets/placeholders/450x250.png',
    ratings: 9.7,
  },
];
