import React, { useState } from 'react';
import Button from '../Button/Button.js'
import './CEPInfo.css'

export default function CEPInfo(props){
    
    const Close = () => {
        props.onClose();
    };


    return(
        <div className={"CEPBox"} style={{display: props.visibility ? 'unset' : 'none'}}>
            <div className="titleCPFBox">DADOS:</div>
            <p>CEP: {props.cep}</p>
            <p>ESTADO: {props.state}</p>
            <p>CIDADE: {props.city}</p>
            <p>BAIRRO: {props.neighborhood}</p>
            <p>RUA: {props.street}</p>
            <Button titleText="Fechar" onClick={Close}/>
        </div>
    )
}