/// <reference path="../typings/browser/ambient/mocha/index.d.ts" />
/// <reference path="../typings/browser/definitions/chai/index.d.ts" />
import chai = require('chai');
import {Game} from "../src/Game";
var expect = chai.expect;


describe('Placing Pieces on the Board', () => {
  var game = new Game();
  it('Is a function', (done) => {
    expect(game.placePiece).to.be.a('function');
    done();
  });
});
