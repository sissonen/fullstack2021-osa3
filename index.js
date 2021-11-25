require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const BSON = require('bson')
const Person = require('./models/person')

app.use(express.static('puhelinluettelo/build'))
app.use(express.json())
app.use(cors())
app.use(morgan((tokens, req, res) => {
  let logArr = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ]
  if (tokens.method(req, res) === 'POST') {
    logArr = logArr.concat(JSON.stringify(req.body))
  }
  
  return logArr.join(' ')
}
))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {

  const testObjectId = new RegExp("^[0-9a-fA-F]{24}$")

  if (testObjectId.test(request.params.id)) {
    const id = new BSON.ObjectId(request.params.id)
    Person.findById(id).then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => {
      response.send('Failed to find object with given id.')
    })
  } else {
    response.send('Id is not valid')
  }

})

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    let personsCount = persons.length
    let datetime = new Date().toString()
    response.send(
      '<div>Phonebook has info for ' + personsCount + ' people</div>' +
      '<div>' + datetime + '</div>'
    )
  })
})

app.post('/api/persons', (request, response) => {
  
  const reqPerson = request.body
  if (!reqPerson.name) {
    return response.status(400).json({
      error: 'A person needs a name.'
    })
  }
  if (!reqPerson.number) {
    return response.status(400).json({
      error: 'A person needs a number.'
    })
  }
  /*if (persons.find(person => person.name === reqPerson.name)) {
    return response.status(400).json({
      error: 'Person with name ' + reqPerson.name + ' already exists. Give another, please.'
    })
  }*/
  const newPerson = new Person({
    "name": reqPerson.name,
    "number": reqPerson.number,
  })
  
  newPerson.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('Server running on port '+ PORT)
})
