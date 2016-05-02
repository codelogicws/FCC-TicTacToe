/// <reference path="../typings/browser/ambient/mocha/index.d.ts" />
/// <reference path="../typings/browser/definitions/chai/index.d.ts" />
import chai = require('chai');
import {Game} from "../src/Game";
var expect = chai.expect;


describe('Placing Pieces on the Board', () => {
  let game: Game;

  beforeEach(()=>{
    game = new Game();
  });

  it('is a function', () => {
    expect(game.placePiece).to.be.a('function');
  });

  it('can be won by row match', () => {
    game.placePiece(0, 0, true);
    game.placePiece(1, 0, true);
    game.placePiece(2, 0, true);
    expect(game.getWinner()).to.equal(true);
  });

  it('can be in progress', () => {
    expect(game.getWinner()).to.equal(false);
  });
});
