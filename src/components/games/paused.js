import React from "react";
import GameEnvironment from "../GameEnvironment";

const paused = () => {
  return (
    <GameEnvironment>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h1>PAUSED</h1>
      </div>
    </GameEnvironment>
  );
};
export default paused;
