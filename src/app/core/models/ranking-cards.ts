import { v4 as uuid } from 'uuid';

export interface RankingCards {
  id: string;
  title: string;
  feature: string;
  buttonLink: string;
  buttonText: string;
  buttonLink2: string;
  buttonText2: string;
  score: number;
  description: string;
}

export const dummyRankingCardsData: RankingCards[] = [
  {
    id: uuid(),
    title: 'Dual band apple watch 5g',
    feature: 'Editor choice',
    buttonLink: 'https://www.nba.com/',
    buttonText: 'View on Amazon',
    buttonLink2: 'https://www.nba.com/',
    buttonText2: 'View on Amazon',
    score: 9.7,
    description: `
        <ul><li>Band Sizes: Fits wrists with a circumference of 135-200 mm</li><li>Display Size: 1.3″ (33.0 mm) 260 x 260 memory-in-pixel (MIP)</li><li>Colors: Black, Shadow Gray or Dust Rose, White, Powder Gray</li></ul><p><br></p><p>This is a sample description of the product, offering users an insight into its features.&nbsp;<strong>Note:</strong>&nbsp;Always make sure to check the product's specifications before purchasing.</p>
        `,
  },
  {
    id: uuid(),
    title: 'Dual band apple watch 5g',
    feature: 'Editor choice',
    buttonLink: 'https://www.nba.com/',
    buttonText: 'View on Amazon',
    buttonLink2: 'https://www.nba.com/',
    buttonText2: 'View on Amazon',
    score: 9.7,
    description: `
        <ul><li>Band Sizes: Fits wrists with a circumference of 135-200 mm</li><li>Display Size: 1.3″ (33.0 mm) 260 x 260 memory-in-pixel (MIP)</li><li>Colors: Black, Shadow Gray or Dust Rose, White, Powder Gray</li></ul><p><br></p><p>This is a sample description of the product, offering users an insight into its features.&nbsp;<strong>Note:</strong>&nbsp;Always make sure to check the product's specifications before purchasing.</p>
        `,
  },
  {
    id: uuid(),
    title: 'Dual band apple watch 5g',
    feature: 'Editor choice',
    buttonLink: 'https://www.nba.com/',
    buttonText: 'View on Amazon',
    buttonLink2: 'https://www.nba.com/',
    buttonText2: 'View on Amazon',
    score: 9.7,
    description: `
        <ul><li>Band Sizes: Fits wrists with a circumference of 135-200 mm</li><li>Display Size: 1.3″ (33.0 mm) 260 x 260 memory-in-pixel (MIP)</li><li>Colors: Black, Shadow Gray or Dust Rose, White, Powder Gray</li></ul><p><br></p><p>This is a sample description of the product, offering users an insight into its features.&nbsp;<strong>Note:</strong>&nbsp;Always make sure to check the product's specifications before purchasing.</p>
        `,
  },
];
