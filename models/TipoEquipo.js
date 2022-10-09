const {Schema, model} = require('mongoose');

const tipoEquipoSchema = Schema({

    nombre: {
        type: String,
        required: true
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

module.exports = model('TipoEquipo', tipoEquipoSchema)