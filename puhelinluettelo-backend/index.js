const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

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

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/info', (request, response) => {
  let personsCount = persons.length
  let datetime = new Date().toString()
  response.send(
    '<div>Phonebook has info for ' + personsCount + ' people</div>' +
    '<div>' + datetime + '</div>'
  )
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
  if (persons.find(person => person.name === reqPerson.name)) {
    return response.status(400).json({
      error: 'Person with name ' + reqPerson.name + ' already exists. Give another, please.'
    })
  }
  const newId = Math.floor(Math.random() * 10000)
  const newPerson = {
    "name": reqPerson.name,
    "number": reqPerson.number,
    "id": newId
  }
  persons = persons.concat(newPerson)
  
  response.json(newPerson)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log('Server running on port '+ PORT)
})
