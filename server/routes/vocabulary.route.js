const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middlewares/auth.middleware')

const {
  createVocabulary,
  getVocabularies,
  deleteVocabulary,
  updateVocabulary,
} = require('../controllers/vocabulary.controller')

router.get('/', verifyToken, getVocabularies)
router.post('/', verifyToken, createVocabulary)
router.delete('/:vocabularyId', verifyToken, deleteVocabulary)
router.put('/:vocabularyId', verifyToken, updateVocabulary)

module.exports = router
