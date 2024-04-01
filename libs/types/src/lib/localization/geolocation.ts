export interface Country {
  isocode: string;
  name: string;
}

export interface RegionData {
  uid: string;
  isocode: string;
  name: string;
}
export interface CommunesData {
  uid: string;
  idRegion?: string;
  isocode: string;
  name: string;
}

export interface State {
  countryIso?: string;
  isocode: string;
  isocodeShort?: string;
  name: string;
}
