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

  it('can be won', () => {
    expect(game.getWinner()).to.be.a('string');
  });

  it('can be in progress', () => {
    expect(game.getWinner()).to.be.a(undefined);
  });
});
