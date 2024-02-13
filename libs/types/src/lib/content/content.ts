import type { PagedQuery, Results } from '../misc';
import type { Locale } from '../localization';

export interface ContentItem {
  id: string;
}

export interface PageEntry extends ContentItem {
  slug: string;
  title: string;
}

export interface Page extends PageEntry {
  body: string;
  summary: string;
}

export interface ContentEntry extends ContentItem {
  content: any;
}

export interface ContentQuery extends PagedQuery {
  contentType: string;
  locale: Locale;
}

export interface PageResults extends Results {
  items: PageEntry[];
}

export interface ContentEntryResults extends Results {
  items: PageEntry[];
}
