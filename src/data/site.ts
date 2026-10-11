// Change shared copy/contact details here. Keep private address/phone details off the public site.
export const site = {
  name: 'Sam Wright',
  title: 'Filmmaker & digital creator',
  description:
    'Film, 3D artwork and interactive projects by Sam Wright. Explore finished work, creative experiments and projects in development.',
  email: 'wrightgamesbusiness@gmail.com',
  location: 'Leeds, UK',
  // Add a public, redacted CV to public/files/ and set its path here when ready.
  cv: null as string | null,
  socials: [
    { label: 'ArtStation', href: 'https://www.artstation.com/samwright8' },
    { label: 'GitHub', href: 'https://github.com/SamWright2004' },
    { label: 'Instagram', href: 'https://www.instagram.com/wright_games_/' },
    { label: 'DeviantArt', href: 'https://www.deviantart.com/samcwright' },
  ],
};

export const categories = [
  {
    id: 'film',
    label: 'Film & editing',
    short: 'Film',
    description: 'Stories shaped through picture, rhythm and sound.',
  },
  {
    id: '3d',
    label: '3D & digital art',
    short: '3D & art',
    description: 'Imagined spaces, atmosphere and visual experiments.',
  },
  {
    id: 'design',
    label: 'Digital design',
    short: 'Design',
    description: 'Visual ideas built to communicate and to be used.',
  },
  {
    id: 'interactive',
    label: 'Games & software',
    short: 'Interactive',
    description: 'Ideas made playable, useful and interactive.',
  },
] as const;
export type Category = (typeof categories)[number]['id'];
export const categoryLabel = (id: string) =>
  categories.find((category) => category.id === id)?.label ?? id;
