import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notificationMsg, setNotificationMsg ] = useState(null)

  useEffect(() => {
    personService
      .getPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (!persons.some(person => person.name === newName)) {
      const newPerson = { name: newName, number: newNumber }
      personService
        .addPerson(newPerson)
        .then(returnedData => {
          setPersons(persons.concat(returnedData))
          setNotificationMsg({msg: 'Added new person "' + newName + '" with number ' + newNumber, level: 'info'});
        })
        .catch(error => {
          setNotificationMsg({msg: 'Adding new person failed: ' + error.response.data.error, level: 'error'});
        })
      setTimeout(() => {
        setNotificationMsg(null)
      }, 3000)
    } else {
      let existingPerson = persons.find(person => person.name === newName)
      if (existingPerson.number !== newNumber) {
        if (window.confirm('Person "' + newName + '" is already added in the phonebook. Would you like to update their phone number (' + existingPerson.number + ' -> ' + newNumber + ')?')) {
          const updatedPerson = { ...existingPerson, number: newNumber }
          personService
            .updatePerson(existingPerson.id, updatedPerson)
            .then(returnedData => {
              setPersons(persons.map(person => person.id !== returnedData.id ? person : returnedData))
            })
          
          setNotificationMsg({msg: 'Updated person ' + newName + '\'s number to ' + newNumber, level: 'info'});
          setTimeout(() => {
            setNotificationMsg(null)
          }, 3000)
        }
      } else {
        setNotificationMsg({msg: 'Person "' + newName + '" is already added in the phonebook.', level: 'error'})
        setTimeout(() => {
          setNotificationMsg(null)
        }, 3000)
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (id) => {
    let idToRemove = id
    let personToRemove = persons.find(person => person.id === idToRemove)
    if (window.confirm('Do you really want to remove "' + personToRemove.name + '" from the phonebook?')) {
      personService
        .removePerson(idToRemove)
        .then(returnedData => {
          setPersons(persons.filter(person => person.id !== idToRemove))
          setNotificationMsg({msg: 'Removed person "' + personToRemove.name + '"', level: 'info'});
          setTimeout(() => {
            setNotificationMsg(null)
          }, 3000)
        })
        .catch(error => {
          setNotificationMsg({msg: 'Could not remove "' + personToRemove.name + '" since it was not found. Maybe someone else has deleted it?', level: 'error'})
          setPersons(persons.filter(person => person.id !== idToRemove))
          setTimeout(() => {
            setNotificationMsg(null)
          }, 3000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsFiltered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMsg} />
      <h3>Add a new person:</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers:</h2>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
        <Persons persons={personsFiltered} removePerson={removePerson}  />
    </div>
  )
}

export default App;
