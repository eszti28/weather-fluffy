import { NextFunction, Request, Response } from 'express';
import { badRequestError } from '../services/generalErrorService';
import { weatherService } from '../services/weatherService';

export const weatherController = {
  async weatherInfo(req: Request, res: Response, next: NextFunction) {
    const { city } = req.params;

    if (!city) {
      next(badRequestError('City is required'));
      return;
    }

    try {
      const weather = await weatherService.weatherInfo(city);
      res.status(200).send(weather);
    } catch (err) {
      next(err);
    }
  },
};
