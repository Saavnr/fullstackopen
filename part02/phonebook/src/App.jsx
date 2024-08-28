import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notifications'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue,setFilterValue] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')
  
  useEffect(()=> {
    personService
      .getAll()
      .then(personsData => {
        setPersons(personsData)
      })
  }, [])

  const sendNotification = (type, message) => {
    setMessageType(type)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

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
            sendNotification('success', `Updated ${udpatedObject.name}`)
          })
          .catch(error => {
            sendNotification('error', `Information of ${person.name} has already been removed from server`)
            setPersons(persons.filter(person => person.name !== newObject.name))
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
        sendNotification('success', `Created ${returnedPerson.name}`)
      })
  }


  const handleDelete = (person) => {
    if(confirm(`Delete ${person.name}?`)){
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          sendNotification('success', `Deleted ${person.name}`)
        })
        .catch(error => {
          setPersons(persons.filter(person => person.name !== person.name))
          sendNotification('error', `Information of ${person.name} has already been removed from server`)
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
    setFilterValue(event.target.value)
    setShowAll(false)
  }

  const personsToShow = showAll 
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} messageType={messageType}/>

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