import './AppContainer.scss';
import { Navbar } from 'component/NavBar/NavBar';
import { Header } from 'component/Header/Header';
import { WeatherResult } from 'component/WeatherResult/WeatherResult';
import { Card } from 'elements/Card/Card';
import { MoonLoader } from 'react-spinners';
import { useState, useEffect, useRef } from "react";
import { Preview } from 'component/Preview/Preview';

export const App =() =>{
  const [input, setInput] = useState("")
  const onChangeInput = (e) => setInput(e.target.value)
  const [datasTemp, setDatasTemp] = useState([])
  const [datas, setDatas] = useState("")
  const [isLoading, setIsLoading] = useState(undefined)

  async function handleSearch(e){
    input === "" ? e.preventDefault():
    setIsLoading(true)
      await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${process.env.REACT_APP_APIKEY}`)
      .then(r => r.json())
      .then(r => {if(r.cod === 200){
        setIsLoading(false)
        setDatasTemp(r.main.temp)
        setDatas(r)
        setIsLoading(false)
      }})
      .catch(error => console.log(error))     
  }

  useEffect(()=>{
  
  },[datas])
  console.log(datas);

  return( 
      <div id="container-app">
       <Navbar/>
       <Header 
        hook={input} 
        setHook={onChangeInput}
        handleSearch={handleSearch} 
       />
      {  datas.cod? 
      <Card>
        <WeatherResult city={datas.name} temp={Math.ceil(datasTemp)}/>
      </Card> 
      : 
      <Card><Preview/></Card>
      }
     </div>
  )
}