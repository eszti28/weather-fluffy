import { OkPacket } from 'mysql';
import { db } from '../data/connections';
import { WeatherInfoDomainModel } from '../models/domain/WeatherInfoDomainModel';
import { WeatherInfoViewModel } from '../models/view/WeatherInfoViewModel';

export const weatherRepository = {
  async getWeatherInfo(city: string): Promise<WeatherInfoDomainModel[]> {
    const query: string = `SELECT * FROM weatherinfo WHERE city = ? ORDER BY id DESC LIMIT 1;`;

    return await db.query<WeatherInfoDomainModel[]>(query, [city]);
  },
  async addWeatherInfo(weatherData: WeatherInfoViewModel): Promise<void> {
    const query: string = `INSERT INTO weatherinfo (date, city, coordlon, coordlat, temperature, pressure, humidity, windSpeed, windDeg, clouds) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    await db.query<OkPacket>(query, [
      weatherData.date.toString(),
      weatherData.city,
      weatherData.coordlon.toString(),
      weatherData.coordlat.toString(),
      weatherData.temperature.toString(),
      weatherData.pressure.toString(),
      weatherData.humidity.toString(),
      weatherData.windSpeed.toString(),
      weatherData.windDeg.toString(),
      weatherData.clouds.toString(),
    ]);
  },
};
