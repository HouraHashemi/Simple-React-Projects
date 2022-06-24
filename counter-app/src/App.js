import logo from './logo.svg';
import './App.css';
import React, { Component, useEffect, useState } from 'react';

function App(){
  
  const [counter, setCounter] = useState(0);
  const [control, setControl] = useState("Start");
  const [countType, setCountType] = useState("Up-Counting");
  const [countTypeChangeable, setCountTypeChangeable] = useState(true);

  const [incrementIntervalID, setIncrementIntervalID] = useState(0);
  const [decrementIntervalID, setDecrementIntervalID] = useState(0);

  // reset counters
  function handleReset(){
    setCounter(0);
  }


  function handleControl(){

    if (control === "Stop" ){
      setControl("Start");
      setCountTypeChangeable(true);
      // stop intervals
      if (countType === "Up-Counting"){
        setIncrementIntervalID(clearInterval(incrementIntervalID));
      }
      else if (countType === "Down-Counting"){
        setDecrementIntervalID(clearInterval(decrementIntervalID));
      }
    }

    else if (control === "Start" ){ 
      setControl("Stop");
      setCountTypeChangeable(false);
      
      // increment
      if (countType === "Up-Counting"){
        setIncrementIntervalID(setInterval(() => {
          setCounter(counter => counter + 1)
        }, 1000));
      }
      // decrement
      else if (countType === "Down-Counting"){
        setDecrementIntervalID(setInterval(() => {
          setCounter(counter => counter - 1)
        }, 1000));
      }

    }
  }

  function handleCountType(){
    if (countType === "Up-Counting"){
      setCountType("Down-Counting");
    }
    else if (countType === "Down-Counting"){
      setCountType("Up-Counting");
    }
  }


  return <section>
      <div className="counter">
      <p className="counter-number">{counter}</p>
      <button className="reset-button" onClick={handleReset}>Reset</button>
      <button className="control-button" onClick={handleControl}>{control}</button>
      <button className="countType-button" onClick={handleCountType} disabled={!countTypeChangeable}>{countType}</button>
      </div>
        </section>
  ;
}


export default App;
