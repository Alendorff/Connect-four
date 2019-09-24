import {
  actions,
  findWinner,
  gameReducer,
  getWinnerFromSequence
} from "./gameController";

const p1 = "red";
const p2 = "yellow";

describe("game logic", () => {
  it("END_OF_TURN action works correctly", () => {
    const state = {
      field: [
        [0, 0, 0, 0, 0, 0, 0, 0], // bottom line
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ],
      player: p1,
      winner: null
    };

    expect(
      gameReducer(state, {
        type: actions.END_OF_TURN,
        payload: { x: 0, y: 3 }
      })
    ).toEqual({
      field: [
        [0, 0, 0, p1, 0, 0, 0, 0], // bottom line
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ],
      player: p2,
      winner: null
    });
  });

  it("END_OF_TURN action updates winner", () => {
    const state = {
      field: [
        [0, p1, p1, p1, 0, 0, 0, 0], // bottom line
        [0, p2, p2, p2, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ],
      player: p1,
      winner: null
    };

    expect(
      gameReducer(state, {
        type: actions.END_OF_TURN,
        payload: { x: 0, y: 0 }
      })
    ).toEqual({
      field: [
        [p1, p1, p1, p1, 0, 0, 0, 0], // bottom line
        [0, p2, p2, p2, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ],
      player: p2,
      winner: p1
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
        [0, p1, p2, p2, p1, 0, 0, 0], // bottom line
        [0, 0, p1, p1, p2, p1, 0, 0],
        [0, 0, p1, p1, p1, p1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ];
      expect(findWinner(field, p1, p2)).toBe(p1);
    });

    it("y axis win", () => {
      const field = [
        [0, p1, p2, p2, p1, 0, 0, 0], // bottom line
        [0, 0, p1, p2, p2, p1, 0, 0],
        [0, 0, p1, p2, p1, p1, 0, 0],
        [0, 0, 0, p2, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ];
      expect(findWinner(field, p1, p2)).toBe(p2);
    });

    it("diagonal-1 axis win", () => {
      const field = [
        [0, p1, p2, p2, p1, 0, 0, 0], // bottom line
        [0, p2, p1, p1, p2, 0, 0, 0],
        [0, p2, p2, p1, p2, 0, 0, 0],
        [0, 0, 0, 0, p1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ];
      expect(findWinner(field, p1, p2)).toBe(p1);
    });

    it("diagonal-2 axis win", () => {
      const field = [
        [0, p1, p2, p2, p1, 0, 0, 0], // bottom line
        [0, p2, p2, p1, 0, 0, 0, 0],
        [0, p2, p1, p2, 0, 0, 0, 0],
        [0, p1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ];
      expect(findWinner(field, p1, p2)).toBe(p1);
    });
  });
});
