const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        const url = 'mongodb://johaocampo:IUD43181564@ac-qeyz44i-shard-00-00.a0lwtn1.mongodb.net:27017,ac-qeyz44i-shard-00-01.a0lwtn1.mongodb.net:27017,ac-qeyz44i-shard-00-02.a0lwtn1.mongodb.net:27017/?ssl=true&replicaSet=atlas-7xrocr-shard-0&authSource=admin&retryWrites=true&w=majority'


        await mongoose.connect(url);

        console.log("Conexión Exitosa")


    } catch (error) {
        console.log(error);
        throw new error('Error de conexión', error);
    }
}

//     const MONGODB_URI = 'mongodb://johaocampo:IUD43181564@ac-qeyz44i-shard-00-00.a0lwtn1.mongodb.net:27017,ac-qeyz44i-shard-00-01.a0lwtn1.mongodb.net:27017,ac-qeyz44i-shard-00-02.a0lwtn1.mongodb.net:27017/?ssl=true&replicaSet=atlas-7xrocr-shard-0&authSource=admin&retryWrites=true&w=majority'

//     if (!MONGODB_URI) {
//         throw new Error(
//             'Please define the MONGODB_URI environment variable inside .env.local'
//         )
//     }

//     /**
//      * Global is used here to maintain a cached connection across hot reloads
//      * in development. This prevents connections growing exponentially
//      * during API Route usage.
//      */
//     let cached = global.mongoose

//     if (!cached) {
//         cached = global.mongoose = { conn: null, promise: null }
//     }

//     async function dbConnect() {
//         if (cached.conn) {
//             return cached.conn
//         }

//         if (!cached.promise) {
//             const opts = {
//                 bufferCommands: false,
//             }

//             cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//                 return mongoose
//             })
//         }
//         cached.conn = await cached.promise
//         return cached.conn
//     }
// }
module.exports = { getConnection }