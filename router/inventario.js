const { Router } = require('express');
const Inventario = require('../models/Inventario');
const {  validarInventario } = require('../helpers/validar-inventario');

const router = Router();

router.post('/', async function (req, res) {

    try {

        const validar = validarInventario(req);
        
        if (validar.length > 0) {
            return res.status(400).send(validar);
        }

        const existeSerial = await Inventario.findOne({ serial: req.body.serial });

        if (existeSerial) {
            return res.send('Ya existe el serial en otro equipo').status(400);
        }

        let inventario = new Inventario();

        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.foto = req.body.foto;
        inventario.color = req.body.color;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        inventario.usuario = req.body.usuario._id;
        inventario.marca = req.body.marca._id;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.estadoEquipo = req.body.estadoEquipo._id;
        inventario.fechaCreacion = new Date();
        inventario.fechaActualizacion = new Date();

        inventario = await inventario.save();

        res.send(inventario);




    } catch (error) {

        console.log(error);
        res.status(500).send('Ocurrio un error');

    }



});

router.get('/', async function (req, res) {

    try {

        let inventarios = await Inventario.find().populate([ // populate sirve para hacer un join a las tablas 
            {
                // este path se toma del atributo  que esta en el modelo de inventarios 
                //donde se hace la referencia a la tabla 
                path: 'usuario',
                select: 'nombre email estado'       // select se usa para decir cual es la 
                // informacion que queremos mostrar                
            },
            {
                path: 'marca',
                select: 'nombre'
            },
            {
                path: 'tipoEquipo',
                select: 'nombre'
            },
            {
                path: 'estadoEquipo',
                select: 'nombre estado'
            }
        ]);
        res.send(inventarios);

    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }


});

router.put('/:inventarioId', async function (req, res) {
    try {
        let inventario = await Inventario.findById(req.params.inventarioId);

        if (!inventario) {
            return res.status(400).send('Este producto no existe');
        }

        const existeSerial = await Inventario.findOne({ serial: req.body.serial, _id:{$ne: inventario._id} });
            /* busca en la tabla inventarios si otro id diferente al que quiero actualizar ya tiene el serial
                que quiero ingresar como nuevo
            */
            if (existeSerial) {
            return res.status(400).send('Ya existe el serial en otro equipo');
        }

        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.foto = req.body.foto;
        inventario.color = req.body.color;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        inventario.usuario = req.body.usuario._id;
        inventario.marca = req.body.marca._id;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.estadoEquipo = req.body.estadoEquipo._id;
        inventario.fechaActualizacion = new Date();


        inventario = await inventario.save(); // lo guarda en la base de datos

        res.send(inventario);


    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }
});

module.exports = router