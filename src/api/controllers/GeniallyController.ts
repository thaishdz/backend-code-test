import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Genially from '../../contexts/core/genially/domain/Genially';
import InMemoryGeniallyRepository from '../../contexts/core/genially/infrastructure/InMemoryGeniallyRepository';
import { generateRandomString } from '../../utils/helpers';
import GeniallyNotExist from '../../contexts/core/genially/domain/GeniallyNotExist';
import CreateGeniallyService from '../../contexts/core/genially/application/CreateGeniallyService';
import DBGeniallyRepository from '../../contexts/core/genially/infrastructure/DBGeniallyRepository';


export class GeniallyController {
    createGeniallyService: CreateGeniallyService;

    constructor(private inMemoryGeniallyRepository: InMemoryGeniallyRepository, private dbGeniallyRepository: DBGeniallyRepository) {
        this.createGeniallyService = new CreateGeniallyService(dbGeniallyRepository);
    }

    async create(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()})
        }

        const { name, description } = req.body;

        const request = {
            id: generateRandomString(),
            name,
            description
        }
        
        try {
            const genially = await this.createGeniallyService.execute(request);
            console.log("GeniallyController", genially);
            
            res.status(201).json({id: genially.id});
            
        } catch (error) {
            res.status(500).json({message: "Error saving the new Genially"});
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        try {

            const genially: Genially = await this.inMemoryGeniallyRepository.find(id);
            genially.recordDeleteAt(id);

            await this.inMemoryGeniallyRepository.delete(genially.id);           
            res.status(200).json({ 
                id, 
                delete_at: genially.deletedAt
            });

        } catch (error) {

            if (error instanceof GeniallyNotExist) {
                res.status(404).json({ error: error, message: error.message });
            }
            
            // Another errors ...
            res.status(500).json({ error: error, message: error.message });
        }
    }

    async edit (req: Request, res: Response) {
        const { id } = req.params;
        const { name } = req.body;

        try {

            const genially: Genially = await this.inMemoryGeniallyRepository.find(id);
            const oldName = genially.name;
            genially.edit(name);

            res.status(200).json({ 
                id: genially.id, 
                old_name: oldName, 
                new_name: genially.name, 
                modified_at: genially.modifiedAt,
            });

        } catch (error) {

            if (error instanceof GeniallyNotExist) {
                res.status(404).json({ error: error, message: error.message });
            }
            
            // Another errors ...
            res.status(500).json({ error: error, message: error.message });
        }
    }
}