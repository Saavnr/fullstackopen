import {useState, useEffect} from 'react'
import countriesServices from './services/countries'
import Form from './components/Form'
import Content from './components/Content'

const App = () => {
  const [value, setValue] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [filterValue, setFilterValue] = useState('')
  const [filteredCountries, setFilteredCountries] = useState({})
  const [weather, setWeather] = useState({})

  useEffect(() => {
    countriesServices
      .getAll()
      .then(countriesData => {
        setAllCountries(countriesData)
      })
      .catch(error => {
        console.log(error.message)
      })
  }, [])

  useEffect(() => {
    if(filterValue) {
      const result = allCountries.filter(country => country.name.common.toLowerCase().includes(filterValue.toLowerCase()))
      setFilteredCountries(result)
    }
  }, [filterValue])

  useEffect(() =>{
    if(filteredCountries[0]) {
      countriesServices
        .getWeather(filteredCountries[0].capital[0])
        .then(response => {
          setWeather(response)
        })
        .catch(error => {
          console.log(error.message)
        })
    }
  },[filteredCountries])

  const handleValueChange = (event) => {
    setValue(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setFilterValue(value)
  }

  return(
    <div>
      <Form value={value} handleValueChange={handleValueChange} handleSubmit={handleSubmit} />
      <Content 
        countries={filteredCountries} 
        setFilterValue={setFilterValue} 
        weather={weather}
      />
    </div>
  )
}

export default App