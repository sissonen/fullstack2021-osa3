import React from 'react'

const Persons = ({persons, removePerson}) => (
        <ul>
          {persons.map(person => 
            <li key={person.name}>
              {person.name} - {person.number} <button onClick={() => removePerson(person.id)}>Delete</button>
            </li>)}
        </ul>
)

export default Persons
