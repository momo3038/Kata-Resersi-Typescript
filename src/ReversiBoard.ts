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


class Piece {
    constructor(x:number, y:number, state:tileState){
        
    }
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

    getTitleState(x: number, y: number): tileState {
        return this.board[x][y];
    }

    IsAnOpponent(x: number, y: number, player: Player): boolean {
        var opponent = (player == Player.Black) ? tileState.White : tileState.Black;
        return this.board[x][y] == opponent;
    }

    display(): string {
        var result = "";
        for (var y = 0; y < 8; y++) {
            for (var x = 0; x < 8; x++) {
                var state = this.getTitleState(x, y);
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

    isOutter(x: number, y: number): boolean {
        return x <= 0 || y <= 0 || x >= 7 || y >= 7;
    }

    getEligiblesMovesFor(player: Player): { x: number, y: number }[] {

        var eligiblesMoves: { x: number, y: number }[] = [];
        
        // Find opponent
        for (var row = 0; row < 8; row++) {
            for (var col = 0; col < 8; col++) {

                if (!this.IsAnOpponent(col, row, player))
                    continue;

                //Search our piece near this opponent
                for (var rowIndex = -1; rowIndex <= 1; rowIndex++) {
                    for (var colIndex = -1; colIndex <= 1; colIndex++) {
                        var indexX = col + colIndex;
                        var indexY = row + rowIndex;

                        if (this.isOutter(indexX, indexY))
                            continue;
                            
                        var me = (player == Player.White) ? tileState.White : tileState.Black;
                        if (this.board[indexX][indexY] == me) {
                            // Search in the opposite direction
                            var nextRow = () => 1 * -colIndex;
                            var nextCol = () => 1 * -rowIndex;

                            var isOver = false;

                            while (!isOver) {
                                indexX += nextRow();
                                indexY += nextCol();

                                var piece = this.getTitleState(indexX, indexY);

                                if (!this.IsAnOpponent(indexX, indexY, player)) {
                                    isOver = true;

                                    if (piece == tileState.Empty) {
                                        this.board[indexX][indexY] = tileState.Eligible;
                                        eligiblesMoves.push({ x: indexX, y: indexY })
                                    }
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