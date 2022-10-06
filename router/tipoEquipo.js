const { Router } = require('express');
const TipoEquipo = require('../models/TipoEquipo');
const {  validarTipoEquipo } = require('../helpers/validar-tipoEquipo');

const router  = Router();

router.post('/', async function(req, res){
    
    try {

        const validar = validarTipoEquipo(req);
        
        if (validar.length > 0) {
            return res.status(400).send(validar);
        }

        let tipoEquipo = new TipoEquipo();
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaCreacion = new Date();
        tipoEquipo.fechaActualizacion = new Date();

        tipoEquipo = await tipoEquipo.save();
        res.send(tipoEquipo);
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }

});

router.get('/', async function(req, res){
    
    try {
        
        let tipoEquipos = await TipoEquipo.find();
        res.send(tipoEquipos);

    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }

});

router.put('/:tipoEquipoId', async function(req, res){
   
    try {
        let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);
        
        if (!tipoEquipo) {
            return res.status(400).send('Tipo de Equipo no existe');
        }

        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaActualizacion = new Date();

    
        tipoEquipo = await tipoEquipo.save(); // lo guarda en la base de datos
    
        res.send(tipoEquipo);

        
    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }

});

module.exports = router