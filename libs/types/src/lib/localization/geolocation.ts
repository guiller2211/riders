export interface Country {
  isocode: string;
  name: string;
}

export interface Region {
  countryIso?: string;
  isocode: string;
  isocodeShort?: string;
  name: string;
}

export interface State {
  countryIso?: string;
  isocode: string;
  isocodeShort?: string;
  name: string;
}
