import { GeniallyModel } from "../../domain/schemas/genially.schema";


export const geniallyToCreate = new GeniallyModel({
    id: "hyZWTMmjpX",
    name: "Nuevo genially!"
});


export const geniallyRemoved = new GeniallyModel({
    id: "hyZWTMmjpX",
    name: "Nuevo genially!",
    deletedAt: new Date()
});