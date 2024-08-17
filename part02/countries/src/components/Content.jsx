import Country from './Country'

const Content = ({countries, setFilterValue, weather}) => {
  if (countries) {
    if (countries.length > 10) {
      return <div>Too many results, be more specific..</div>
    }
    else if (countries.length === 1) {
      return (
        <Country country={countries[0]} weather={weather} />
      )
    }
    else if(countries.length <= 10) {
      return (
        <div>
          {countries.map(country => {
            const name = country.name.common
            return <div key={name}>{name} <button onClick={() => setFilterValue(name)}>show</button></div>
            }
          )}
        </div>
      )
    }
    
  }
}

export default Content