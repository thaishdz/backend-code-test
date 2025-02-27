import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Genially from '../../contexts/core/genially/domain/Genially';
import InMemoryGeniallyRepository from '../../contexts/core/genially/infrastructure/InMemoryGeniallyRepository';
import { generateRandomString } from '../../utils/helpers';

export class GeniallyController {

    constructor(private inMemoryGeniallyRepository: InMemoryGeniallyRepository){
        console.log("InMemoryGeniallyRepository:", inMemoryGeniallyRepository);
    }

    async create(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()})
        }

        const id = generateRandomString();
        const { name, description } = req.body;

        const newGenially: Genially = new Genially(id, name, description);
        
        try {
            await this.inMemoryGeniallyRepository.save(newGenially);

            res.status(201).json({
                id: newGenially.id,
                message: "created"
            });
            
        } catch (error) {
            res.status(500).json({
                message: "Error saving the new Genially",
                error: error.message
            });
        }
    }
}