import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { last } from 'lodash';

function App() {
  const [result, setResult] = useState("");
  const [expression, setExpression] = useState("");

  useEffect(() => {
    setResult(expression);
  }, [expression]);

  let valid = (op) => {
    let lastChar = expression.charAt(expression.length-1);
    if(lastChar=='' || lastChar=='%' || lastChar=="/" || lastChar=="*" || lastChar=="+" || lastChar=="-" ) {
      return "";
    }
    return op;
  };

  let trim=(exp) => {
    let lastChar = exp.charAt(exp.length-1);
    if(lastChar=='' || lastChar=='%' || lastChar=="/" || lastChar=="*" || lastChar=="+" || lastChar=="-" ) {
      return exp.slice(0,-1);
    }
    return exp;
  }
  return (
    <div className="App">
      <h1 id="result">{result}</h1>
      <button onClick={() => { setExpression("") }}>AC</button>
      <button onClick={() => { setExpression(expression.slice(0, -1)) }}>&larr;</button>
      <button className="operator" onClick={() => {setExpression(expression + valid('%'))}}>%</button>
      <button className="operator" onClick={() => {setExpression(expression + valid('/'))}}>/</button>
      <button onClick={() => { setExpression(expression + 7) }}>7</button>
      <button onClick={() => { setExpression(expression + 8) }}>8</button>
      <button onClick={() => { setExpression(expression + 9) }}>9</button>
      <button className="operator" onClick={() => {setExpression(expression + valid('*'))}}>*</button>
      <button onClick={() => { setExpression(expression + 4) }}>4</button>
      <button onClick={() => { setExpression(expression + 5) }}>5</button>
      <button onClick={() => { setExpression(expression + 6) }}>6</button>
      <button className="operator" onClick={() => {setExpression(expression + valid('-'))}}>-</button>
      <button onClick={() => { setExpression(expression + 1) }}>1</button>
      <button onClick={() => { setExpression(expression + 2) }}>2</button>
      <button onClick={() => { setExpression(expression + 3) }}>3</button>
      <button className="operator" onClick={() => {setExpression(expression + valid('+'))}}>+</button>
      <button style={{ gridColumn: "span 2" }} onClick={() => { setExpression(expression + 0) }}>0</button>
      <button onClick={() => { setExpression(expression + ".") }}>.</button>
      <button className="operator" onClick={() => {setExpression(eval(trim(expression)).toString())}}>=</button>
    </div>
  );
}

export default App;
