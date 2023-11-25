import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const totalButtons = 21;
  const initialButtonState = 0;

  const initialButtonStates = Array.from(
    { length: totalButtons },
    () => initialButtonState
  );

  const storedButtonStates =
    JSON.parse(localStorage.getItem("buttonStates")) || initialButtonStates;

  const [buttonStates, setButtonStates] = useState(storedButtonStates);

  const toggleButton = (index) => {
    const newStates = [...buttonStates];
    newStates[index] = newStates[index] === 0 ? 1 : 0;
    setButtonStates(newStates);
  };

  useEffect(() => {
    localStorage.setItem("buttonStates", JSON.stringify(buttonStates));
  }, [buttonStates]);

  return (
    <div>
      <h1>Toggle Buttons</h1>
      {buttonStates.map((state, index) => (
        <button
          key={index}
          className={`round-button ${state === 1 ? "toggled" : ""}`}
          onClick={() => toggleButton(index)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}

export default App;
