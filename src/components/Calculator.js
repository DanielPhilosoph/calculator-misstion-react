import Button from "./Button";
import { useState } from "react";
import stringMath from "string-math";

export default function Calculator() {
  const [displayValue, setDisplayValue] = useState(0);
  const [equationValue, setEquationValue] = useState("0");

  const clear = () => {
    setDisplayValue(0);
    setEquationValue("0");
  };

  const sliceLastOperator = (equationValue, value) => {
    const reg = new RegExp("^[0-9.]+$");
    for (let i = equationValue.length - 1; i > 0; i--) {
      if (!reg.test(equationValue[i])) {
        equationValue = equationValue.toString().substr(0, i);
      } else {
        break;
      }
    }
    return equationValue + value;
  };

  const onEqualsClick = (value) => {
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
  };

  const onDotClick = () => {
    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
      setEquationValue(equationValue + ".");
    }
  };

  const onOperatorClick = (value) => {
    // If = is in equationValue, start with this number
    if (equationValue.includes("=")) {
      setDisplayValue(value);
      setEquationValue(equationValue.split("=")[1] + value);
    } else {
      const reg = new RegExp("^[0-9.]+$");
      // If last click was an operator
      if (!reg.test(displayValue)) {
        // If "-" wasnt clicked, delete last operator
        if (value !== "-") {
          setEquationValue(sliceLastOperator(equationValue, value));
        } else {
          // If "-" clicked, add it to equation
          setEquationValue(equationValue + value);
        }
      } else {
        // If last click was a number, add operator
        setEquationValue(equationValue + value);
      }
      setDisplayValue(value);
    }
  };

  const onNumberClick = (value) => {
    // If = was pressed before
    if (equationValue.includes("=")) {
      setDisplayValue(equationValue.split("=")[1] + value);
      setEquationValue(equationValue.split("=")[1] + value);
    } else {
      // If in inisial state
      if (displayValue === 0 || displayValue === "0") {
        setDisplayValue(value);
        setEquationValue(value);
      } else {
        const reg = new RegExp("^[0-9.]+$");
        if (!reg.test(displayValue)) {
          setDisplayValue(value);
          setEquationValue(equationValue + value);
        } else {
          setDisplayValue(displayValue + value);
          setEquationValue(equationValue + value);
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="equationDivs">
        <div className="equation">{equationValue}</div>
        <div className="values" id="display">
          {displayValue}
        </div>
      </div>
      <div className="buttons">
        <table>
          <tbody>
            <tr>
              <td colSpan="2">
                <Button id="clear" text="AC" onClick={clear} />
              </td>

              <td>
                <Button id="divide" text="/" onClick={onOperatorClick} />
              </td>
              <td>
                {" "}
                <Button id="multiply" text="X" onClick={onOperatorClick} />
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <Button id="seven" text="7" onClick={onNumberClick} />
              </td>
              <td>
                {" "}
                <Button id="eight" text="8" onClick={onNumberClick} />
              </td>
              <td>
                {" "}
                <Button id="nine" text="9" onClick={onNumberClick} />
              </td>
              <td>
                {" "}
                <Button id="subtract" text="-" onClick={onOperatorClick} />
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <Button id="four" text="4" onClick={onNumberClick} />
              </td>
              <td>
                {" "}
                <Button id="five" text="5" onClick={onNumberClick} />
              </td>
              <td>
                {" "}
                <Button id="six" text="6" onClick={onNumberClick} />
              </td>
              <td>
                {" "}
                <Button id="add" text="+" onClick={onOperatorClick} />
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <Button id="one" text="1" onClick={onNumberClick} />
              </td>
              <td>
                {" "}
                <Button id="two" text="2" onClick={onNumberClick} />
              </td>
              <td>
                {" "}
                <Button id="three" text="3" onClick={onNumberClick} />
              </td>
              <td rowSpan="2">
                {" "}
                <Button
                  classes="equalsButton"
                  id="equals"
                  text="="
                  onClick={onEqualsClick}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                {" "}
                <Button id="zero" text="0" onClick={onNumberClick} />
              </td>
              <td>
                {" "}
                <Button id="decimal" text="." onClick={onDotClick} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
