import { Router } from "express";
import { body } from 'express-validator';

import * as healthController from "../controllers/health";
import InMemoryGeniallyRepository from "../../contexts/core/genially/infrastructure/InMemoryGeniallyRepository";
import { GeniallyController } from "../controllers/GeniallyController";

const router = Router();

const inMemoryGeniallyRepository: InMemoryGeniallyRepository = new InMemoryGeniallyRepository();
const geniallyController: GeniallyController = new GeniallyController(inMemoryGeniallyRepository);

// Primary app routes
router.get("/", healthController.check); 

// Use Cases

router.post("/create", [
    body('name')
        .notEmpty().withMessage('A name is required')
        .isLength({min: 3, max: 20}).withMessage('Must be between 3 and 20 characters'),

    body('description')
        .optional()
        .isLength({max: 125})
], geniallyController.create.bind(geniallyController));



export default router;