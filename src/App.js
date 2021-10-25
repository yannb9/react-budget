import './App.css';
import React, {useState} from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Accordion from "./components/Accordion";
import AdWords from './icons/AdWords';
import Calendar from './icons/Calendar';
import Budget from './icons/Budget';
import MiniIcon from './icons/MiniIcon';

function App() {

  const data = [
    {
      title: 'Display ads - Google Adwords',
      type: 'Display',
      icon: <AdWords />,
      isBudget:true,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
    },
    {
      title: 'Organising event',
      type:'Events',
      icon: <Calendar />,
      isBudget:false,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
    },
    {
      title: 'Paid reviews',
      type:'Paid Search',
      icon: <Budget /> ,
      isBudget:true,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
    }
  ]

  const [active, setActive] = useState(null);
  const [frequency, setFrequency] = useState('Annually');
  const [baseline, setBaseline] = useState('0');

  const [allocation, setAllocation] =  useState('Equal');
  const [checked, setChecked] = useState(false);
  const [budget, setBudget] = useState([]);


const toggle = (index) =>{
  if(active === index){
    return setActive(null);
  }
   setActive(index)
}

const handleBaseline = (selection) =>{
  if(isNaN(selection.target.value.slice(selection.target.value.length - 1))){
    selection.target.value = selection.target.value.slice(0, -1); 
  }
  setBaseline(selection.target.value.replace(/,/g, ''))
}

const handleFrequency = (input) =>{
  setFrequency(input.target.value)
}

const handleAllocation = (selection) =>{
  if(selection.target.classList.value !== allocation){
    setChecked(!checked)
    setAllocation(selection.target.classList.value);
  } else{
    setAllocation(selection.target.classList.value);
  }
}

const handleInput = (input) =>{
  const budgetState = budget;
  const budgetInput = {index:input.target.getAttribute('index'), value:input.target.value};
  if(budgetState.find(data=>data.index === budgetInput.index)){
    var currentInput = budgetState.find(data=>data.index === input.target.getAttribute('index'));
    currentInput.value = budgetInput.value;
  } else{
    budgetState.push(budgetInput)
    setBudget(budgetState)
  }
  const total = budgetState.reduce((currentTotal, data)=>data.value + currentTotal, 0)
}

const handleSubmit = (e) =>{
  e.preventDefault();
}




  return (
    <div className="App">
      {data.map((item,index)=>
        (
          <div key={index} className="accordion__section">
            <Accordion 
              title={item.title}
              type={item.type}
              icon={item.icon}
              isBudget={item.isBudget}
              onClick={()=>toggle(index)}
              isActive={active === index}
            />
            

            <div className={active === index ? "accordion__content show" : 'accordion__content'}>
                <div className="filter">
                  <div className="sec_frequency">
                    <div className="label">
                      <div className="title">Budget Frequency</div><MiniIcon /></div>
                      <Select className="dropdown-input" value={frequency} onChange={handleFrequency}>
                        <MenuItem value="Annually">Annually</MenuItem>
                        <MenuItem value="Monthly">Monthly</MenuItem>
                        <MenuItem value="Quarterly">Quarterly</MenuItem>
                      </Select>
                  </div>
                  <div className="sec_baseline">
                  <div className="label">
                      <div className="title">Baseline [Annual] Budget</div><MiniIcon /></div>
                      <div className="input">
                        <Select className="dropdown-input currency" value={'$'}><MenuItem value="$" >$</MenuItem></Select>
                        <input type="text" value={baseline.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} onChange={handleBaseline}></input>
                      </div>
                  </div>
                  <div className="sec_allocation">
                  <div className="label">
                      <div className="title">Budget Allocation</div>
                      <MiniIcon />
                    </div>
                    {/* element here */}
                    <label className="switch">
                      <input type="checkbox" className={checked ? 'checked' : ''}/>
                      <span className="slider"></span>
                      <div className="types">
                        <div onClick={handleAllocation} className="Equal">Equal</div>
                        <div onClick={handleAllocation} className="Manual">Manual</div>
                        {/* <span onClick={handleAllocation} className="Equal">Equal</span>
                        <span onClick={handleAllocation} className="Manual">Manual</span> */}
                      </div>
                    </label>
                  </div>
                </div>

                <div className="breakdown">
                  <div className="context">
                    <p className="title">Budget Breakdown</p>
                    <span>By default, your budget will be equally divided throughout the year. You can manually change the budget allocation, either now or later.</span>
                  </div>
                  <form className="inputs">
                    {/* <form> */}
                      {Array.from({length: 12}, (item, mon) => {
                        return new Date(0, mon).toLocaleString('en-US', {month: 'short'})
                        }).map((mon,ind)=>(
                          <div key={ind} className="date-wrapper">
                            <label className="date-title">{`${mon} ${new Date().getFullYear().toString().slice(-2)}`}</label>
                            {checked ? (<input type="text" onChange={handleInput} index={ind}  value={parseFloat(baseline/12).toFixed(2)} disabled></input>) 
                            : (<input type="text" onChange={handleInput} index={ind}></input>)}
                          </div>
                        ))
                      }
                    {/* </form> */}
                    <button onClick={handleSubmit} type="submit">submit</button>
                  </form>
                </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default App;

