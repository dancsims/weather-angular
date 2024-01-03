export type GeoLocationData = GeoLocationData2[]

export interface GeoLocationData2 {
  name: string
  local_names: LocalNames
  lat: number
  lon: number
  country: string
  state: string
}

export interface LocalNames {
  es: string
  vi: string
  en: string
}
