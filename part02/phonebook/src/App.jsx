import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filterValue, handleFilterChange}) => {
  return(
    <div>
      filter shown with <input type="text" value={filterValue} onChange={handleFilterChange}/>
    </div>
  )
}

const Person = ({person}) => {
  return(
    <div>{person.name} {person.number}</div>
  )
}

const Persons = ({persons}) => {
  return (
    <div>
      {persons.map(person => 
        <Person key={person.name} person={person}/>
      )}
    </div>
  )
}

const PersonForm = ({formHandler, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return(
    <form onSubmit={formHandler}>
      <div>name: <input value={newName} onChange={handleNameChange} /></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
      
      <div><button type="submit">add</button></div>
    </form>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue,setFilterValue] = useState('')
  const [showAll, setShowAll] = useState(true)
  
  useEffect(()=> {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find(person => person.name === newName)){
      setNewName('')
      setNewNumber('')
      return alert(`${newName} is already added to the phonebook`)
    }

    const newPerson = {name: newName, number: newNumber}
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
    setShowAll(false)
  }

  const personsToShow = showAll 
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterValue={filterValue} handleFilterChange={handleFilterChange}/>

      <h2>Add a new</h2>
      <PersonForm 
        formHandler={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange}
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App