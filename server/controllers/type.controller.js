const TypeModel = require('../models/type.model')

const getTypes = async (_, res) => {
  try {
    const types = await TypeModel.find()
    res.json({
      success: true,
      data: types,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
    })
  }
}

const createType = async (req, res) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'Missing name.',
    })
  }
  try {
    const type = await TypeModel.findOne({ name })
    if (type) {
      return res.status(400).json({
        success: false,
        message: 'Name already taken.',
      })
    }
    const newType = new TypeModel({
      name,
    })
    await newType.save()
    res.json({
      success: true,
      message: 'Type created successfully.',
      data: newType,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
    })
  }
}

module.exports = {
  createType,
  getTypes,
}
