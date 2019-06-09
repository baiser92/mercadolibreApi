const {map, filter} = require('lodash')

function mapItems (data) {
  let response = {
    author: {
      name: 'Baiser',
      lastname: 'Roa'
    }
  }
  if (data.filters) {
    let categoriesFilter = filter(data.filters, { id: 'category' })
    if (categoriesFilter && categoriesFilter.length && categoriesFilter[0].values && categoriesFilter[0].values.length) {
      response.categories = getItemsCategories(categoriesFilter[0].values[0].path_from_root)
    }
  }
  response.items = map(data.results, (item) => {
    return getItemData(item)
  })
  return response
}

function mapSingleItem (itemData, itemDescription) {
  let response = {
    author: {
      name: 'Baiser',
      lastname: 'Roa'
    },
    item: getItemData(itemData, itemDescription)
  }
  return response
}

function getItemData (item, itemDescription) {
  let response = {
    id: item.id || 'Not available',
    title: item.title || 'Not available',
    price: {
      currency: item.currency_id || 'Not available',
      amount: item.price || 'Not available'
    },
    picture: item.thumbnail || 'Not available',
    condition: item.condition || 'Not available',
    free_shipping: item.shipping ? item.shipping.free_shipping : false,
    sold_quantity: item.sold_quantity || 'Not available'
  }
  if (itemDescription && itemDescription.plain_text) {
    response.description = itemDescription.plain_text
  }
  if (item.address && item.address.state_name) {
    response.address = item.address.state_name
  }
  return response
}

function getItemsCategories (categories) {
  if (categories && categories.length) {
    let response = map(categories, (category) => {
      return category.name
    })
    return response
  }
  return []
}

module.exports = {
  mapItems,
  mapSingleItem
}
