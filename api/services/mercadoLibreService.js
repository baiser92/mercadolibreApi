const axios = require('axios')
const mercadoLibreMapper = require('../mappers/mercadoLibreMapper')

async function listItems (queryParams) {
  return new Promise(async (resolve, reject) => {
    let request = await axios.get('https://api.mercadolibre.com/sites/MLA/search', {
      params: {
        q: queryParams.q,
        limit: queryParams.limit || 4,
        offset: queryParams.offset || 1
      },
      timeout: 10000
    })
    if (request && request.data) {
      let response = {data: mercadoLibreMapper.mapItems(request.data)}
      resolve(response)
    } else {
      resolve()
    }
  })
}

async function getItem (itemId) {
  return new Promise(async (resolve, reject) => {
    let requestItem = axios.get(`https://api.mercadolibre.com/items/${itemId}`, {
      timeout: 10000
    })
    let requestItemDescription = axios.get(`https://api.mercadolibre.com/items/${itemId}/description`, {
      timeout: 10000
    })
    let result = await Promise.all([requestItem, requestItemDescription])
    if (result && result.length && result[0].data && result[1].data) {
      let response = {data: mercadoLibreMapper.mapSingleItem(result[0].data, result[1].data)}
      resolve(response)
    }
    resolve()
  })
}

module.exports = {
  listItems,
  getItem
}
