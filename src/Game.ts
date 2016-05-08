/// <reference path="../typings/jquery/jquery.d.ts"/>

let board: number[][] = [[,,],[,,],[,,]];
let userIsXs: boolean = true;


class Game{
  constructor(){
    board = [[,,],[,,],[,,]];
  }

  winningCombos: Point[][] = [
    [new Point(0,0), new Point(0,1), new Point(0,2)],
    [new Point(1,0), new Point(1,1), new Point(1,2)],
    [new Point(2,0), new Point(2,1), new Point(2,2)],

    [new Point(0,0), new Point(1,0), new Point(2,0)],
    [new Point(0,1), new Point(1,1), new Point(2,1)],
    [new Point(0,2), new Point(1,2), new Point(2,2)],

    [new Point(0,0), new Point(1,1), new Point(2,2)],
    [new Point(0,2), new Point(1,1), new Point(2,0)],
  ]

  public placePiece(x: number, y: number, player: PLAYERS){
    board[x][y] = (player == PLAYERS.PLAYER)? PLAYERS.PLAYER : PLAYERS.COMPUTER;
  }

  public getBoard(){
    return board;
  }

  public computerTakeTurn(){
    let currentState: GameStateResult = this.getCurrentState();
    if(currentState.is1FromWinning()){
       currentState.lastEmpty.toBoard(PLAYERS.COMPUTER);
    }else{
      this.computerPlaceRandomPiece();
    }
  }

  public getCurrentState(): GameStateResult{
    return this.winningCombos.reduce((pre, current)=>{
      let currentState: GameStateResult = this.checkCombo(current);
      return (pre.isMoreImportentThen(currentState))? pre: currentState;

    }, new GameStateResult);
  }

  public printBoard(){
    let BOARDSIZE: number = 3;
    console.log('-------------------------');
    for(var y=0;y<BOARDSIZE;y++){
        let row: string = '';
      for(var x=0;x<BOARDSIZE;x++){
        row += (board[x][y] == undefined)? "-": board[x][y];
      }
      console.log(row);
    }
  }





  private computerPlaceRandomPiece(){
    boardLook:
    for(var y=0;y<3;y++){
      for(var x=0;x<3;x++){
        if(board[x][y] == null){
          board[x][y] = PLAYERS.COMPUTER;
          break boardLook;
        }
      }
    }
  }

  private checkCombo(combo: Point[]): GameStateResult{
    let total: number = 0;
    let state: GameStateResult = new GameStateResult();

    combo.forEach((point)=>{
      total += point.value();
      if(point.value() == 0)
        state.lastEmpty = point;
    });

    state.state = total;
    return state;
  }

}

class GameStateResult{
  state: GAMESTATES = 0;
  lastEmpty: Point = new Point(-1, -1);

  public isMoreImportentThen(other: GameStateResult){
    if(this.isWinning(this.state)){
      return true;
    }else if(this.isWinning(other.state)){
      return false;
    }else if(this.is1FromWin(other.state)){
      return false;
    }
    return true;
  }

  public is1FromWinning(){
    return this.is1FromWin(this.state);
  }

  private isWinning(k: GAMESTATES){
    return (k == GAMESTATES.ComputerWon || k == GAMESTATES.PlayerWon);
  }

  private is1FromWin(k: GAMESTATES){
    return (k == GAMESTATES.Computer1MoveFromWinning || k == GAMESTATES.Player1MoveFromWinning);
  }
}

class Point{
  constructor(x: number, y: number){
    this.x = x;
    this.y = y;
  }

  public toBoard(player: PLAYERS){
    board[this.x][this.y] = player;
  }

  public value(){
    let k: number = board[this.x][this.y];
    return (isNaN(k))? 0: k;
  }

  x: number = -1;
  y: number = -1;
}

enum GAMESTATES {
  Computer1MoveFromWinning = 2,
  ComputerWon = 3,
  Player1MoveFromWinning = 8,
  PlayerWon = 12,
}

enum PLAYERS{
  PLAYER = 4,
  COMPUTER = 1
}

function makeBoardHTML(){
  let html: string = '';
  for(var y=0; y<3; y++){
    html += '<p>';
    for(var x=0; x<3; x++){
      html += '<span class="' + getSquare(x, y) + ' square">x</span>';
    }
    html += '</p>';
  }
  return html;
}

function getSquare(x: number, y: number): string{
  let current: any = board[x][y];
  if( isNaN(current) ){
    return "emptyPiece"
  }else if(current == PLAYERS.PLAYER && userIsXs){
    return "xPiece"
  }
  return "oPiece"
}

$(()=>{
  let game: Game = new Game();
  game.placePiece(0,0,PLAYERS.PLAYER);
  game.computerTakeTurn();
  game.placePiece(0,2,PLAYERS.PLAYER);
  game.computerTakeTurn();
  game.placePiece(2,2,PLAYERS.PLAYER);
  game.computerTakeTurn();

  $('#board').html(makeBoardHTML());
  console.log('test');
})
