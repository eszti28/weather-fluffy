import { NextFunction, Request, Response } from 'express';
import {
  badRequestError,
  notFoundError,
} from '../services/generalErrorService';
import { weatherService } from '../services/weatherService';

export const weatherController = {
  async getWeatherInfo(req: Request, res: Response, next: NextFunction) {
    const { city } = req.params;

    if (!city) {
      next(badRequestError('City is required'));
      return;
    }

    try {
      const weather = await weatherService.getWeatherInfo(city);
      res.status(200).json(weather);
    } catch (err) {
      next(err);
    }
  },
  async addWeatherInfo(req: Request, res: Response, next: NextFunction) {
    const { weatherData } = req.body;

    if (!weatherData) {
      next(notFoundError('City not found'));
      return;
    }

    try {
      await weatherService.addWeatherInfo(weatherData);
      res.status(200).json();
    } catch (err) {
      next(err);
    }
  },
};
