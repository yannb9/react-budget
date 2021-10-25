import React from 'react';
// import './Accordion.css';
import Arrow from '../icons/Arrow'
import Save from '../icons/Save'
import Info from '../icons/Info'
import Dots from '../icons/Dots'

function Accordion (props){
    return(
        <div className={props.isBudget ? "accordion__header isBudget" : "accordion__header isNotBudget"} onClick={props.onClick}>
        <div className="accordion__left">
          <Arrow turn={props.isActive} />
          {props.icon}
          <p className="title">{props.title}</p>
          <span className="type">({props.type})</span>
        </div>
        <div className="accordion__right">
          {props.isBudget ? '' : <span className="noBudget-text">No Budget</span>}
          {props.isBudget ? <Save /> : <Info />}
          <Dots />
        </div>
      </div>
    )
}

export default Accordion;