import {
  actions,
  findWinner,
  gameReducer,
  getWinnerFromSequence
} from "./gameController";


const player1 = {
  name: "player1",
  color: "#ffc933"
};
const player2 = {
  name: "player2",
  color: "red"
};
const p1 = player1.color
const p2 = player2.color

describe("game logic", () => {
  it("END_OF_TURN action works correctly", () => {
    const state = {
      field: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, p2, p1, 0, 0, 0, 0],
        [0, 0, p2, p1, 0, 0, 0, 0],
        [0, 0, p1, p1, 0, 0, 0, 0]
      ],
      players: {
        [player1.color]: player1,
        [player2.color]: player2
      },
      color: p1,
      winner: null
    };

    expect(
      gameReducer(state, {
        type: actions.END_OF_TURN,
        payload: { col: 3 }
      })
    ).toEqual({
      field: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, p1, 0, 0, 0, 0],
        [0, 0, p2, p1, 0, 0, 0, 0],
        [0, 0, p2, p1, 0, 0, 0, 0],
        [0, 0, p1, p1, 0, 0, 0, 0]
      ],
      players: {
        [player1.color]: player1,
        [player2.color]: player2
      },
      color: p2,
      winner: player1
    });
  });

  it("getWinnerFromSequence works", () => {
    const p1 = 1;
    const p2 = 2;
    expect(getWinnerFromSequence([0, 0, p1, p1, p1, p1, 0], p1, p2)).toBe(p1);

    expect(getWinnerFromSequence([p1, p1, p1, p1, p2, p2, 0], p1, p2)).toBe(p1);

    expect(getWinnerFromSequence([p1, p1, p1, p2, p2, p2, p2], p1, p2)).toBe(
      p2
    );

    expect(getWinnerFromSequence([p1, p1, p1, p2, p2, p2, 0], p1, p2)).toBe(
      null
    );

    expect(getWinnerFromSequence([p1, p1, p1, 0, p2, p2, p2, 0], p1, p2)).toBe(
      null
    );

    expect(getWinnerFromSequence([p1, p2, p1, p2, p2, p1, p2], p1, p2)).toBe(
      null
    );
  });

  describe("findWinner works", () => {
    const p1 = "player-1";
    const p2 = "player-2";

    it("x axis win", () => {
      const field = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, p1, p1, p1, p1, 0, 0],
        [0, 0, p1, p1, p2, p1, 0, 0],
        [0, p1, p2, p2, p1, 0, 0, 0]
      ];
      expect(findWinner(field, p1, p2)).toBe(p1);
    });

    it("y axis win", () => {
      const field = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, p2, 0, 0, 0, 0],
        [0, 0, p1, p2, p1, p1, 0, 0],
        [0, 0, p1, p2, p2, p1, 0, 0],
        [0, p1, p2, p2, p1, 0, 0, 0]
      ];
      expect(findWinner(field, p1, p2)).toBe(p2);
    });

    it("slash axis win", () => {
      const field = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, p1, 0, 0, 0],
        [0, p2, p2, p1, p2, 0, 0, 0],
        [0, p2, p1, p1, p2, 0, 0, 0],
        [0, p1, p2, p2, p1, 0, 0, 0]
      ];
      expect(findWinner(field, p1, p2)).toBe(p1);
    });

    it("backslash axis win", () => {
      const field = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, p1, 0, 0, 0, 0, 0, 0],
        [0, p2, p1, p2, 0, 0, 0, 0],
        [0, p2, p2, p1, 0, 0, 0, 0],
        [0, p1, p2, p2, p1, 0, 0, 0]
      ];
      expect(findWinner(field, p1, p2)).toBe(p1);
    });
  });
});
