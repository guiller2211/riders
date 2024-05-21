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
  uid?: string;
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

export const regions: RegionData[] = [
  { uid: "1", isocode: "CL-AR", name: "Arica y Parinacota" },
  { uid: "2", isocode: "CL-TA", name: "Tarapacá" },
  { uid: "3", isocode: "CL-AN", name: "Antofagasta" },
  { uid: "4", isocode: "CL-AT", name: "Atacama" },
  { uid: "5", isocode: "CL-CO", name: "Coquimbo" },
  { uid: "6", isocode: "CL-VA", name: "Valparaíso" },
  { uid: "7", isocode: "CL-RM", name: "Metropolitana de Santiago" },
  { uid: "8", isocode: "CL-LI", name: "Libertador General Bernardo O'Higgins" },
  { uid: "9", isocode: "CL-ML", name: "Maule" },
  { uid: "10", isocode: "CL-BI", name: "Ñuble" },
  { uid: "11", isocode: "CL-BI", name: "Biobío" },
  { uid: "12", isocode: "CL-AR", name: "Araucanía" },
  { uid: "13", isocode: "CL-LL", name: "Los Ríos" },
  { uid: "14", isocode: "CL-LR", name: "Los Lagos" },
  { uid: "15", isocode: "CL-AY", name: "Aysén del General Carlos Ibáñez del Campo" },
  { uid: "16", isocode: "CL-MG", name: "Magallanes y de la Antártica Chilena" },
];

