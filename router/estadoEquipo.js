const { Router } = require('express');
const EstadoEquipo = require('../models/EstadoEquipo');
const {  validarEstadoEquipo } = require('../helpers/validar-estadoEquipo');

const router  = Router();

router.post('/', async function(req, res){
    
    try {
        //console.log(req.body)
        let newEstado = new EstadoEquipo({
            nombre: req.body.nombre,
            estado: req.body.estado,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
        })
        // console.log(newEstado)
        newEstado.save()
        res.status(200).json({code: ' estado creado', estadoEquipo: newEstado})
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }
});

router.get('/', async function(req, res){
    
    try {

        let estadoEquipos = await EstadoEquipo.find();
        res.send(estadoEquipos);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocuarrio un error');
    }

});

router.get('/:estadoEquipoId', async function(req, res){
    try {

        let estadoEquipos =  await EstadoEquipo.findOne({_id:req.params.estadoEquipoId})
        if(estadoEquipos){
            res.status(200).json({code: 'estado de equipo', estadoEquipo:estadoEquipos})
        }

        // let estadoEquipos = await EstadoEquipo.find();
        // res.send(estadoEquipos);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocuarrio un error');
    }

});

router.patch('/:estadoEquipoId', async function(req, res){
    try {
        let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
        
        if (!estadoEquipo) {
            return res.status(400).send('El estado no existe');
        }

        await EstadoEquipo.findByIdAndUpdate(req.params.estadoEquipoId,{
            nombre: req.body.nombre,
            estado: req.body.estado,
            fechaActualizacion: new Date()
        }).then(estado => {
            res.status(200).json({code: 'estado actualizado', estadoEquipo: estado})
        }).catch(err=> console.log(err))

        
    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }
});

router.delete('/:estadoEquipoId/delete', async (req, res) =>{
    let getEstadoEquipo = await EstadoEquipo.findOne({_id: req.params.estadoEquipoId})
    if(getEstadoEquipo){
        await EstadoEquipo.findByIdAndRemove(req.params.estadoEquipoId)
        res.status(200).json({code: 'Tipo de equipo eliminada'})
    }else{
        res.status(401).json({code: 'El tipo de equipo no existe'})
    }
})

module.exports = router