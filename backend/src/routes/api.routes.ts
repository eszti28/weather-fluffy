import cors from 'cors';
import express from 'express';
import { weatherController } from '../controllers/weatherController';

const apiRouter = express.Router();

apiRouter.use(cors());
apiRouter.use(express.json());
apiRouter.get('/weather/:city', weatherController.getWeatherInfo);
apiRouter.post('/weather', weatherController.addWeatherInfo);

export default apiRouter;
