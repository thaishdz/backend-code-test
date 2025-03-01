import { Router } from "express";
import { body } from 'express-validator';

import * as healthController from "../controllers/health";
import InMemoryGeniallyRepository from "../../contexts/core/genially/infrastructure/InMemoryGeniallyRepository";
import { GeniallyController } from "../controllers/GeniallyController";
import DBGeniallyRepository from "../../contexts/core/genially/infrastructure/DBGeniallyRepository";

const router = Router();

const inMemoryGeniallyRepository: InMemoryGeniallyRepository = new InMemoryGeniallyRepository();
const dbGeniallyRepository: DBGeniallyRepository = new DBGeniallyRepository();
const geniallyController: GeniallyController = new GeniallyController(inMemoryGeniallyRepository, dbGeniallyRepository);

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