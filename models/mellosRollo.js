const mongoose = require('mongoose')

const mellosRolloSchema = new mongoose.Schema({
  rolloAteAt: {
    type: Number,
    required: true,
    default: () => {
      var d = new Date()
      return  d.getTime()
    }
  }
})

module.exports = mongoose.model('MellosRollo', mellosRolloSchema)