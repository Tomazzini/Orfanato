import express from  'express';
import 'express-async-errors';
import path from 'path';
import cors from 'cors';
import './database/migrations/connections';

import routes from './models/routes';
import erroHandler from './errors/handler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(erroHandler);

app.listen(3333);

