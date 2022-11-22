import { WeatherInfoDomainModel } from '../models/domain/WeatherInfoDomainModel';
import { weatherRepository } from '../repositories/weatherRepository';

export const weatherService = {
  async weatherInfo(city: string): Promise<WeatherInfoDomainModel[] | null> {
    const cityInfo = await weatherRepository.weatherInfo(city);
    if (cityInfo.length !== 0 && '< 10perc') {
      return cityInfo;
    } else {
      return null;
    }
  },
};
