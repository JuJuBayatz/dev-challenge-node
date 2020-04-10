import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as swaggerUi from 'swagger-ui-express';
import {RegisterRoutes} from './api/routes';
import { requestLoggerMiddleware } from './helpers/request.logger.middleware';
import * as dotenv from 'dotenv';

const app = express();
dotenv.config({ path: '.env.dev' });
app.use(cors());
app.use(bodyParser.json());
app.use(requestLoggerMiddleware);

RegisterRoutes(app);
try{
    const swaggerDocument = require('../swagger.json');
    app.use('/docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
catch(err){
    console.error(err);
}

export {app};