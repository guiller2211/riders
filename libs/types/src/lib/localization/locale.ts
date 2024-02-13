export interface Language {
  isocode: string;
  name: string;
}

export interface Locale {
  isocode: string;
  name: string;
  language: Language;
  textDirectionality: TextDirectionality;
}

export enum TextDirectionality {
  LEFT_TO_RIGHT = 'ltr',
  RIGHT_TO_LEFT = 'rtl',
}
