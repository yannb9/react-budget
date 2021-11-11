import './App.css';
import React, {useState, useEffect} from 'react';
import Data from "./data"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import MiniIcon from './icons/MiniIcon';

import Arrow from './icons/Arrow'
import Save from './icons/Save'
import Info from './icons/Info'
import Dots from './icons/Dots'

function App() {

    const [activeAccordion, setActiveAccordion] = useState(null);
    const [period, setPeriod] = useState('Annually');
    const [baseline, setBaseline] = useState('');

    // const length = period == 'Annually' ? 12 : period == 'Monthly' ? 12 : period == 'Quaterly' ? 3 : 'Annually';
    const length = 12;
    const [budget, setBudget] = useState(Array.from({ length }, () => baseline/12));
    const [manual, setManual] = useState(false);
    const [edit, setEdit] = useState(null);



    useEffect(()=>{
        console.log(manual)
    },[manual])

    const toggleAccordion = (index) =>{
        activeAccordion === index ? setActiveAccordion(null) : setActiveAccordion(index);
    }

    const toggleManual = () =>{
        const devised = parseFloat(baseline/12).toFixed(2);
        manual ? setBudget(budget=>budget.map(()=>devised)) : setBudget(budget => budget.map(value=>value))
        setManual(!manual)
    }

    const handleBaseline = (inputEv) =>{
        const stringValue= inputEv.target.value.replaceAll(',','');
        const intValue = parseFloat(stringValue).toFixed(2);
        const devised = (intValue/12).toFixed(2).toString().replaceAll(',','').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

        if(stringValue){
            setBaseline(stringValue);
            setBudget(budget => budget.map(() => devised));
        } else{
            setBaseline('');
            setBudget(budget => budget.map(() => ''));
        }
    }

    const handleInput = (inputEv, index) =>{
        const value = inputEv.target.value.replaceAll(',','');
        const budgetVal = budget.map((val, i) => (i !== index ? val : value));
        const total = budgetVal.filter(value=>!isNaN(parseFloat(value))).map(value=> value.toString().replaceAll(',','')).map(value=> parseFloat(value)).reduce((a, b) => a + b, 0).toFixed(2);
        setBudget(budget => budget.map((val, i) => (i !== index ? val : value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"))));
        setBaseline(total);
    }

    const openActionItem = (e, index) =>{
        e.stopPropagation()
        edit === index ? setEdit(null) : setEdit(index);
    }

    const removeListItem = (e, index) => {
        e.stopPropagation();
        Data.splice(index, index+1);
        setEdit(null);
    }

    return (
        <div className="App">
            <div className="accordion-wrapper">
                <ul className="accordion">
                    {Data.map((data,index)=>(
                        <li className={activeAccordion === index ? "active" : ''} key={index}>
                            {/* AccordionTab Start */}
                            <div className={`intro ${data.isBudget ? "is-budget" : "is-regular"}`} onClick={()=>toggleAccordion(index)}>
                                    <div className='left-content'>
                                        <Arrow turn={data.isActive} />
                                        {data.icon}
                                        <p className="title">{data.title}</p>
                                        <span className="type italic">{data.type}</span>
                                    </div>
                                    <div className='right-content'>
                                        {data.isBudget ? '' : <span className="no-budget-text">No Budget</span>}
                                        {data.isBudget ? <Save /> : <Info />}

                                        <div className="action-item">
                                            <Dots onClick={(e)=>openActionItem(e,index)}/>
                                            <div className={`action-item-wrapper ${edit === index ? "open" : ""}`}>
                                                <div className="action-edit" onClick={e=>e.stopPropagation()} >Edit</div>
                                                <div className="action-remove" onClick={e=>removeListItem(e,index)}>Remove</div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            {/* AccordionTab End */}
                            <div className="content">
                                <div className="wrapper">
                                    <div className="filter">
                                        <div className="budget-frequency">
                                            <div className="label">
                                                <div className="title">Budget Frequency</div>
                                                <MiniIcon />
                                            </div>
                                            <Select className="dropdown-input" value={period} onChange={(e)=>setPeriod(e.target.value)}>
                                                <MenuItem value="Annually">Annually</MenuItem>
                                                <MenuItem value="Monthly">Monthly</MenuItem>
                                                <MenuItem value="Quarterly">Quarterly</MenuItem>
                                            </Select>
                                        </div>
                                        <div className="budget-baseline">
                                            <div className="label">
                                                <div className="title">Baseline [Annual] Budget</div><MiniIcon />
                                            </div>
                                            <div className="baseline-input">
                                                <Select className="dropdown-input currency" value={'$'}><MenuItem value="$" >$</MenuItem></Select>
                                                <input type="text" className={manual ? 'manual': ''} placeholder='0.00' value={baseline.replaceAll(',','').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} onChange={handleBaseline} disabled={manual ? true : false} />
                                            </div>

                                        </div>
                                        <div className="budget-allocation">
                                            <div className="label">
                                                <div className="title">Budget Allocation</div>
                                                <MiniIcon />
                                            </div>
                                            <label className="switch">
                                                <input type="checkbox" className={manual ? 'checked' : ''}/>
                                                <span className="slider"></span>
                                                <div className="types">
                                                    <div onClick={toggleManual} className="Equal">Equal</div>
                                                    <div onClick={toggleManual} className="Manual">Manual</div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="breakdown">
                                        <div className="content">
                                            <p className="title">Budget Breakdown</p>
                                            <span>By default, your budget will be equally divided throughout the year. You can manually change the budget allocation, either now or later.</span>
                                        </div>
                                        <form className="inputs">
                                        {Array.from({length: 12}, (item, mon) => {
                                            
                                            return new Date(0, mon).toLocaleString('en-US', {month: 'short'})}).map((mon,ind)=>(
                                                <div key={ind} className="month">
                                                    <label>{`${mon} ${new Date().getFullYear().toString().slice(-2)}`}</label>
                                                    <label className="currency">$</label>
                                                    <input type="text" className={manual ? '': 'manual'} onChange={e=>handleInput(e, ind)} placeholder="0.00" index={ind} value={budget[ind] || ''} disabled={manual ? false : true} />
                                                </div>
                                            ))
                                        }
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
  }
  
  export default App;
  
  