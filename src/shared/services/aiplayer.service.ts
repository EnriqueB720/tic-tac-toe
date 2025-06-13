import { PlayerType } from "@types";

export default class AiPlayerHelper {
  public checkWinner(
    matrix: (PlayerType | null)[][]
  ): PlayerType | "draw" | null {
    const lines = [
      // Rows
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      // Columns
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      // Diagonals
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (
        matrix[a[0]][a[1]] !== null &&
        matrix[a[0]][a[1]] === matrix[b[0]][b[1]] &&
        matrix[a[0]][a[1]] === matrix[c[0]][c[1]]
      ) {
        return matrix[a[0]][a[1]];
      }
    }

    if (matrix.flat().every((cell) => cell !== null)) {
      return "draw";
    }

    return null;
  }

  public getBestMove(
    board: (PlayerType | null)[][],
    aiPlayer: PlayerType = "O",
    humanPlayer: PlayerType = "X"
  ) {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == null) {
          const newBoard = this.cloneBoard(board);
          newBoard[i][j] = aiPlayer;
          const score = this.minimax(newBoard, 0, false, aiPlayer, humanPlayer);
          if (score > bestScore) {
            bestScore = score;
            move = { row: i, col: j };
          }
        }
      }
    }
    
    return move;
  }

  private minimax(
    board: (PlayerType | null)[][],
    depth: number,
    isMaximizing: boolean,
    aiPlayer: PlayerType,
    humanPlayer: PlayerType
  ) {
    const winner = this.checkWinner(board);
    if (winner !== null) {
      const scores = {
        [aiPlayer]: 10 - depth,
        [humanPlayer]: depth - 10,
        draw: 0,
      };
      return scores[winner];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === null) {
            board[i][j] = aiPlayer;
            const score = this.minimax(
              board,
              depth + 1,
              false,
              aiPlayer,
              humanPlayer
            );
            board[i][j] = null;
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === null) {
            board[i][j] = humanPlayer;
            const score = this.minimax(
              board,
              depth + 1,
              true,
              aiPlayer,
              humanPlayer
            );
            board[i][j] = null;
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }

  private cloneBoard(board: (PlayerType | null)[][]): (PlayerType | null)[][] {
    return board.map((row) => row.slice());
  }
}
