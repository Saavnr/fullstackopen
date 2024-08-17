import WeatherDetails from './WeatherDetails'

const Country = ({country, weather}) => {
  return(
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>

      <p><b>Languages:</b></p>
      <ul>
        {Object.values(country.languages).map(lang => 
          <li key={lang}>{lang}</li>
        )}
      </ul>

      <div>
        <img src={country.flags.png} alt="flag" width={150}/>
      </div>

      <WeatherDetails weather={weather} />

    </div>
  )
}

export default Country