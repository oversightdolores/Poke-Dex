const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemon = require('./pokemon.js');
const types = require('./type.js');
const {Pokemon, Type} = require('../db.js');
const router = Router();
const axios = require('axios');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/', pokemon);
router.use('/', types);




module.exports = router;
