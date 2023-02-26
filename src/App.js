import React, { useState } from 'react';
import './App.css';
import Text from './Components/Text/Text.js'
import Button from './Components/Button/Button.js'
import Erro from './Components/Erro/Erro.js'
import CEPInfo from './Components/Modal/CEPInfo.js'
import axios from 'axios';

export default function App() {
  let [inputValue, setInputValue] = useState('');
  let [errorMessage, setErrorMessage] = useState('');
  let [apiData, setApiData] = useState('');
  let [modalVisibility, setModalVisibility] = useState(false);

  const Format=()=>{
    try{
      inputValue =  inputValue.replace(/[_-]/g, '');
      if(inputValue.length != 8){
        setApiData('');
        setErrorMessage("O valor não corresponde a um CEP.");
        return;
      }
      setErrorMessage('');
      CallApi();
    }
    catch(error){
      setApiData('');
      setErrorMessage(error);
    }
  }

  const CallApi=()=>{
    axios.get('https://brasilapi.com.br/api/cep/v1/' + inputValue)
      .then(res => {
        setApiData(res.data);
        setModalVisibility(true);
      })
      .catch(err => {
        setApiData('');
        if(err.response){
          if(err.response.status == 404){
            setErrorMessage("O CEP não existe.");
            return;
          }
        }
        setErrorMessage("Erro com o request na API.");
        return;
      });
  } 
  return (
    <div className="Content">
      <div className="App">
        <h1 id="title">PLACE-FINDER</h1>
        <Text type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} mask="99999-999" placeHolder="&#xf1ad; Digite o CEP"/>
        <Button titleText="Procurar" onClick={Format}/>
        {errorMessage != null && <Erro msg={errorMessage} />}
        {apiData?.state && (
          <CEPInfo
            visibility={modalVisibility}  
            onClose={() => setModalVisibility(false)}
            cep={apiData.cep}
            state={apiData.state}
            city={apiData.city ?? ''}
            neighborhood={apiData.neighborhood ?? ''}
            street={apiData.street ?? ''}
          />
        )}
      </div>
    </div>
  )
}