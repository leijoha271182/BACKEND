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
module.exports = { getConnection }