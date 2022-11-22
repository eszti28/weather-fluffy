export interface WeatherInfoDomainModel {
  id: number;
  date: string;
  city: string;
  coordlon: number;
  coordlat: number;
  temperature: number;
  pressure: number;
  humidity: number;
  windSpeed: number;
  windDeg: number;
  clouds: number;
}
