import mongoose from "mongoose";

const mongoPass = process.env.MONGO_PASS
const mongoUser = process.env. MONGO_USER
const DB_url = `mongodb+srv://${mongoUser}:${mongoPass}@dco-internal-tool.zyu6n.mongodb.net/DCo-Frontiers-2025?retryWrites=true&w=majority&appName=DCo-Internal-Tool`

if(!mongoPass){
    throw new Error(
        'mongoose password is undefined'
    );
} else if (!mongoUser){
    throw new Error(
        'mongoose username is undefined'
    );
}

type Cached = {
    conn : mongoose.Connection | null; 
    promise: Promise<mongoose.Connection> | null;
} 

declare global {
    var mongoose: Cached;
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn : null, promise : null}
}

async function connectDB() : Promise<mongoose.Connection> {
    console.log("Connecting to MongoDB...");
    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise) {
        const opts = {bufferCommands: false};

        cached.promise = mongoose.connect(DB_url!, opts)
        .then((mongoose) => {
            return mongoose.connection;
        });
    }
    
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;

//Adaptation of https://medium.com/@nithishreddy0627/connecting-your-next-js-project-to-mongodb-atlas-using-mongoose-a-step-by-step-guide-2d2552b5d7ca