export const communes: CommunesData[] = [
  { uid: "1", idRegion: "1", isocode: "CL-AR", name: "Arica" },
  { uid: "2", idRegion: "1", isocode: "CL-PN", name: "Putre" },
  { uid: "3", idRegion: "2", isocode: "CL-IA", name: "Iquique" },
  { uid: "4", idRegion: "2", isocode: "CL-PO", name: "Pozo Almonte" },
  { uid: "5", idRegion: "3", isocode: "CL-AN", name: "Antofagasta" },
  { uid: "6", idRegion: "3", isocode: "CL-MS", name: "Mejillones" },
  { uid: "7", idRegion: "4", isocode: "CL-CB", name: "Calama" },
  { uid: "8", idRegion: "4", isocode: "CL-TO", name: "Tocopilla" },
  { uid: "9", idRegion: "5", isocode: "CL-SR", name: "Serena" },
  { uid: "10", idRegion: "5", isocode: "CL-OC", name: "Ovalle" },
  { uid: "11", idRegion: "6", isocode: "CL-VA", name: "Valparaíso" },
  { uid: "12", idRegion: "6", isocode: "CL-QI", name: "Quillota" },
  { uid: "13", idRegion: "7", isocode: "CL-RM", name: "Santiago" },
  { uid: "14", idRegion: "7", isocode: "CL-PU", name: "Puente Alto" },
  { uid: "15", idRegion: "7", isocode: "CL-SB", name: "San Bernardo" },
  { uid: "16", idRegion: "7", isocode: "CL-MA", name: "Maipú" },
  { uid: "17", idRegion: "7", isocode: "CL-PU", name: "Pudahuel" },
  { uid: "18", idRegion: "7", isocode: "CL-PA", name: "Padre Hurtado" },
  { uid: "19", idRegion: "7", isocode: "CL-PI", name: "Pirque" },
  { uid: "20", idRegion: "7", isocode: "CL-PP", name: "Peñaflor" },
  { uid: "21", idRegion: "7", isocode: "CL-ML", name: "Melipilla" },
  { uid: "22", idRegion: "7", isocode: "CL-TP", name: "Talagante" },
  { uid: "23", idRegion: "7", isocode: "CL-LO", name: "Lo Barnechea" },
  { uid: "24", idRegion: "7", isocode: "CL-HE", name: "Huechuraba" },
  { uid: "25", idRegion: "7", isocode: "CL-QT", name: "Quilicura" },
  { uid: "26", idRegion: "7", isocode: "CL-CL", name: "Colina" },
  { uid: "27", idRegion: "7", isocode: "CL-LB", name: "Lampa" },
  { uid: "28", idRegion: "7", isocode: "CL-TL", name: "Til Til" },
  { uid: "29", idRegion: "7", isocode: "CL-PR", name: "Pirque" },
  { uid: "30", idRegion: "7", isocode: "CL-PL", name: "Puente Alto" },
  { uid: "31", idRegion: "7", isocode: "CL-PD", name: "Padre Hurtado" },
  { uid: "32", idRegion: "7", isocode: "CL-CC", name: "Cerrillos" },
  { uid: "33", idRegion: "7", isocode: "CL-CT", name: "Cerro Navia" },
  { uid: "34", idRegion: "7", isocode: "CL-EQ", name: "Estación Central" },
  { uid: "35", idRegion: "7", isocode: "CL-LT", name: "La Cisterna" },
  { uid: "36", idRegion: "7", isocode: "CL-LL", name: "La Florida" },
  { uid: "37", idRegion: "7", isocode: "CL-LM", name: "La Granja" },
  { uid: "38", idRegion: "7", isocode: "CL-LQ", name: "La Pintana" },
  { uid: "39", idRegion: "7", isocode: "CL-LA", name: "La Reina" },
  { uid: "40", idRegion: "7", isocode: "CL-LC", name: "Las Condes" },
  { uid: "41", idRegion: "7", isocode: "CL-LV", name: "Lo Barnechea" },
  { uid: "42", idRegion: "7", isocode: "CL-LH", name: "Lo Espejo" },
  { uid: "43", idRegion: "7", isocode: "CL-LN", name: "Lo Prado" },
  { uid: "44", idRegion: "7", isocode: "CL-MP", name: "Macul" },
  { uid: "45", idRegion: "7", isocode: "CL-MT", name: "Maipú" },
  { uid: "46", idRegion: "7", isocode: "CL-NP", name: "Ñuñoa" },
  { uid: "47", idRegion: "7", isocode: "CL-PE", name: "Pedro Aguirre Cerda" },
  { uid: "48", idRegion: "7", isocode: "CL-PF", name: "Peñaflor" },
  { uid: "49", idRegion: "7", isocode: "CL-PP", name: "Peñalolén" },
  { uid: "50", idRegion: "7", isocode: "CL-PG", name: "Pirque" },
  { uid: "51", idRegion: "7", isocode: "CL-PR", name: "Providencia" },
  { uid: "52", idRegion: "7", isocode: "CL-PH", name: "Pudahuel" },
  { uid: "53", idRegion: "7", isocode: "CL-PO", name: "Puente Alto" },
  { uid: "54", idRegion: "7", isocode: "CL-QC", name: "Quilicura" },
  { uid: "55", idRegion: "7", isocode: "CL-QN", name: "Quinta Normal" },
  { uid: "56", idRegion: "7", isocode: "CL-RE", name: "Recoleta" },
  { uid: "57", idRegion: "7", isocode: "CL-RN", name: "Renca" },
  { uid: "58", idRegion: "7", isocode: "CL-SA", name: "San Bernardo" },
  { uid: "59", idRegion: "7", isocode: "CL-SM", name: "San Miguel" },
  { uid: "60", idRegion: "7", isocode: "CL-SJ", name: "San Joaquín" },
  { uid: "61", idRegion: "7", isocode: "CL-SR", name: "San Ramón" },
  { uid: "62", idRegion: "7", isocode: "CL-SG", name: "Santiago" },
  { uid: "63", idRegion: "7", isocode: "CL-SO", name: "San Miguel" },
  { uid: "64", idRegion: "7", isocode: "CL-SS", name: "San José de Maipo" },
  { uid: "65", idRegion: "7", isocode: "CL-TL", name: "Talagante" },
  { uid: "66", idRegion: "7", isocode: "CL-TT", name: "Til Til" },
  { uid: "67", idRegion: "7", isocode: "CL-VC", name: "Vitacura" },
  { uid: "68", idRegion: "7", isocode: "CL-LH", name: "Lo Herrera" },
  { uid: "15", idRegion: "8", isocode: "CL-RI", name: "Rancagua" },
  { uid: "16", idRegion: "8", isocode: "CL-RC", name: "Rengo" },
  { uid: "17", idRegion: "9", isocode: "CL-CU", name: "Curicó" },
  { uid: "18", idRegion: "9", isocode: "CL-TL", name: "Talca" },
  { uid: "19", idRegion: "10", isocode: "CL-CB", name: "Chillán" },
  { uid: "20", idRegion: "10", isocode: "CL-CQ", name: "Quirihue" },
  { uid: "21", idRegion: "11", isocode: "CL-CC", name: "Concepción" },
  { uid: "22", idRegion: "11", isocode: "CL-CY", name: "Curanilahue" },
  { uid: "23", idRegion: "12", isocode: "CL-TR", name: "Temuco" },
  { uid: "24", idRegion: "12", isocode: "CL-VI", name: "Victoria" },
  { uid: "25", idRegion: "13", isocode: "CL-VR", name: "Valdivia" },
  { uid: "26", idRegion: "13", isocode: "CL-LS", name: "La Unión" },
  { uid: "27", idRegion: "14", isocode: "CL-OS", name: "Osorno" },
  { uid: "28", idRegion: "14", isocode: "CL-PV", name: "Puerto Varas" },
  { uid: "29", idRegion: "15", isocode: "CL-CY", name: "Coyhaique" },
  { uid: "30", idRegion: "15", isocode: "CL-CO", name: "Cochrane" },
  { uid: "31", idRegion: "16", isocode: "CL-PU", name: "Punta Arenas" },
  { uid: "32", idRegion: "16", isocode: "CL-PA", name: "Punta Arenas (Antártica)" },
];

