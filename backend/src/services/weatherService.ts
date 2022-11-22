import { DESTRUCTION } from 'dns';
import { WeatherInfoDomainModel } from '../models/domain/WeatherInfoDomainModel';
import { weatherRepository } from '../repositories/weatherRepository';

export const weatherService = {
  async getWeatherInfo(city: string): Promise<WeatherInfoDomainModel[]> {
    const cityInfo = await weatherRepository.getWeatherInfo(city);
    const minutes = this.timeSince(cityInfo[0].date);
    console.log(minutes);
    if (cityInfo.length !== 0 && minutes < 10) {
      console.log('works');
      return cityInfo;
    } else {
      return [];
    }
  },
  async addWeatherInfo(weatherData: any): Promise<void> {
    console.log('gali');
    const mappedWeatherData = {
      date: weatherData.dt,
      city: weatherData.name,
      coordlon: weatherData.coord.lon,
      coordlat: weatherData.coord.lat,
      temperature: weatherData.main.temp,
      pressure: weatherData.main.pressure,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed,
      windDeg: weatherData.wind.deg,
      clouds: weatherData.clouds.all,
    };
    await weatherRepository.addWeatherInfo(mappedWeatherData);
  },

  timeSince(date: number) {
    const dateNow = Date.now();
    let seconds = Math.floor((dateNow - date * 1000) / 1000);
    let interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval);
    }
  },
};
