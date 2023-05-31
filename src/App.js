import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  const num = Math.floor(Math.random() * 3) + 3;

  return (
    <div className="App">
      <Board nrows={num} ncols={num} chanceLightStartsOn={0.5} />
    </div>
  );
}

export default App;
