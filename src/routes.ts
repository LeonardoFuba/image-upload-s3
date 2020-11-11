import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import ImagesController from './controllers/ImagesController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/images", ImagesController.index);

routes.post("/images", upload.single('file'), ImagesController.create );

routes.delete("/images/:id", ImagesController.delete );

export default routes;
