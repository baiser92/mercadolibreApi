const express = require('express')
const router = express.Router()
const mercadoLibreService = require('../services/mercadoLibreService')

/* GET list of items */
router.get('/items', async function (req, res, next) {
  if (!req.query || !req.query.q) {
    res.send('missing query parameter')
  } else {
    let data = await mercadoLibreService.listItems(req.query)
    res.send(data)
  }
})

/* GET one item */
router.get('/items/:id', async function (req, res, next) {
  if (!req.params || !req.params.id) {
    res.send(`missing id parameter`)
  } else {
    let data = await mercadoLibreService.getItem(req.params.id)
    res.send(data)
  }
})

module.exports = router
