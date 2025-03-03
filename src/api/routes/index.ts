import { Router } from "express";
import { body } from 'express-validator';

import * as healthController from "../controllers/health";
import { GeniallyController } from "../controllers/GeniallyController";
import DBGeniallyRepository from "../../contexts/core/genially/infrastructure/DBGeniallyRepository";
import CreateGeniallyService from "src/contexts/core/genially/application/CreateGeniallyService";
import DeleteGeniallyService from "src/contexts/core/genially/application/DeleteGeniallyService";
import RenameGeniallyService from "src/contexts/core/genially/application/RenameGeniallyService";

const router = Router();

const dbGeniallyRepository: DBGeniallyRepository = new DBGeniallyRepository();
const createGeniallyService: CreateGeniallyService = new CreateGeniallyService(dbGeniallyRepository);
const deleteGeniallyService: DeleteGeniallyService = new DeleteGeniallyService(dbGeniallyRepository);
const renameGeniallyService: RenameGeniallyService = new RenameGeniallyService(dbGeniallyRepository);
const geniallyController: GeniallyController = new GeniallyController(
    createGeniallyService, 
    deleteGeniallyService, 
    renameGeniallyService
);

// Primary app routes
router.get("/", healthController.check); 

// Use Cases

router.post("/genially", [
    body('name')
        .notEmpty().withMessage('A name is required')
        .isLength({min: 3, max: 20}).withMessage('Must be between 3 and 20 characters'),

    body('description')
        .optional()
        .isLength({max: 125})
], geniallyController.create.bind(geniallyController));


router.patch("/genially/:id", geniallyController.edit.bind(geniallyController));
router.delete("/genially/:id", geniallyController.delete.bind(geniallyController));


export default router;