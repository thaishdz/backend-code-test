import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { generateRandomString } from '../../utils/helpers';
import GeniallyNotExist from '../../contexts/core/genially/domain/GeniallyNotExist';
import CreateGeniallyService from '../../contexts/core/genially/application/CreateGeniallyService';
import DeleteGeniallyService from '../../contexts/core/genially/application/DeleteGeniallyService';
import { IGeniallyDocument } from '../../types/genially.document'
import RenameGeniallyService from '../../contexts/core/genially/application/RenameGeniallyService';

export class GeniallyController {
    constructor(
        private createGeniallyService: CreateGeniallyService,
        private deleteGeniallyService: DeleteGeniallyService,
        private renameGeniallyService: RenameGeniallyService
    ) {}

    async create(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()})
        }

        const { name, description } = req.body;

        const request = {
            //id: generateRandomString(),
            name,
            description
        }
        
        try {
            const genially = await this.createGeniallyService.execute(request);        
            res.status(201).json({id: genially._id, createdAt: genially.createdAt});
            
        } catch (error) {
            res.status(500).json({message: "Error saving the new Genially"});
        }
    }

    async delete(req: Request, res: Response) {
        const { _id } = req.params;

        try {
            await this.deleteGeniallyService.execute(_id);        
            res.status(200).json({_id});

        } catch (error) {

            if (error instanceof GeniallyNotExist) {
                res.status(404).json({ error: error, message: error.message });
            } else {
                // Another errors ...
                res.status(500).json({ error: error, message: error.message });
            }

        }
    }

    async edit(req: Request, res: Response) {
        const { _id } = req.params;
        const { name } = req.body;

        try {
            const genially : IGeniallyDocument = await this.renameGeniallyService.execute(_id, name);
            res.status(200).json({
                id: genially.id, 
                modified_at: genially.updatedAt,
            });

        } catch (error) {

            if (error instanceof GeniallyNotExist) {
                res.status(404).json({ error, message: error.message });
            } else {
                res.status(500).json({error, message: error.message })
            }
        }
    }
}