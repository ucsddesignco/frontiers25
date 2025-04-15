// import mongoose from 'mongoose';

// //const DATABASE_URL = TODO

// if (!DATABASE_URL) {
//   throw new Error(
//     'Please define the DATABASE_URL environment variable inside .env.local'
//   );
// }

// type Cache = {
//   conn: mongoose.Connection | null;
//   promise: Promise<mongoose.Connection> | null;
// };

// declare global {
//   var mongoose: Cache;
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function connectDB(): Promise<mongoose.Connection> {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };

//     cached.promise = mongoose.connect(DATABASE_URL!, opts).then((mongoose) => {
//       return mongoose.connection;
//     });
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default connectDB;
