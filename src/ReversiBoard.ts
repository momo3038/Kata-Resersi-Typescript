'use strict';
import Complex from "./Complex";

export enum tileState {
    Black,
    White,
    Empty,
    Eligible
}

export enum Player {
    Black,
    White
}

export default class ReversiBoard {
    private board: tileState[][] = [];

    constructor() {
        for (var a = 0; a < 8; a++) {
            this.board[a] = [];
            for (var b = 0; b < 8; b++) {
                this.board[a][b] = tileState.Empty
            }
        }

        this.initialize();
    }

    initialize(...positions: { x: number, y: number, who: Player }[]): void {
        for (var position of positions) {
            this.board[position.x][position.y] = (position.who == Player.Black) ? tileState.Black : tileState.White;
        }
    }

    getTitleState(coord: { x: number, y: number }): tileState {
        return this.board[coord.x][coord.y];
    }

    IsAnOpponent(coord: { x: number, y: number }): boolean {
        return this.board[coord.x][coord.y] == tileState.Black;
    }

    display(): string {
        var result = "";
        for (var y = 0; y < 8; y++) {
            for (var x = 0; x < 8; x++) {
                var state = this.getTitleState({ x, y });
                if (state == tileState.Empty)
                    result += ".";

                if (state == tileState.White)
                    result += "W";

                if (state == tileState.Black)
                    result += "B";

                if (state == tileState.Eligible)
                    result += "0";

                if (y >= 0 && y < 8 || x >= 0 && x < 8)
                    result += " ";


            }
            result += "\n\r";
        }

        return result;
    }

    getEligiblesMovesFor(player: Player): { x: number, y: number }[] {

        var eligiblesMoves: { x: number, y: number }[] = [];
        
        // Find all opponent
        for (var row = 0; row < 8; row++) {
            for (var col = 0; col < 8; col++) {

                if (!this.IsAnOpponent({ x: col, y: row }))
                    continue;

                console.log("opponent found at x :" + col + " y : " + row);
                //Search our piece near this opponent
                for (var rowIndex = -1; rowIndex <= 1; rowIndex++) {

                    if (row + rowIndex <= 0 || row + rowIndex >= 7)
                        continue;

                    for (var colIndex = -1; colIndex <= 1; colIndex++) {

                        if (col + colIndex <= 0 || col + colIndex >= 7)
                            continue;

                        var indexX = col + colIndex;
                        var indexY = row + rowIndex;

                        if (this.board[indexX][indexY] == tileState.White) {
                            // Search in the opposite direction
                            var nextRow = () => 1 * -colIndex;
                            var nextCol = () => 1 * -rowIndex;

                            var isOver = false;

                            while (!isOver) {
                                indexX += nextRow();
                                indexY += nextCol();

                                var piece = this.board[indexX][indexY];

                                if (piece == tileState.White) {
                                    console.log("white detected. over");
                                    isOver = true;
                                }
                                else if (piece == tileState.Empty) {
                                    isOver = true;
                                    this.board[indexX][indexY] = tileState.Eligible;
                                    eligiblesMoves.push({ x: indexX, y: indexY })
                                    console.log("found eligible position (x:" + indexX + ") y : " + indexY);
                                }
                            };
                        }
                    }
                }
            }
        }

        return eligiblesMoves;
    }
}