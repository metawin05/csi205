import { useState, useEffect } from "react";
import "./calculator.css";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [operator, setOperator] = useState(null);
  const [firstNumber, setFirstNumber] = useState(null);
  const [state, setState] = useState(0);
  const [calculate, setCalculate] = useState(null);

  const updateScreen = (newDisplay, newCalculate) => {
    setDisplay(newDisplay);
    setCalculate(newCalculate);
  };

  const onClickNumber = (number) => {
    if (display === "0" || state === 0) {
      updateScreen(number.toString(), calculate);
      setState(1);
    } else {
      updateScreen(display + number.toString(), calculate);
    }
  };

  const setOperatorHandler = (op, symbol) => {
    if (!operator) {
      setFirstNumber(parseFloat(display));
      setOperator(op);
      updateScreen(display + symbol, calculate);
      setState(2);
    }
  };

  const onClickReset = () => {
    setDisplay("0");
    setOperator(null);
    setFirstNumber(null);
    setState(0);
    setCalculate(null);
  };

  const onClickEqual = () => {
    if (firstNumber !== null && operator && state === 2) {
      let parts = [];
      let secondNumber = 0;

      if (operator === "/") parts = display.split("÷");
      else if (operator === "*") parts = display.split("×");
      else if (operator === "-") parts = display.split("−");
      else if (operator === "+") parts = display.split("+");

      secondNumber = parseFloat(parts[1]);
      let result = 0;
      let newCalculate = "";

      switch (operator) {
        case "/":
          result = firstNumber / secondNumber;
          newCalculate = `${firstNumber}÷${secondNumber}`;
          break;
        case "*":
          result = firstNumber * secondNumber;
          newCalculate = `${firstNumber}×${secondNumber}`;
          break;
        case "-":
          result = firstNumber - secondNumber;
          newCalculate = `${firstNumber}−${secondNumber}`;
          break;
        case "+":
          result = firstNumber + secondNumber;
          newCalculate = `${firstNumber}+${secondNumber}`;
          break;
        default:
          break;
      }

      updateScreen(result.toString(), newCalculate);
      setOperator(null);
      setFirstNumber(null);
      setState(0);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (/^[0-9]$/.test(event.key)) onClickNumber(event.key);
      else if (event.key === "+") setOperatorHandler("+", "+");
      else if (event.key === "-") setOperatorHandler("-", "−");
      else if (event.key === "*") setOperatorHandler("*", "×");
      else if (event.key === "/") setOperatorHandler("/", "÷");
      else if (event.key === "Enter") onClickEqual();
      else if (event.key === "Escape") onClickReset();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div
      style={{
        border: "1px solid lightgray",
        borderRadius: "0.5rem",
        padding: "0.5rem",
        margin: "20px",
        textAlign: "center",
      }}
    >
      <div className="cal-container">
        <div className="cal-calculate" dangerouslySetInnerHTML={{ __html: calculate || "" }}></div>
        <div className="cal-screen" dangerouslySetInnerHTML={{ __html: display }}></div>

        <div className="cal-btn-content">
          <button className="cal-btn top" onClick={onClickReset}>AC</button>
          <button className="cal-btn top"><sup>+</sup>/<sub>−</sub></button>
          <button className="cal-btn top">%</button>
          <button className="cal-btn left" onClick={() => setOperatorHandler("/", "÷")}>÷</button>
        </div>

        <div className="cal-btn-content">
          <button className="cal-btn number" onClick={() => onClickNumber(7)}>7</button>
          <button className="cal-btn number" onClick={() => onClickNumber(8)}>8</button>
          <button className="cal-btn number" onClick={() => onClickNumber(9)}>9</button>
          <button className="cal-btn left" onClick={() => setOperatorHandler("*", "×")}>×</button>
        </div>

        <div className="cal-btn-content">
          <button className="cal-btn number" onClick={() => onClickNumber(4)}>4</button>
          <button className="cal-btn number" onClick={() => onClickNumber(5)}>5</button>
          <button className="cal-btn number" onClick={() => onClickNumber(6)}>6</button>
          <button className="cal-btn left" onClick={() => setOperatorHandler("-", "−")}>−</button>
        </div>

        <div className="cal-btn-content">
          <button className="cal-btn number" onClick={() => onClickNumber(1)}>1</button>
          <button className="cal-btn number" onClick={() => onClickNumber(2)}>2</button>
          <button className="cal-btn number" onClick={() => onClickNumber(3)}>3</button>
          <button className="cal-btn left" onClick={() => setOperatorHandler("+", "+")}>+</button>
        </div>

        <div className="cal-btn-content">
          <button className="cal-btn number zero" onClick={() => onClickNumber(0)}>0</button>
          <button className="cal-btn left" onClick={onClickEqual}>=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
