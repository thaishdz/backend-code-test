import { Schema, model } from "mongoose";

const counterSchema = new Schema({
    name: { type: String, require:true, unique:true },
    count: { type: Number, default: 0 }
});


const Counter = model('Counter', counterSchema);

export default Counter;