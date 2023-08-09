const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VocabularyModelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  spelling: {
    type: String,
  },
  translation: {
    type: String,
    required: true,
  },
  example: {
    type: String,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'types',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
})

module.exports = mongoose.model('vocabularies', VocabularyModelSchema)
