import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import { useState, useEffect } from 'react'
import personService from './services/names'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterStr, setFilterStr] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleSubmit = (event) => {
  event.preventDefault()

  const name = newName.trim()
  const number = newNumber.trim()
  if (name === '') return

  const existingPerson = persons.find(p => p.name === name)

  if (existingPerson) {
    if (window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`)) {
      const updatedPerson = { ...existingPerson, number }
      personService
        .update(existingPerson.id, updatedPerson)
        .then(response => {
          setPersons(persons.map(p => p.id !== existingPerson.id ? p : response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  } else {
    const newPerson = { name, number }
    personService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
  }
}

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(prev => prev.filter(p => p.id !== id))
        })
    }
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filterStr.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterStr={filterStr} onChange={e => setFilterStr(e.target.value)} />

      <h2>Add a new</h2>

      <PersonForm
        onSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        onNameChange={e => setNewName(e.target.value)}
        onNumberChange={e => setNewNumber(e.target.value)}
      />

      <h2>Numbers</h2>

      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App

