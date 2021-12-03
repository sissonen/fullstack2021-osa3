const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to DB: ' + url)
mongoose.connect(url)
  .then(result => {
    console.log('connection to DB successful')
  })
  .catch((error) => {
    console.log('error while connecting to DB:' + error.message)
  })

const personSchema = new mongoose.Schema({
  name: {type: String, minlength: 3, required: true, unique: true},
  number: {type: String, minlength: 8, required: true}
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
