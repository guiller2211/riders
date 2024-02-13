export interface SearchResults<T, U> {
  results: T | Error;
  searchConfig: U;
}
