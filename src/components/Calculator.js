import Button from "./Button";
import { useState } from "react";
import stringMath from "string-math";

export default function Calculator() {
  const [displayValue, setDisplayValue] = useState(0);
  const [equationValue, setEquationValue] = useState("");

  const clear = () => {
    setDisplayValue(0);
    setEquationValue("");
  };

  const onNumberClick = (value) => {
    // If pressed =
    if (value === "=") {
      if (equationValue.includes("=")) {
        setDisplayValue(equationValue.split("=")[1]);
        setEquationValue(equationValue.split("=")[1]);
      } else {
        try {
          let resault = stringMath(equationValue);
          setEquationValue(equationValue + value + resault);
          setDisplayValue(resault);
        } catch {
          //? If equationValue isnt a valid equation - Ignore
        }
      }
    } else {
      // If = was pressed before
      if (equationValue.includes("=")) {
        setDisplayValue(value);
        setEquationValue(equationValue.split("=")[1] + value);
      } else {
        // If in inisial state
        if (displayValue === 0 || displayValue === "0") {
          // If starts with .
          if (value === ".") {
            setDisplayValue("0" + value);
            setEquationValue("0" + value);
          } else {
            setDisplayValue(value);
            setEquationValue(value);
          }
        } else {
          const reg = new RegExp("^[0-9]+$");
          // If doesnt have "." init
          if (!displayValue.toString().includes(".")) {
            // If number of a "." and not an operator
            if ((reg.test(value) && reg.test(displayValue)) || value === ".") {
              setDisplayValue(displayValue + value);
              setEquationValue(equationValue + value);
            } else {
              if (
                (reg.test(value) && !reg.test(displayValue)) ||
                (!reg.test(value) && reg.test(displayValue))
              ) {
                setDisplayValue(value);
                setEquationValue(equationValue + value);
              } else {
                // If operator is pressed after another oparator is pressed
                setDisplayValue(value);
                setEquationValue(
                  equationValue.toString().slice(0, equationValue.length - 1) +
                    value
                );
              }
              // If an operator show him only on display
            }
          } else if (reg.test(value) && value !== ".") {
            // If value is a number
            setDisplayValue(displayValue + value);
            setEquationValue(equationValue + value);
          } else {
            // If value is an operator
            if (value !== ".") {
              setDisplayValue(value);
              setEquationValue(equationValue + value);
            }
            // If is a "." - Ignore
          }
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="equation">{equationValue}</div>
      <div className="values" id="display">
        {displayValue}
      </div>
      <div className="buttons">
        <div>
          <Button id="clear" text="AC" onClick={clear} />
          <Button id="divide" text="/" onClick={onNumberClick} />
          <Button id="multiply" text="X" onClick={onNumberClick} />
        </div>
        <div>
          <Button id="seven" text="7" onClick={onNumberClick} />
          <Button id="eight" text="8" onClick={onNumberClick} />
          <Button id="nine" text="9" onClick={onNumberClick} />
          <Button id="subtract" text="-" onClick={onNumberClick} />
        </div>
        <div>
          <Button id="four" text="4" onClick={onNumberClick} />
          <Button id="five" text="5" onClick={onNumberClick} />
          <Button id="six" text="6" onClick={onNumberClick} />
          <Button id="add" text="+" onClick={onNumberClick} />
        </div>
        <div>
          <Button id="one" text="1" onClick={onNumberClick} />
          <Button id="two" text="2" onClick={onNumberClick} />
          <Button id="three" text="3" onClick={onNumberClick} />
          <Button id="equals" text="=" onClick={onNumberClick} />
        </div>
        <div>
          <Button id="zero" text="0" onClick={onNumberClick} />
          <Button id="decimal" text="." onClick={onNumberClick} />
        </div>
      </div>
    </div>
  );
}
