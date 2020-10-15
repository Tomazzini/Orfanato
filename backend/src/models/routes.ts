import { Router } from 'express';
import multer from 'multer';
// instanciando o controller
import OrphanagesController from '../controllers/OrphanagesController';

import uploadConfig from '../config/upload';

const routes = Router();
const upload = multer(uploadConfig);

//listar
routes.get('/orphanages', OrphanagesController.index);
//busca um orfanato especifico
routes.get('/orphanages/:id', OrphanagesController.show);
//inserir
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

export default routes;