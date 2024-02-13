export interface CacheConfig {
  container: string;
  ttl: CacheTTLConfig;
  public?: boolean;
}

export interface CacheTTLConfig {
  defaultTTL: number;
  [cache: string]: number;
}
