import cors from 'cors';
import express from 'express';
import { weatherController } from '../controllers/weatherController';

const apiRouter = express.Router();

apiRouter.use(cors());
apiRouter.use(express.json());
apiRouter.use('/weather/:city', weatherController.weatherInfo);
export default apiRouter;
