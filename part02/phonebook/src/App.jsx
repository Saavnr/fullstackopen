import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({filterValue, handleFilterChange}) => {
  return(
    <div>
      filter shown with <input type="text" value={filterValue} onChange={handleFilterChange}/>
    </div>
  )
}

const Person = ({person, handleDelete}) => {
  return(
    <div>
      {person.name} {person.number}
      <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
    </div>
  )
}

const Persons = ({persons, handleDelete}) => {
  return (
    <div>
      {persons.map(person => 
        <Person key={person.name} person={person} handleDelete={handleDelete}/>
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
    personService
      .getAll()
      .then(personsData => {
        setPersons(personsData)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const person = persons.find(person => person.name === newName)

    if (person){
      if(confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        const newObject = {...person, number: newNumber}
        personService
          .update(person.id, newObject)
          .then(udpatedObject => {
            setPersons(persons.map(person => person.id !== udpatedObject.id ? person : udpatedObject))
          })
      }
      setNewName('')
      setNewNumber('')
      return
    }

    const newObject = {name: newName, number: newNumber}
    personService
      .create(newObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleDelete = (id, name) => {
    if(confirm(`Delete ${name}?`)){
      personService
        .remove(id)
        .then(deletedPerson =>
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
        )
    }
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
      <Persons persons={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App