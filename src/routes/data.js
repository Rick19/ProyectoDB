const express = require('express');
const router = express.Router();
const pooldb = require('../database');


router.get('/add', (req, res) => {
    res.render('proyectos/add')
});

router.post('/add', (req, res) => {
    res.send(req.body);
    console.log(req.body);
});

module.exports = router;