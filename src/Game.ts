/// <reference path="../typings/jquery/jquery.d.ts"/>

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
    }else if(board[1][1] == null){
      this.placePiece(1,1,PLAYERS.COMPUTER);
    }else if(this.getOpenCorner() != null){
      this.getOpenCorner().toBoard(PLAYERS.COMPUTER);
    }else{
      this.computerPlaceRandomPiece();
    }
  }

  private getOpenCorner(){
    if(this.checkSquare(0,0)){
      return new Point(0,0);
    }else if(this.checkSquare(0,2)){
      return new Point(0,2);
    }else if(this.checkSquare(2,0)){
      return new Point(2,0);
    }else if(this.checkSquare(2,2)){
      return new Point(2,2);
    }
    return null;
  }

  private checkSquare(x:number, y:number){
    return (board[x][y] == null);
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
    }else if(this.state == GAMESTATES.Computer1MoveFromWinning){
      return true;
    }else if(other.state == GAMESTATES.Computer1MoveFromWinning){
      return false;
    }else if(this.is1FromWin(other.state)){
      return false;
    }
    return true;
  }

  public is1FromWinning(){
    return this.is1FromWin(this.state);
  }

  public thisIsWinning(){
    return this.isWinning(this.state);
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
      html += getSquare(x, y);
    }
    html += '</p>';
  }
  return html;
}

function getSquare(x: number, y: number): string{
  let current: any = board[x][y];
  if( isNaN(current) ){
    return "<span onclick='clicked("+x+","+y+")' class='emptyPiece square' value='i have a value'></span>"
  }else if(  (current == PLAYERS.PLAYER && userIsXs)  || (current==PLAYERS.COMPUTER && !userIsXs)  ){
    return "<span class='xPiece square'></span>"
  }
  return "<span class='oPiece square'></span>"
}

function clicked(x:number, y:number){
  game.placePiece(x,y,PLAYERS.PLAYER);
  checkUserWin();
  computerTakeTurnIfGamesNotOver();
  drawBoard();
  checkForWins();
  checkForDraw();
  drawBoard();
}

function computerTakeTurnIfGamesNotOver(){
  if(game.getCurrentState().state != GAMESTATES.PlayerWon && !userWon){
    game.computerTakeTurn();
  }
}

function checkForDraw(){
  if(!game.getCurrentState().thisIsWinning() || userWon){
    if($('.emptyPiece').length == 0){
      console.log("draw was done");
      endGame("Draw");
      drawBoard();
    }
  }
}

function checkUserWin(){
  if(game.getCurrentState().state == GAMESTATES.PlayerWon)
    userWon = true;
}

function checkForWins(){
  if(game.getCurrentState().state == GAMESTATES.PlayerWon || userWon){
    endGame("You Won!")
  } else if(game.getCurrentState().state == GAMESTATES.ComputerWon){
    endGame("The Computer Won");
  }
}

function endGame(message: string){
  drawBoard();
  alert(message);
  newGame();
}

function drawBoard(){
  $('#board').html(makeBoardHTML());
}

function newGame(){
  let game: Game = new Game();
  userWon = false;
  game.printBoard();
  userIsXs = confirm('Do you want to be X\'s');
  if(computerStartFirst){
    game.computerTakeTurn();
    drawBoard();
  }
  computerStartFirst = !computerStartFirst;
}

let board: number[][] = [[,,],[,,],[,,]];
let userIsXs: boolean = true;
let computerStartFirst = true;
let userWon = false;
let game: Game = new Game();
newGame();


$(()=>{
  drawBoard();
})
