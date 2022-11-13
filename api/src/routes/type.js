const axios = require('axios')
const { Router } = require('express')
const { Type } = require('../db')

const router = Router()

router.get('/types', async (req, res, next) => {
  try {
    const typesList = await Type.findAll()

    if (typesList.length === 0) {
      // cargar primera vez Types de Pokemon a DB
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/type')
        const typesList = response.data.results.map((t) => {
          return { 
            id: t.url.split('/')[6],
            name: t.name
         }
        })
        await Type.bulkCreate(typesList)
        res.status(200).json(typesList)
      } catch (error) {
        next(error)
      }
    } else {
      console.log('tipos cargados de la base de datos')
      return res.status(200).json(typesList) /// returm types
    }
  } catch (error) {
    next(error)
  }
})
module.exports = router
