import { db } from '../data/connections';
import { WeatherInfoDomainModel } from '../models/domain/WeatherInfoDomainModel';

export const weatherRepository = {
  async weatherInfo(city: string): Promise<WeatherInfoDomainModel[]> {
    const query: string = `SELECT * FROM weatherinfo WHERE city = ? LIMIT 1;`;

    return await db.query<WeatherInfoDomainModel[]>(query, [city]);
  },
};
