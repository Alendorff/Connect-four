import React, { Component, useReducer } from "react";
import { actions, gameReducer } from "./gameController";

import styled from "styled-components";

const player1 = "red";
const player2 = "green";

const Cell = styled.td`
  height: 60px;
  width: 60px;
  outline: 1px solid black;
  background-color: ${props => props.color || "transparent"};
`;

const initialState = {
  field: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ],
  players: [player1, player2],
  player: player1,
  winner: null
};

function Game() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const currentColor = state.player;
  const winner = state.winner;

  const ColoredName = ({ color }) => (
    <span style={{ color }}>{color.toUpperCase()}</span>
  );
  const TurnMessage = () =>
    winner ? (
      <>
        Player <ColoredName color={winner} /> has won!
      </>
    ) : (
      <>
        <ColoredName color={currentColor} />
        's turn
      </>
    );

  const handleMove = col => {
    if (winner) {
      return;
    }
    if (state.field[0][col]) {
      return;
    }
    dispatch({
      type: actions.END_OF_TURN,
      payload: { col }
    });
  };

  return (
    <>
      <h1>
        <TurnMessage />
      </h1>
      <table style={{ margin: "100px auto", border: "1px solid black" }}>
        <tbody>
          {state.field.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((col, colIndex) => (
                <Cell
                  key={colIndex}
                  color={col}
                  onClick={() => handleMove(colIndex)}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game />
      </div>
    );
  }
}

export default App;
