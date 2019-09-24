const WIN_COUNT = 4;

export const actions = {
  END_OF_TURN: "END_OF_TURN"
};

export function gameReducer(state, { type, payload }) {
  switch (type) {
    case actions.END_OF_TURN: {
      const { col } = payload;
      const newField = JSON.parse(JSON.stringify(state.field))

      // case with column overflow is unhandled here but handled on view side
      let rowIndex = newField.length - 1
      while (rowIndex >= 0) {
        if (!newField[rowIndex][col]) {
          newField[rowIndex][col] = state.player
          break
        }
        rowIndex--
      }

      let winner = findWinner(newField, ...state.players);

      return {
        field: newField,
        players: state.players,
        player:
          state.player === state.players[0]
            ? state.players[1]
            : state.players[0],
        winner
      };
    }

    default: {
      return state;
    }
  }
}

export function findWinner(newField, player1, player2) {
  let rowIndex = 0;
  // x axis
  while (rowIndex < newField.length) {
    let winner = getWinnerFromSequence(newField[rowIndex], player1, player2);
    if (winner) {
      return winner;
    }
    rowIndex++;
  }

  // y axis
  const transposedField = transpose(newField);
  rowIndex = 0;
  while (rowIndex < transposedField.length) {
    let winner = getWinnerFromSequence(
      transposedField[rowIndex],
      player1,
      player2
    );
    if (winner) {
      return winner;
    }
    rowIndex++;
  }

  const bottomToTop = true;
  const diagonalsFromBottom = getAllDiagonals(newField, bottomToTop);
  rowIndex = 0;
  while (rowIndex < diagonalsFromBottom.length) {
    let winner = getWinnerFromSequence(
      diagonalsFromBottom[rowIndex],
      player1,
      player2
    );
    if (winner) {
      return winner;
    }
    rowIndex++;
  }

  return null;
}

export function getWinnerFromSequence(vector, player1, player2) {
  let count = {
    [player1]: 0,
    [player2]: 0,
    reset() {
      this[player1] = 0;
      this[player2] = 0;
    }
  };
  let lastValue = null;
  let index = 0;

  while (index < vector.length) {
    let item = vector[index];
    if (lastValue !== item) {
      count.reset();
    }
    if (item) {
      count[item]++;
      if (count[item] === WIN_COUNT) {
        return item;
      }
    }
    lastValue = item;
    index++;
  }

  return null;
}

function transpose(matrix) {
  return matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
}

function getAllDiagonals(array) {
  const height = array.length;
  const width = array[0].length;

  function getBackSlash(i, j) {
    // direction \
    var result = [];
    while (i > 0 && j > 0) {
      // is space to move (top/left)?
      i--;
      j--;
    }
    while (i < height && j < width) {
      // are items in the range to collect?
      result.push(array[i][j]);
      i++;
      j++;
    }
    return result;
  }

  function getSlash(i, j) {
    // direction /
    var result = [];
    while (i > 0 && j + 1 < width) {
      // is space to move (top/right)?
      i--;
      j++;
    }
    while (i < height && j >= 0) {
      // are items in the range to collect?
      result.push(array[i][j]);
      i++;
      j--;
    }
    return result;
  }

  const allDiagonals = [];
  for (let i = 0; i < array.length; i++) {
    allDiagonals.push(getSlash(i, 0));
    allDiagonals.push(getBackSlash(i, 0));
  }
  for (let k = 0; k < array[0].length; k++) {
    allDiagonals.push(getSlash(0, k));
    allDiagonals.push(getBackSlash(0, k));
  }
  return allDiagonals;
}
