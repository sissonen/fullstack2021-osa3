const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  'mongodb+srv://fullstack:'+password+'@fullstack2021.xr09f.mongodb.net/puhelinluettelo?retryWrites=true&w=majority'

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 5) {
  const nameArg = process.argv[3]
  const numberArg = process.argv[4]
  const person = new Person({
    name: nameArg,
    number: numberArg,
  })
  person.save().then(response => {
    console.log('added ' + nameArg + ' number ' + numberArg + ' to phonebook')
    mongoose.connection.close()
  })
} else {

  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}
