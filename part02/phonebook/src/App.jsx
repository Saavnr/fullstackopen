import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue,setFilterValue] = useState('')
  const [showAll, setShowAll] = useState(true)
  
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