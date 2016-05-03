/// <reference path="../typings/browser/ambient/mocha/index.d.ts" />
/// <reference path="../typings/browser/definitions/chai/index.d.ts" />
/// <reference path="../typings/browser/definitions/lodash/index.d.ts"/>
import chai = require('chai');
import {Game, PLAYERS} from "../src/Game";
var expect = chai.expect;


describe('Game Tests', () => {
  let game: Game;

  beforeEach(()=>{
    game = new Game();
  });

  describe('AI', () =>{
    it('Computer can place a peice on the board', () =>{
      //refactor an assigned number for comptuer and player
      game.computersTurn();
      expect(  addBoard(game.getBoard())  ).to.equal(PLAYERS.COMPUTER);
    });

    it('Computer can take multiple Turns', ()=>{
      game.computersTurn();
      game.computersTurn();
      let moveCounter: number = PLAYERS.COMPUTER + PLAYERS.COMPUTER;
      expect(  addBoard(game.getBoard())  ).to.equal(moveCounter);
    });

  });

  describe('Winning Games', () =>{
    it('can be won by row match', () => {
      game.placePiece(0, 0, true);
      game.placePiece(1, 0, true);
      game.placePiece(2, 0, true);
      expect(game.getWinner()).to.equal(PLAYERS.PLAYER);
    });

    it('can be won by column match', () => {
      game.placePiece(0, 0, false);
      game.placePiece(0, 1, false);
      game.placePiece(0, 2, false);
      expect(game.getWinner()).to.equal(PLAYERS.COMPUTER);
    });

    it('can\'t be won by a mix of players pieces', () =>{
      game.placePiece(0, 0, false);
      game.placePiece(0, 1, true);
      game.placePiece(0, 2, false);
      game.placePiece(1, 0, true);
      game.placePiece(2, 0, true);
      expect(game.getWinner()).to.equal(null);
    });

    it('can be in progress', () => {
      expect(game.getWinner()).to.equal(null);
    });
  });


});


function addBoard(board: number[][]){
  let count: number = 0;
  board.forEach((outerElement)=>{
    outerElement.forEach((innerElement)=>{
      count += (innerElement != null)? innerElement : 0;
    });
  });
  return count;
}
