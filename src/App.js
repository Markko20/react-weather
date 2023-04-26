import axios from "axios";
import React from 'react'
import 'react-dadata/dist/react-dadata.css';


function App() {
  const [weather, setWeather] = React.useState('')
  const [degrees, setDegrees] = React.useState('')
  const [input, setInput] = React.useState('')
  const [search, setSearch] = React.useState('')
  const [notFound, setNotFound] = React.useState(false)
  const [city, setCity] = React.useState('')
  const [main, setMain] = React.useState('')
  //Rain, Clouds, Clear, Mist
  const onChangeInput = (event) => {
    setInput(event.target.value)
  }

  const onClickSearch = () => {
    setSearch(input)
  }

  React.useEffect(() => {
    async function fetchData(){
      if(search){
        try {
          const forecast = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=0544314ed1b11fe96917da7700feae5f&lang=ru`)

          setDegrees(Math.round((forecast.data.main.temp)- 273.15))
          setWeather(forecast.data.weather[0].description);
          setNotFound(false)
          setCity(forecast.data.name)
          setMain(forecast.data.weather[0].main)
        } catch (error) {
          setNotFound(true)
          setWeather('')
          setDegrees('')
          setCity('')
        }
      }
    } 
    fetchData()
  }, [search])

  return (
    <div className="wrapper" style={{ 
      backgroundImage: {background}
    }} >
      <header>
        <img src="../img/logo.svg" alt="" className="logo" />
        <span>React weather</span>
      </header>
      <div className="input-block">
        <input value={input} onChange={onChangeInput} placeholder="Search..." className="input" />
        <img onClick={onClickSearch} src="../img/Search.svg" alt="" />
      </div>

      {notFound && (
        <>
          <h3 className="notFound">Sorry city not found, please try again</h3>
          <h3 className="smile">😕</h3>
        </>
      )}

      {degrees && (
        <>
          <div className="city">{city}</div>

          <div className="degrees">{degrees}°C</div>

          <div className="weather">{weather[0].toUpperCase() + weather.slice(1)}</div>
        </>
      )}
    </div>
  );
}

export default App;
