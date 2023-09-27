import { v4 as uuid } from 'uuid';

export interface ProductBox {
  id: string;
  title: string;
  feature: string;
  buttonLink: string;
  buttonText: string;
  image: string;
  score: number;
  description: string;
  price: number;
  discountedPrice: number;
}

export const dummyProductBoxData: ProductBox = {
  id: uuid(),
  title: 'Dual band apple watch 5g',
  feature: 'Editor choice',
  buttonLink: 'https://www.nba.com/',
  buttonText: 'View on Amazon',
  image:
    'https://c4.wallpaperflare.com/wallpaper/601/305/95/nike-full-hd-wallpaper-preview.jpg',
  score: 9.7,
  price: 399,
  discountedPrice: 200,
  description: `
        <ul><li>Band Sizes: Fits wrists with a circumference of 135-200 mm</li><li>Display Size: 1.3″ (33.0 mm) 260 x 260 memory-in-pixel (MIP)</li><li>Colors: Black, Shadow Gray or Dust Rose, White, Powder Gray</li></ul><p><br></p><p>This is a sample description of the product, offering users an insight into its features.&nbsp;<strong>Note:</strong>&nbsp;Always make sure to check the product's specifications before purchasing.</p>
        `,
};
