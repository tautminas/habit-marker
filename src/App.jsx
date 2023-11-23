import React, { useState } from "react";
import "./styles.css";

function App() {
  const totalButtons = 21;
  const initialColor = "#FFFFCC";

  const initialButtonColors = Array.from(
    { length: totalButtons },
    () => initialColor
  );

  const [buttonColors, setButtonColors] = useState(initialButtonColors);

  const changeColor = (index) => {
    const newColors = [...buttonColors];
    newColors[index] =
      newColors[index] === initialColor ? "#FFD700" : initialColor;
    setButtonColors(newColors);
  };

  return (
    <div>
      <h1>Toggle Color Buttons</h1>
      {buttonColors.map((color, index) => (
        <button
          key={index}
          className="round-button"
          style={{ backgroundColor: color }}
          onClick={() => changeColor(index)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}

export default App;
