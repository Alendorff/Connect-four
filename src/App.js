import React, { Component, useReducer } from "react";
import { actions, gameReducer } from "./gameController";

import styled from "styled-components";

const player1 = {
  name: "Player1",
  color: "#ffc933"
};
const player2 = {
  name: "Player2",
  color: "red"
};

const Cell = styled.div`
  border-radius: 100%;
  height: 100%;
  width: 100%;
  background-color: ${props => props.color || "white"};
`;

const fieldHistory = [];

const initialState = {
  field: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ],
  players: {
    [player1.color]: player1,
    [player2.color]: player2
  },
  color: player1.color,
  winner: null
};

function Game() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const currentPlayer = state.players[state.color];
  const winner = state.winner;

  const ColoredName = ({ player }) => (
    <span style={{ color: player.color }}>{player.name}</span>
  );

  const TurnMessage = () =>
    winner ? (
      <>
        <ColoredName player={winner} /> has won!
      </>
    ) : (
      <>
        <ColoredName player={currentPlayer} />
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
    fieldHistory.push(state.field);
    dispatch({
      type: actions.END_OF_TURN,
      payload: { col }
    });
  };

  const handleRollback = () => {
    dispatch({
      type: actions.ROLLBACK,
      payload: { field: fieldHistory.pop() }
    });
  };

  return (
    <>
      <div style={{ margin: "100px auto", width: 300 }}>
        <h1>
          <TurnMessage />
        </h1>
        <div>
          <button
            onClick={() => handleRollback()}
            disabled={!fieldHistory.length || state.winner}
          >
            Rollback
          </button>
        </div>
      </div>

      <table
        style={{
          margin: "0 auto",
          border: "1px solid black",
          backgroundColor: "rgb(76, 76, 234)"
        }}
      >
        <tbody>
          {state.field.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((col, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    height: 60,
                    width: 60,
                    padding: 5
                  }}
                >
                  <Cell color={col} onClick={() => handleMove(colIndex)} />
                </td>
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
