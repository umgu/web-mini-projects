import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid } from "./Grid"
function App() {
  const [data, setData] = useState([null, null, null, null, null, null, null, null, null]);
  const [turn, setTurn] = useState("cross");
  const [winner, setWinner] = useState(false);

  let winnerGrid = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  let onGridClick = (index) => {
    if(!data[index] && !winner) {
      let newData = data;
      newData[index] = turn;
      setData([...newData]);
      winnerGrid.forEach((winner) => {
        const [x,y,z] = winner;
        if(data[x] && data[x]===data[y] && data[x]==data[z]) {
          setWinner(true);
        }
      });
      setTurn( turn === "cross" ? "circle" : "cross");
    }
  }
  return (
    <>
      <Grid data={data} turn={turn} getGrid={onGridClick}/>
      { !winner ? <h1>{`Turn: ${turn}`}</h1> : null}
      {winner ? <h1>{`${ turn === "cross" ? "circle" : "cross"} won the game`}</h1> : null}
      { !(data.filter((d) => d === null).length) && !winner ? <h1>Match Draw</h1> : null}
      <button 
        style={{width:"100px", height:"50px", fontSize:"20Px"}} 
        onClick={() => {
          setData([null,null,null,null,null,null,null,null,null]);
          setTurn("cross");
          setWinner(false);
        }}
      >Reset</button>
    </>
  );
}

export default App;
