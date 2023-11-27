import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const totalButtons = 100;

  const initialButtonStates = Array.from({ length: totalButtons }, () => false);

  const storedButtonStates =
    JSON.parse(localStorage.getItem("buttonStates")) || initialButtonStates;

  const [buttonStates, setButtonStates] = useState(storedButtonStates);
  const [displayedButtons, setDisplayedButtons] = useState(21);
  const [loaded, setLoaded] = useState(false);
  const [toggledPercentage, setToggledPercentage] = useState(0);

  const toggleButton = (index) => {
    const newStates = [...buttonStates];
    newStates[index] = !newStates[index];
    setButtonStates(newStates);
  };

  const handleExpandCollapse = () => {
    setDisplayedButtons(displayedButtons === 21 ? 100 : 21);
  };

  const clearAllButtons = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear all buttons?"
    );
    if (confirmed) {
      setButtonStates(Array.from({ length: totalButtons }, () => false));
      setDisplayedButtons(21);
    }
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
      .filter((state) => state === true).length;
    const percentage = (toggledButtons / displayedButtons) * 100 || 0;
    setToggledPercentage(percentage.toFixed(0));
  }, [buttonStates, displayedButtons]);

  useEffect(() => {
    if (!loaded) {
      const hasToggledButton = buttonStates
        .slice(21)
        .some((state) => state === true);
      if (hasToggledButton) {
        setDisplayedButtons(100);
      }
      setLoaded(true);
    }
  }, [loaded]);

  return (
    <div className="app-container">
      <div className="header">
        <h1>Habit marker</h1>
      </div>

      <p>
        Check off your daily steps towards building the habit you want to
        acquire!
      </p>

      <div className="buttons-section">
        <div>
          {buttonStates.slice(0, displayedButtons).map((state, index) => (
            <button
              key={index}
              className={`round-button ${state ? "toggled" : ""}`}
              onClick={() => toggleButton(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="completion-percentage">
        <p>Completion percentage: {toggledPercentage}%</p>
        <button onClick={clearAllButtons}>Clear</button>
      </div>

      <div className="expand-action">
        <button onClick={handleExpandCollapse}>
          {displayedButtons === 21 ? "Expand" : "Collapse"}
        </button>
      </div>

      <div className="file-actions">
        <button onClick={saveToJSONFile}>Save to File</button>
        <input type="file" onChange={loadFromFile} accept=".json" />
      </div>
    </div>
  );
}

export default App;
