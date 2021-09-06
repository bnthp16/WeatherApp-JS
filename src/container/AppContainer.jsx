import './AppContainer.scss';
import { Navbar } from 'component/NavBar/NavBar';
import { Header } from 'component/Header/Header';
import { WeatherResult } from 'component/WeatherResult/WeatherResult';
import ApiFetch from 'services/ApiFetch';
import { useState, useEffect } from "react";

export const App =() =>{
  const [input, setInput] = useState("")
  const onChangeInput = (e) => setInput(e.target.value)
  const [datas, setDatas] = useState([])
  const [render, setRender] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  async function handleSearch(e){
    input === "" ? e.preventDefault():
    setIsLoading(true)
      await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${process.env.REACT_APP_APIKEY}`)
      .then(r => r.json())
      .then(r => {if(r.cod === 200){
        setDatas(r)
        setIsLoading(false)
      }})
      .catch(error => console.log(error))
  }

  useEffect(()=>{
    console.log(isLoading);
    setRender(datas.main)
  },[datas])

  return( 
      <div id="container-app">
       <Navbar/>
       <Header 
        hook={input} 
        setHook={onChangeInput}
        handleSearch={handleSearch} 
       />
       {
         render &&
         <WeatherResult  loading={isLoading} city={datas.name} temp={Math.ceil(render.temp)}/>
       }
      </div>
  )
}