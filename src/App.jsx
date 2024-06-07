import { useState } from "react";
import styles from "./App.module.css";

function App() {
  const [operand1, setOperand1] = useState("");
  const [operator, setOperator] = useState("");
  const [operand2, setOperand2] = useState("");
  const [result, setResult] = useState("");
  const [isBlinking, setIsBlinking] = useState(true); // Изначально курсор мигает

  const BUTTONS = [
    "7",
    "8",
    "9",
    "C",
    "4",
    "5",
    "6",
    "+",
    "1",
    "2",
    "3",
    "-",
    "0",
    "=",
  ];

  const handleButtonClick = (btn) => {
    if (!isNaN(btn)) {
      handleNumberClick(btn);
    } else {
      handleOperatorClick(btn);
    }
  };

  const handleNumberClick = (num) => {
    setIsBlinking(false); // Отключаем мигание курсора при вводе числа или оператора
    if (result !== "") {
      setOperand1(num);
      setOperator("");
      setOperand2("");
      setResult("");
    } else if (operator) {
      setOperand2((prev) => prev + num);
    } else {
      setOperand1((prev) => prev + num);
    }
  };

  const handleOperatorClick = (op) => {
    setIsBlinking(false); // Отключаем мигание курсора при вводе числа или оператора
    if (op === "C") {
      setOperand1("");
      setOperator("");
      setOperand2("");
      setResult("");
      setIsBlinking(true); // Включаем мигание курсора при сбросе
    } else if (op === "=") {
      const num1 = parseInt(operand1, 10);
      const num2 = parseInt(operand2, 10);
      let res = 0;
      if (operator === "+") {
        res = num1 + num2;
      } else if (operator === "-") {
        res = num1 - num2;
      }
      setResult(res);
    } else if (op === "-" && operand1 === "") {
      setOperand1("-");
    } else if (op !== "-" || (op === "-" && operand1 !== "-")) {
      setOperator(op);
    }
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.display}>
        {result !== "" ? result : `${operand1}${operator}${operand2}`}
        {isBlinking && <span className={styles.cursor}>|</span>}{" "}
        {/* Отображение курсора */}
      </div>
      <div className={styles.buttons}>
        {BUTTONS.map((btn) => (
          <button
            key={btn}
            className={`${styles.button} ${
              btn === "C"
                ? styles.clear
                : btn === "+"
                ? styles.plus
                : btn === "-"
                ? styles.minus
                : isNaN(btn) && btn !== "="
                ? styles.operator
                : ""
            } ${btn === "=" ? styles.equal : ""}`}
            onClick={() => handleButtonClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
