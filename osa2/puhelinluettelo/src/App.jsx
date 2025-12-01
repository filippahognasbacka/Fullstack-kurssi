import { useState } from 'react'
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '050 1234556' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterStr, setFilterStr] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const name = newName.trim()
    if (name === '') {
      return
    }

    if (persons.some(p => p.name === name)) {
      alert(`${name} is already added to phonebook`)
      return
    }

      const personObject = { name, number: newNumber.trim() }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleChangeFilter = (event) => {
    setFilterStr(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filterStr.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterStr={filterStr} onChange={handleChangeFilter}/>
      <h1>Add a new</h1>

      <PersonForm
        onSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
};

export default App;