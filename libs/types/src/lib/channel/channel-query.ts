import type { PagedQuery, Results } from '../misc';
import type { Channel } from './channel';

export interface ChannelQuery extends PagedQuery {
  channelIds?: string[];
}

export interface ChannelResults extends Results {
  items: Channel[];
}
