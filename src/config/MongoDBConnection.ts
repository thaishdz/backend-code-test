import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config({path: __dirname+'/.env'});

const connectToDatabase = async () => {
    const { DB_USER, DB_PASSWORD, DB, DB_CLUSTER } = process.env;
    const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB}.4e4li.mongodb.net/?retryWrites=true&w=majority&appName=${DB_CLUSTER}`;    
    try {
        await mongoose.connect(uri);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch(error) {
        console.error("Mongui no quiso contestar", error.message);
    }
}

export default connectToDatabase;