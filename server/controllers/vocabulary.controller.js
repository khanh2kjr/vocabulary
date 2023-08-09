const VocabularyModel = require('../models/vocabulary.model')
const TypeModel = require('../models/type.model')
const utils = require('../utils')
const ObjectId = require('mongoose').Types.ObjectId

const createVocabulary = async (req, res) => {
  const { name, spelling, translation, example, type, user } = req.body
  if (!name || !translation || !type || !user) {
    return res.status(400).json({
      success: false,
      message: 'Missing fields',
    })
  }
  try {
    const vocabulary = await VocabularyModel.findOne({ name, type })
    if (vocabulary) {
      return res.status(400).json({
        success: false,
        message: 'Vocabulary already taken.',
      })
    }
    const newVocabulary = new VocabularyModel({
      name,
      spelling,
      translation,
      example,
      type,
      user,
    })
    await newVocabulary.save()
    res.json({
      success: true,
      message: 'Vocabulary created successfully.',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
    })
  }
}

const getVocabularies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const keyword = req.query.keyword || ''
    const typeId = req.query.typeId || ''
    let typeById

    try {
      typeById = await TypeModel.find({ _id: new ObjectId(typeId) })
    } catch (e) {
      typeById = null
    }

    const query = {
      name: { $regex: keyword, $options: 'i' },
      ...utils.cleanObject({
        type: typeById,
      }),
    }

    const totalVocabularies = await VocabularyModel.countDocuments(query)
    const skip = (page - 1) * limit
    const vocabularies = await VocabularyModel.find(query).skip(skip).limit(limit).populate('type').populate('user')

    res.json({
      success: true,
      data: vocabularies,
      pagination: {
        total: totalVocabularies,
        limit,
        page,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
    })
  }
}

const deleteVocabulary = async (req, res) => {
  try {
    const vocabularyId = req.params.vocabularyId
    await VocabularyModel.deleteOne({ _id: new ObjectId(vocabularyId) })
    res.json({
      success: true,
      message: 'success.',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
    })
  }
}

module.exports = {
  createVocabulary,
  getVocabularies,
  deleteVocabulary,
}
