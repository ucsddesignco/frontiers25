import mongoose from 'mongoose';

const DATABASE_URL = process.env.DATABASE_URL;

type Cached = {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongoose: Cached;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB(): Promise<mongoose.Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = { bufferCommands: false };

    cached.promise = mongoose.connect(DATABASE_URL!, opts).then(mongoose => {
      return mongoose.connection;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;

//Adaptation of https://medium.com/@nithishreddy0627/connecting-your-next-js-project-to-mongodb-atlas-using-mongoose-a-step-by-step-guide-2d2552b5d7ca
