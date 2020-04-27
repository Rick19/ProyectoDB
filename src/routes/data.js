const express = require('express');
const router = express.Router();
const pooldb = require('../database');


router.get('/add', (req, res) => {
    res.render('proyectos/add')
});

router.post('/add', async (req, res) => {
    const {nombre, superficie, fecha_inicio, fecha_fin} = req.body;
    const {nombre_propietario, apellido_propietario, telefono} = req.body;

    const newPropietario = {
        nombre: nombre_propietario,
        apellido: apellido_propietario,
        telefono: telefono
    };

    pooldb.query('INSERT INTO propietarios set ?', [newPropietario], (err, rows) => {
        const { insertId } = rows;
        

    });
    
    res.send('recibido');
    console.log(insertId);


    
});

module.exports = router;