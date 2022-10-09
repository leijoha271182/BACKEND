const { Router } = require('express');
const Inventario = require('../models/Inventario');
const { validarInventario } = require('../helpers/validar-inventario');

const router = Router();

router.post('/', async function (req, res) {

    try {

        const existeSerial = await Inventario.findOne({ serial: req.body.serial });

        if (existeSerial) {
            return res.status(401).json({
                code: 'Producto existente'
            })
        } else {
            let newInventario = new Inventario({
                serial: req.body.serial,
                modelo: req.body.modelo,
                descripcion: req.body.descripcion,
                foto: req.body.foto,
                color: req.body.color,
                fechaCompra: req.body.fechaCompra,
                precio: req.body.precio,
                usuario: req.body.usuario._id,
                marca: req.body.marca._id,
                tipoEquipo: req.body.tipoEquipo._id,
                estadoEquipo: req.body.estadoEquipo._id,
                fechaCreacion: new Date(),
                fechaActualizacion: new Date()
            })

            newInventario.save();

            return res.status(200).json({
                codigo: 'inventario creado',
                inventario: newInventario
            });
        }
        // let inventario = new Inventario();

        // inventario.serial = req.body.serial;
        // inventario.modelo = req.body.modelo;
        // inventario.descripcion = req.body.descripcion;
        // inventario.foto = req.body.foto;
        // inventario.color = req.body.color;
        // inventario.fechaCompra = req.body.fechaCompra;
        // inventario.precio = req.body.precio;
        // inventario.usuario = req.body.usuario._id;
        // inventario.marca = req.body.marca._id;
        // inventario.tipoEquipo = req.body.tipoEquipo._id;
        // inventario.estadoEquipo = req.body.estadoEquipo._id;
        // inventario.fechaCreacion = new Date();
        // inventario.fechaActualizacion = new Date();

        // inventario = await inventario.save();

        // res.send(inventario);
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
        res.status(200).json({codido: 'inventario encontrado', inventarios: inventarios});

    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }
});

router.get('/:inventarioId', async function (req, res) {
    try {
        let inventarios = await Inventario.findOne({_id:req.params.inventarioId}).populate([ // populate sirve para hacer un join a las tablas 
            {
                // este path se toma del atributo  que esta en el modelo de inventarios 
                //donde se hace la referencia a la tabla 
                path: 'usuario',
                select: 'nombre email estado' // select se usa para decir cual es la 
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
        if(inventarios){
            res.status(200).json({
                code: 'inventario encontrado',
                inventario: inventarios
            })
        }
        // res.status(200).json({codido: 'inventario encontrado', inventarios: inventarios});

    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }
});

router.patch('/:inventarioId', async function (req, res) {
    try {
        let inventario = await Inventario.findById(req.params.inventarioId);

        if (!inventario) {
            return res.status(400).send('Este producto no existe');
        }

        const existeSerial = await Inventario.findOne({ serial: req.body.serial, _id: { $ne: inventario._id } });
        /* busca en la tabla inventarios si otro id diferente al que quiero actualizar ya tiene el serial
            que quiero ingresar como nuevo
        */
        if (existeSerial) {
            return res.status(400).send('Ya existe el serial en otro equipo');
        }else{
            await Inventario.findByIdAndUpdate(req.params.inventarioId,{
                serial: req.body.serial,
                modelo: req.body.modelo,
                descripcion: req.body.descripcion,
                foto: req.body.foto,
                color: req.body.color,
                fechaCompra: req.body.fechaCompra,
                precio: req.body.precio,
                usuario: req.body.usuario._id,
                marca: req.body.marca._id,
                tipoEquipo: req.body.tipoEquipo._id,
                estadoEquipo: req.body.estadoEquipo._id,
                fechaActualizacion: new Date()
            })
            res.status(200).json({code: 'inventario actualizado'})
        }


    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }
});

module.exports = router