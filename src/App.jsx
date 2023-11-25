import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const totalButtons = 100; // Total buttons available
  const initialButtonState = 0;

  const initialButtonStates = Array.from(
    { length: totalButtons },
    () => initialButtonState
  );

  const storedButtonStates =
    JSON.parse(localStorage.getItem("buttonStates")) || initialButtonStates;

  const [buttonStates, setButtonStates] = useState(storedButtonStates);
  const [displayedButtons, setDisplayedButtons] = useState(21); // Initially displaying 21 buttons

  const toggleButton = (index) => {
    const newStates = [...buttonStates];
    newStates[index] = newStates[index] === 0 ? 1 : 0;
    setButtonStates(newStates);
  };

  const handleExpandCollapse = () => {
    setDisplayedButtons(displayedButtons === 21 ? 100 : 21);
  };

  useEffect(() => {
    localStorage.setItem("buttonStates", JSON.stringify(buttonStates));
  }, [buttonStates]);

  return (
    <div>
      <h1>Toggle Buttons</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {buttonStates.slice(0, displayedButtons).map((state, index) => (
          <button
            key={index}
            className={`round-button ${state === 1 ? "toggled" : ""}`}
            onClick={() => toggleButton(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button onClick={handleExpandCollapse}>
        {displayedButtons === 21 ? "Expand" : "Collapse"}
      </button>
    </div>
  );
}

export default App;
