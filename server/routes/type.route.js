const express = require('express')
const router = express.Router()

const { createType, getTypes } = require('../controllers/type.controller')

router.get('/', getTypes)
router.post('/', createType)

module.exports = router
