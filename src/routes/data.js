const express = require('express');
const router = express.Router();
const pooldb = require('../database');


router.get('/add', (req, res) => {
    res.render('proyectos/add')
});

router.post('/add', async (req, res) => {
    const { nombre, superficie, fecha_inicio, fecha_fin } = req.body;
    const { nombre_propietario, apellido_propietario, telefono } = req.body;
    const { calle, numero, num_interno, colonia, ciudad, estado } = req.body;


    const newPropietario = {
        nombre: nombre_propietario,
        apellido: apellido_propietario,
        telefono: telefono
    };

    const newDomicilio = {
        calle: calle,
        numero: numero,
        num_interno: num_interno,
        colonia: colonia,
        ciudad: ciudad,
        estado: estado
    }

    //Primero ingresamos un propietario
    await pooldb.query('INSERT INTO propietarios set ?', [newPropietario]);
    //  Luego solicitamos el ID del propietario que acabamos de ingresar
    const id_prop = await pooldb.query('SELECT id FROM propietarios WHERE nombre LIKE ? AND apellido LIKE ?', [nombre_propietario, apellido_propietario]);
    //  Ahora insertamos la direccion
    // console.log(id_prop[0].id);console.log(id_direct[0].id);
    await pooldb.query('INSERT INTO direccion set ?', [newDomicilio]);
    const id_direct = await pooldb.query('SELECT id FROM direccion WHERE `calle` = ? AND `numero` = ? AND `num_interno` = ? AND `colonia` = ? AND `ciudad` = ? AND `estado` = ?',
        [calle, numero, num_interno, colonia, ciudad, estado]);

    const newProject = {
        nombre: nombre,
        superficie: superficie,
        fecha_inicio: fecha_inicio,
        fecha_fin: fecha_fin,
        id_propietario: id_prop[0].id,
        id_direccion: id_direct[0].id
    }

    await pooldb.query('INSERT INTO proyectos set?', [newProject]);

    res.send('recibido');




});

module.exports = router;