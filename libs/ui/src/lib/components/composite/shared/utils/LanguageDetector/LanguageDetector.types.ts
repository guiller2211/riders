export type LanguageDetectorProps = {
  locale: string;
  languages: readonly string[];
  changeLanguage: (locale: string) => void;
}
