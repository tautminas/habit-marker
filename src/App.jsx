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
  const [displayedButtons, setDisplayedButtons] = useState(21);
  const [loaded, setLoaded] = useState(false);
  const [toggledPercentage, setToggledPercentage] = useState(0);

  const toggleButton = (index) => {
    const newStates = [...buttonStates];
    newStates[index] = newStates[index] === 0 ? 1 : 0;
    setButtonStates(newStates);
  };

  const handleExpandCollapse = () => {
    setDisplayedButtons(displayedButtons === 21 ? 100 : 21);
  };

  const clearAllButtons = () => {
    setButtonStates(
      Array.from({ length: totalButtons }, () => initialButtonState)
    );
    setDisplayedButtons(21); // Reset the displayed buttons to 21
  };

  const saveToJSONFile = () => {
    const json = JSON.stringify(buttonStates);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "buttonStates.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadFromFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        const parsedContent = JSON.parse(content);
        if (
          Array.isArray(parsedContent) &&
          parsedContent.length === totalButtons
        ) {
          setButtonStates(parsedContent);
        } else {
          throw new Error("Invalid file content or format.");
        }
      } catch (error) {
        console.error("Error while parsing file:", error);
      }
    };

    reader.readAsText(file);
  };

  useEffect(() => {
    localStorage.setItem("buttonStates", JSON.stringify(buttonStates));
    const toggledButtons = buttonStates
      .slice(0, displayedButtons)
      .filter((state) => state === 1).length;
    const percentage = (toggledButtons / displayedButtons) * 100 || 0;
    setToggledPercentage(percentage.toFixed(2));
  }, [buttonStates, displayedButtons]);

  useEffect(() => {
    if (!loaded) {
      const hasToggledButton = buttonStates
        .slice(21)
        .some((state) => state === 1);
      if (hasToggledButton) {
        setDisplayedButtons(100);
      }
      setLoaded(true);
    }
  }, [loaded]);

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
      <div>
        <button onClick={handleExpandCollapse}>
          {displayedButtons === 21 ? "Expand" : "Collapse"}
        </button>
        <button onClick={clearAllButtons}>Clear All</button>
        <button onClick={saveToJSONFile}>Save to File</button>
        <input type="file" onChange={loadFromFile} accept=".json" />
      </div>
      <p>Toggled Percentage: {toggledPercentage}%</p>
    </div>
  );
}

export default App;
