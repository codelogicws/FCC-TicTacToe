/// <reference path="../typings/browser/ambient/mocha/index.d.ts" />
/// <reference path="../typings/browser/definitions/chai/index.d.ts" />
/// <reference path="../typings/browser/definitions/lodash/index.d.ts"/>
import chai = require('chai');
import {Game, PLAYERS, GAMESTATES} from "../src/Game";
var expect = chai.expect;


describe('Game Tests.', () => {
  let game: Game;

  beforeEach(()=>{
    game = new Game();
  });

  describe('AI.', ()=>{
    // it('should place computers piece', ()=>{
    //   game.computerTakeTurn();
    // })
  });

  describe('Game understands the state that it is in.', ()=>{
    it('should report a win over a near win', ()=>{
        game.placePiece(0,0,PLAYERS.COMPUTER);
        game.placePiece(0,1,PLAYERS.COMPUTER);
        game.placePiece(2,1,PLAYERS.COMPUTER);
        game.placePiece(2,2,PLAYERS.COMPUTER);
        game.placePiece(1,0,PLAYERS.PLAYER);
        game.placePiece(1,1,PLAYERS.PLAYER);
        game.placePiece(1,2,PLAYERS.PLAYER);
        expect( game.getCurrentState().state ).to.equal( GAMESTATES.PlayerWon );
    });


    describe('Game should know when a player/computer is 1 move from winning.', ()=>{
      it('should know when pieces are in a column', ()=>{
        game.placePiece(0,0,PLAYERS.PLAYER);
        game.placePiece(2,2,PLAYERS.COMPUTER);
        game.placePiece(0,1,PLAYERS.PLAYER);
        expect( game.getCurrentState().state ).to.equal( GAMESTATES.Player1MoveFromWinning);
      })

      it('should know when pieces are in a row', ()=>{
        game.placePiece(0,1,PLAYERS.COMPUTER);
        game.placePiece(2,2,PLAYERS.PLAYER);
        game.placePiece(2,1,PLAYERS.COMPUTER);
        expect( game.getCurrentState().state ).to.equal( GAMESTATES.Computer1MoveFromWinning);
      })

      it('should know when pieces are in a diagonal', ()=>{
        game.placePiece(2,0,PLAYERS.COMPUTER);
        game.placePiece(0,2,PLAYERS.COMPUTER);
        expect( game.getCurrentState().state ).to.equal( GAMESTATES.Computer1MoveFromWinning);
      })

      it('should not show if computer is in the way', ()=>{
        game.placePiece(0,0,PLAYERS.PLAYER);
        game.placePiece(0,2,PLAYERS.COMPUTER);
        game.placePiece(0,1,PLAYERS.PLAYER);
        expect( game.getCurrentState().state ).to.not.equal( GAMESTATES.Player1MoveFromWinning);
        expect( game.getCurrentState().state ).to.not.equal( GAMESTATES.PlayerWon);
        expect( game.getCurrentState().state ).to.not.equal( GAMESTATES.ComputerWon);
        expect( game.getCurrentState().state ).to.not.equal( GAMESTATES.Computer1MoveFromWinning);
      })

      describe('Game should know winning states.', ()=>{
        it('should know when the user won', ()=>{
          game.placePiece(1,1,PLAYERS.PLAYER);
          game.placePiece(1,0,PLAYERS.COMPUTER);
          game.placePiece(2,2,PLAYERS.PLAYER);
          game.placePiece(1,2,PLAYERS.COMPUTER);
          game.placePiece(0,0,PLAYERS.PLAYER);
          expect( game.getCurrentState().state ).to.equal( GAMESTATES.PlayerWon);
        });

        it('should know when the computer won', ()=>{
          game.placePiece(2,2,PLAYERS.COMPUTER);
          game.placePiece(2,1,PLAYERS.PLAYER);
          game.placePiece(0,2,PLAYERS.COMPUTER);
          game.placePiece(0,0,PLAYERS.PLAYER);
          game.placePiece(1,2,PLAYERS.COMPUTER);
          expect( game.getCurrentState().state ).to.equal( GAMESTATES.ComputerWon);
        });
      });
    })

  })

});
