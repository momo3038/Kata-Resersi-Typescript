'use strict';

import Complex from "../src/Complex";
import ReversiBoard, {tileState} from "../src/ReversiBoard"
import { Player } from "../src/ReversiBoard"
import { expect } from 'chai';

describe("Resersi Game", () => {

    beforeEach(() => {

    });

    it("Should initialize a board", () => {
        let board = new ReversiBoard();

        expect(board.getTitleState(4,4)).to.be.eq(tileState.Empty);
    })

    it("Should add initial state", () => {
        let board = new ReversiBoard();

        board.initialize(
            { x: 3, y: 3, who: Player.Black },
            { x: 3, y: 4, who: Player.White },
            { x: 4, y: 3, who: Player.White },
            { x: 4, y: 4, who: Player.Black });

        expect(board.getTitleState(3, 3)).to.be.eq(tileState.Black);
        expect(board.getTitleState(3, 4)).to.be.eq(tileState.White);
        expect(board.getTitleState(4, 3)).to.be.eq(tileState.White);
        expect(board.getTitleState(4, 4)).to.be.eq(tileState.Black);
    });


    it("Should detect a horizontal move (from left to right)", () => {
        let board = new ReversiBoard();

        board.initialize(
            { x: 3, y: 3, who: Player.White },
            { x: 4, y: 3, who: Player.Black });

        var eligiblesMoves = board.getEligiblesMovesFor(Player.White);

        expect(eligiblesMoves.length).to.be.eq(1);
        expect(eligiblesMoves[0].x).to.be.eq(5);
        expect(eligiblesMoves[0].y).to.be.eq(3);
    });

    it("Should detect a horizontal move (from right to left)", () => {
        let board = new ReversiBoard();

        board.initialize(
            { x: 3, y: 3, who: Player.Black },
            { x: 4, y: 3, who: Player.White });

        var eligiblesMoves = board.getEligiblesMovesFor(Player.White);

        var result = board.display();
        console.log(result);

        expect(eligiblesMoves.length).to.be.eq(1);
        expect(eligiblesMoves[0].x).to.be.eq(2);
        expect(eligiblesMoves[0].y).to.be.eq(3);
    });

    it("Should detect a vertical move (from top to bottom)", () => {
        let board = new ReversiBoard();

        board.initialize(
            { x: 3, y: 3, who: Player.White },
            { x: 3, y: 4, who: Player.Black });

        var eligiblesMoves = board.getEligiblesMovesFor(Player.White);

        var result = board.display();
        console.log(result);

        expect(eligiblesMoves.length).to.be.eq(1);
        expect(eligiblesMoves[0].x).to.be.eq(3);
        expect(eligiblesMoves[0].y).to.be.eq(5);
    });

    it("Should detect a vertical move (from bottom to top)", () => {
        let board = new ReversiBoard();

        board.initialize(
            { x: 3, y: 3, who: Player.Black },
            { x: 3, y: 4, who: Player.White });

        var eligiblesMoves = board.getEligiblesMovesFor(Player.White);

        var result = board.display();
        console.log(result);

        expect(eligiblesMoves.length).to.be.eq(1);
        expect(eligiblesMoves[0].x).to.be.eq(3);
        expect(eligiblesMoves[0].y).to.be.eq(2);
    });

    it("Should detect a diagonal move (from top left to bottom right)", () => {
        let board = new ReversiBoard();

        board.initialize(
            { x: 2, y: 3, who: Player.White },
            { x: 3, y: 4, who: Player.Black });

        var eligiblesMoves = board.getEligiblesMovesFor(Player.White);

        var result = board.display();
        console.log(result);

        expect(eligiblesMoves.length).to.be.eq(1);
        expect(eligiblesMoves[0].x).to.be.eq(4);
        expect(eligiblesMoves[0].y).to.be.eq(5);
    });

    it("Should detect a diagonal move (from bottom right to top left)", () => {
        let board = new ReversiBoard();

        board.initialize(
            { x: 2, y: 3, who: Player.Black },
            { x: 3, y: 4, who: Player.White });

        var eligiblesMoves = board.getEligiblesMovesFor(Player.White);

        var result = board.display();
        console.log(result);

        expect(eligiblesMoves.length).to.be.eq(1);
        expect(eligiblesMoves[0].x).to.be.eq(1);
        expect(eligiblesMoves[0].y).to.be.eq(2);
    });


    it("Should detect a diagonal move (from top right to bottom left)", () => {
        let board = new ReversiBoard();

        board.initialize(
            { x: 4, y: 3, who: Player.White },
            { x: 3, y: 4, who: Player.Black });

        var eligiblesMoves = board.getEligiblesMovesFor(Player.White);

        var result = board.display();
        console.log(result);

        expect(eligiblesMoves.length).to.be.eq(1);
        expect(eligiblesMoves[0].x).to.be.eq(2);
        expect(eligiblesMoves[0].y).to.be.eq(5);
    });


    it("Should detect a diagonal move (from bottom left to top right)", () => {
        let board = new ReversiBoard();

        board.initialize(
            { x: 4, y: 3, who: Player.Black },
            { x: 3, y: 4, who: Player.White });

        var eligiblesMoves = board.getEligiblesMovesFor(Player.White);

        var result = board.display();
        console.log(result);

        expect(eligiblesMoves.length).to.be.eq(1);
        expect(eligiblesMoves[0].x).to.be.eq(5);
        expect(eligiblesMoves[0].y).to.be.eq(2);
    });


    it("Should detect a complete example without border case", () => {
        let board = new ReversiBoard();

        board.initialize(
            { x: 3, y: 3, who: Player.Black },
            { x: 4, y: 3, who: Player.White },
            { x: 3, y: 4, who: Player.White },
            { x: 4, y: 4, who: Player.Black });

        var eligiblesMoves = board.getEligiblesMovesFor(Player.White);

        var result = board.display();
        console.log(result);

        expect(eligiblesMoves.length).to.be.eq(4);
        expect(eligiblesMoves[0].x).to.be.eq(2);
        expect(eligiblesMoves[0].y).to.be.eq(3);

        expect(eligiblesMoves[1].x).to.be.eq(3);
        expect(eligiblesMoves[1].y).to.be.eq(2);

        expect(eligiblesMoves[2].x).to.be.eq(4);
        expect(eligiblesMoves[2].y).to.be.eq(5);

        expect(eligiblesMoves[3].x).to.be.eq(5);
        expect(eligiblesMoves[3].y).to.be.eq(4);
    });

    it("Should detect a complete example with border case", () => {
        let board = new ReversiBoard();

        board.initialize(
            { x: 0, y: 0, who: Player.Black },
            { x: 1, y: 0, who: Player.White },

            { x: 7, y: 0, who: Player.Black },
            { x: 6, y: 0, who: Player.White },

            { x: 0, y: 7, who: Player.Black },
            { x: 1, y: 7, who: Player.White },

            { x: 7, y: 7, who: Player.Black },
            { x: 6, y: 7, who: Player.White });

        var eligiblesMoves = board.getEligiblesMovesFor(Player.White);

        var result = board.display();
        console.log(result);

        expect(eligiblesMoves.length).to.be.eq(0);
    });

    it("Should detect a complexe reversi", () => {
        let board = new ReversiBoard();

        board.initialize(
            { x: 2, y: 3, who: Player.Black },
            { x: 3, y: 3, who: Player.Black },
            { x: 4, y: 3, who: Player.White },

            { x: 2, y: 4, who: Player.Black },
            { x: 3, y: 4, who: Player.Black },
            { x: 4, y: 4, who: Player.White },
            { x: 5, y: 4, who: Player.White },
            { x: 7, y: 4, who: Player.White },

            { x: 3, y: 5, who: Player.Black },
            { x: 4, y: 5, who: Player.White },
            { x: 5, y: 5, who: Player.White },
            { x: 6, y: 5, who: Player.White },

            { x: 3, y: 6, who: Player.Black },
            { x: 5, y: 6, who: Player.White },

            { x: 2, y: 7, who: Player.White },
            { x: 3, y: 7, who: Player.White },
            { x: 4, y: 7, who: Player.White });

        var result = board.display();

        var eligiblesMoves = board.getEligiblesMovesFor(Player.White);

        var result = board.display();
        console.log(result);

        expect(eligiblesMoves.length).to.be.eq(6);

        expect(eligiblesMoves[0].x).to.be.eq(1);
        expect(eligiblesMoves[0].y).to.be.eq(3);
    });

});
