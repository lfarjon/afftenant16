export interface TailwindColor {
  name: string;
  colors: {
    tint: string;
    value: string;
  }[];
}

export const tailwindThemes = [
  {
    name: 'aqua',
    colorScheme: 'dark',
    primary: '#09ecf3',
    primaryContent: '#005355',
    secondary: '#966fb3',
    accent: '#ffe999',
    neutral: '#3b8ac4',
    base100: '#345da7',
    info: '#2563eb',
    success: '#16a34a',
    warning: '#d97706',
    error: '#dc2626',
  },
  {
    name: 'black',
    colorScheme: 'dark',
    primary: '#343232',
    secondary: '#343232',
    accent: '#343232',
    base100: '#000000',
    base200: '#0D0D0D',
    base300: '#1A1919',
    neutral: '#272626',
    neutralFocus: '#343232',
    info: '#0000ff',
    success: '#008000',
    warning: '#ffff00',
    error: '#ff0000',
  },
  {
    name: 'bumblebee',
    colorScheme: 'light',
    primary: '#f9d72f',
    primaryContent: '#181830',
    secondary: '#e0a82e',
    secondaryContent: '#181830',
    accent: '#DC8850',
    neutral: '#181830',
    base100: '#ffffff',
  },
  {
    name: 'cmyk',
    colorScheme: 'light',
    primary: '#45AEEE',
    secondary: '#E8488A',
    accent: '#FFF232',
    neutral: '#1a1a1a',
    base100: '#ffffff',
    info: '#4AA8C0',
    success: '#823290',
    warning: '#EE8133',
    error: '#E93F33',
  },
  {
    name: 'corporate',
    colorScheme: 'light',
    primary: '#4b6bfb',
    secondary: '#7b92b2',
    accent: '#67cba0',
    neutral: '#181a2a',
    neutralContent: '#edf2f7',
    base100: '#ffffff',
    baseContent: '#181a2a',
  },
  {
    name: 'cupcake',
    colorScheme: 'light',
    primary: '#65c3c8',
    secondary: '#ef9fbc',
    accent: '#eeaf3a',
    neutral: '#291334',
    base100: '#faf7f5',
    base200: '#efeae6',
    base300: '#e7e2df',
    baseContent: '#291334',
  },
  {
    name: 'cyberpunk',
    colorScheme: 'light',
    fontFamily:
      'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace',
    primary: '#ff7598',
    secondary: '#75d1f0',
    accent: '#c07eec',
    neutral: '#423f00',
    neutralContent: '#ffee00',
    base100: '#ffee00',
  },
  {
    name: 'dark',
    colorScheme: 'dark',
    primary: '#661AE6',
    primaryContent: '#ffffff',
    secondary: '#D926AA',
    secondaryContent: '#ffffff',
    accent: '#1FB2A5',
    accentContent: '#ffffff',
    neutral: '#2a323c',
    neutralContent: '#A6ADBB',
    base100: '#1d232a',
    base200: '#191e24',
    base300: '#15191e',
    baseContent: '#A6ADBB',
  },
  {
    name: 'dracula',
    colorScheme: 'dark',
    primary: '#ff79c6',
    secondary: '#bd93f9',
    accent: '#ffb86c',
    neutral: '#414558',
    base100: '#282a36',
    baseContent: '#f8f8f2',
    info: '#8be9fd',
    success: '#50fa7b',
    warning: '#f1fa8c',
    error: '#ff5555',
  },
  {
    name: 'emerald',
    colorScheme: 'light',
    primary: '#66cc8a',
    primaryContent: '#223D30',
    secondary: '#377cfb',
    secondaryContent: '#f9fafb',
    accent: '#ea5234',
    accentContent: '#f9fafb',
    neutral: '#333c4d',
    neutralContent: '#f9fafb',
    base100: '#ffffff',
    baseContent: '#333c4d',
  },
  {
    name: 'fantasy',
    colorScheme: 'light',
    primary: '#6e0b75',
    secondary: '#007ebd',
    accent: '#f8860d',
    neutral: '#1f2937',
    base100: '#ffffff',
    baseContent: '#1f2937',
  },
  {
    name: 'forest',
    colorScheme: 'dark',
    primary: '#1eb854',
    primaryContent: '#000000',
    secondary: '#1DB88E',
    accent: '#1DB8AB',
    neutral: '#19362D',
    base100: '#171212',
  },
  {
    name: 'garden',
    colorScheme: 'light',
    primary: '#F40076',
    secondary: '#8E4162',
    accent: '#5c7f67',
    neutral: '#291E00',
    neutralContent: '#e9e7e7',
    base100: '#e9e7e7',
    baseContent: '#100f0f',
  },
  {
    name: 'halloween',
    colorScheme: 'dark',
    primary: '#f28c18',
    primaryContent: '#131616',
    secondary: '#6d3a9c',
    accent: '#51a800',
    accentContent: '#000000',
    neutral: '#2F1B05',
    base100: '#212121',
    info: '#2563eb',
    success: '#16a34a',
    warning: '#d97706',
    error: '#dc2626',
  },
  {
    name: 'light',
    colorScheme: 'light',
    primary: '#570df8',
    primaryContent: '#E0D2FE',
    secondary: '#f000b8',
    secondaryContent: '#FFD1F4',
    accent: '#1ECEBC',
    accentContent: '#07312D',
    neutral: '#2B3440',
    neutralContent: '#D7DDE4',
    base100: '#ffffff',
    base200: '#F2F2F2',
    base300: '#E5E6E6',
    baseContent: '#1f2937',
  },
  {
    name: 'lofi',
    colorScheme: 'light',
    primary: '#0D0D0D',
    primaryContent: '#ffffff',
    secondary: '#1A1919',
    secondaryContent: '#ffffff',
    accent: '#262626',
    accentContent: '#ffffff',
    neutral: '#000000',
    neutralContent: '#ffffff',
    base100: '#ffffff',
    base200: '#F2F2F2',
    base300: '#E6E5E5',
    baseContent: '#000000',
    info: '#0070F3',
    infoContent: '#ffffff',
    success: '#21CC51',
    successContent: '#000000',
    warning: '#FF6154',
    warningContent: '#ffffff',
    error: '#DE1C8D',
    errorContent: '#ffffff',
  },
  {
    name: 'luxury',
    colorScheme: 'dark',
    primary: '#ffffff',
    secondary: '#152747',
    accent: '#513448',
    neutral: '#331800',
    neutralContent: '#FFE7A3',
    base100: '#09090b',
    base200: '#171618',
    base300: '#2e2d2f',
    baseContent: '#dca54c',
    info: '#66c6ff',
    success: '#87d039',
    warning: '#e2d562',
    error: '#ff6f6f',
  },
  {
    name: 'pastel',
    colorScheme: 'light',
    primary: '#d1c1d7',
    secondary: '#f6cbd1',
    accent: '#b4e9d6',
    neutral: '#70acc7',
    base100: '#ffffff',
    base200: '#f9fafb',
    base300: '#d1d5db',
  },
  {
    name: 'retro',
    colorScheme: 'light',
    primary: '#ef9995',
    primaryContent: '#282425',
    secondary: '#a4cbb4',
    secondaryContent: '#282425',
    accent: '#DC8850',
    accentContent: '#282425',
    neutral: '#2E282A',
    neutralContent: '#EDE6D4',
    base100: '#e4d8b4',
    base200: '#DBCA9A',
    base300: '#D4BF87',
    baseContent: '#282425',
    info: '#2563eb',
    success: '#16a34a',
    warning: '#d97706',
    error: '#dc2626',
  },
  {
    name: 'synthwave',
    colorScheme: 'dark',
    primary: '#e779c1',
    secondary: '#58c7f3',
    accent: '#f3cc30',
    neutral: '#221551',
    neutralContent: '#f9f7fd',
    base100: '#1a103d',
    baseContent: '#f9f7fd',
    info: '#53c0f3',
    infoContent: '#201047',
    success: '#71ead2',
    successContent: '#201047',
    warning: '#f3cc30',
    warningContent: '#201047',
    error: '#e24056',
    errorContent: '#f9f7fd',
  },
  {
    name: 'valentine',
    colorScheme: 'light',
    primary: '#e96d7b',
    secondary: '#a991f7',
    accent: '#88dbdd',
    neutral: '#af4670',
    neutralContent: '#f0d6e8',
    base100: '#f0d6e8',
    baseContent: '#632c3b',
    info: '#2563eb',
    success: '#16a34a',
    warning: '#d97706',
    error: '#dc2626',
  },
  {
    name: 'wireframe',
    colorScheme: 'light',
    fontFamily: 'Chalkboard,comic sans ms,"sanssecondaryerif"',
    primary: '#b8b8b8',
    secondary: '#b8b8b8',
    accent: '#b8b8b8',
    neutral: '#ebebeb',
    base100: '#ffffff',
    base200: '#eeeeee',
    base300: '#dddddd',
    info: '#0000ff',
    success: '#008000',
    warning: '#a6a659',
    error: '#ff0000',
  },
  {
    name: 'autumn',
    colorScheme: 'light',
    primary: '#8C0327',
    secondary: '#D85251',
    accent: '#D59B6A',
    neutral: '#826A5C',
    base100: '#f1f1f1',
    info: '#42ADBB',
    success: '#499380',
    warning: '#E97F14',
    error: '#DF1A2F',
  },
  {
    name: 'business',
    colorScheme: 'dark',
    primary: '#1C4E80',
    secondary: '#7C909A',
    accent: '#EA6947',
    neutral: '#23282E',
    base100: '#202020',
    info: '#0091D5',
    success: '#6BB187',
    warning: '#DBAE59',
    error: '#AC3E31',
  },
  {
    name: 'acid',
    colorScheme: 'light',
    primary: '#FF00F4',
    secondary: '#FF7400',
    accent: '#CBFD03',
    neutral: '#191A3F',
    base100: '#fafafa',
    info: '#3194F6',
    success: '#5FC992',
    warning: '#F7DE2D',
    error: '#E60300',
  },
  {
    name: 'lemonade',
    colorScheme: 'light',
    primary: '#519903',
    secondary: '#E9E92E',
    accent: '#F7F9CA',
    neutral: '#191A3F',
    base100: '#ffffff',
    info: '#C8E1E7',
    success: '#DEF29F',
    warning: '#F7E589',
    error: '#F2B6B5',
  },
  {
    name: 'night',
    colorScheme: 'dark',
    primary: '#38bdf8',
    secondary: '#818CF8',
    accent: '#F471B5',
    neutral: '#1E293B',
    neutralFocus: '#273449',
    base100: '#0F172A',
    info: '#0CA5E9',
    infoContent: '#000000',
    success: '#2DD4BF',
    warning: '#F4BF50',
    error: '#FB7085',
  },
  {
    name: 'coffee',
    colorScheme: 'dark',
    primary: '#DB924B',
    secondary: '#263E3F',
    accent: '#10576D',
    neutral: '#120C12',
    base100: '#20161F',
    baseContent: '#756E63',
    info: '#8DCAC1',
    success: '#9DB787',
    warning: '#FFD25F',
    error: '#FC9581',
  },
  {
    name: 'winter',
    colorScheme: 'light',
    primary: '#047AFF',
    secondary: '#463AA2',
    accent: '#C148AC',
    neutral: '#021431',
    base100: '#ffffff',
    base200: '#F2F7FF',
    base300: '#E3E9F4',
    baseContent: '#394E6A',
    info: '#93E7FB',
    success: '#81CFD1',
    warning: '#EFD7BB',
    error: '#E58B8B',
  },
];
