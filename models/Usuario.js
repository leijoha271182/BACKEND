const {Schema, model} = require('mongoose');

const UsuariosSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    estado: {
        type: String,
        required: true,
    },
    fechaCreacion: {
        type: Date,
        required: true
    },
    fechaActualizacion: {
        type: Date,
        required: true
    }


});

module.exports = model('Usuario', UsuariosSchema);