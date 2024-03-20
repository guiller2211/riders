export interface Resource {
  id: string; // User Defined Unique Identifier
  systemId?: string; // System Defined Unique Identifier
  version?: string; // Resource Version
  externalId?: string; // External System Unique Identifier
}
