export interface FooterData {
  aboutHeading: string;
  aboutMessage: string;
  copyright?: string;
  links: LinkData[];
  linkBlocks: LinkBlockData[];
  facebookLink?: string;
  twitterLink?: string;
  instagramLink?: string;
  youtubeLink?: string;
  whatsappLink?: string;
  locale?: string;
  languages?: readonly string[];
  changeLanguage?: (locale: string) => void;
}

export interface LinkData {
  text: string;
  url: string;
}

export interface LinkBlockData {
  heading: string;
  displayHeading: boolean;
  links: LinkData[];
}
