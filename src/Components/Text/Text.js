import React from 'react'
import './Text.css';
import InputMask from 'react-input-mask';

export default function Text(props){
    return(
        <InputMask 
            value={props.value}
            onChange={props.onChange}
            mask={props.mask}
            placeholder={props.placeHolder}
        />
    );
}