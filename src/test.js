    import React, {useState, useEffect, useRef} from 'react';

    function App() {

        const [budget, setBudget] = useState([])
        const [manual, setManual] = useState(false);

        const handleInput = inputEv =>{
            const budgetState = budget;
            const input = {index: inputEv.target.getAttribute('index'), value: inputEv.target.value};
            
            // if data input already exists - update it
            if(budgetState.some(data=>data.index === input.index)){
                var current = budgetState.find(data=>data.index === input.index);
                current.value = input.value;
            } else {
                budgetState.push(input)
                setBudget(budgetState);
            }
        }

        return (
            <div>
                <form className="inputs">
                {Array(12).fill().map((e, index)=>(
                    <div  key={index} className="month">
                        <input type="text" onChange={handleInput} index={index} disabled={manual ? false : true}/>
                    </div>
                ))}
                </form>
                <button onClick={()=>setManual(!manual)}>Click</button>
            </div>
        );
    }
    
    export default App;