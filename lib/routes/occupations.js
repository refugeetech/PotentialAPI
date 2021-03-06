'use strict'

const transform = require('../utils/transformOccupations')
const elastic = require('../adapters/elastic')

function getList (req, res, next) {
  const language = req.params.language || 'en'
  let data
  try {
    data = require(`../../data/isco.${language}.json`)
    const clone = JSON.parse(JSON.stringify(data))
    transform(clone)
    res.send(clone)
  } catch (err) {
    next(err)
  }
}

function getsAggregations (req, res, next) {
  return elastic.getOccupationCountList(req.query.q)
    .then((result) => res.send(result))
}

module.exports = {
  getList,
  getsAggregations
}
