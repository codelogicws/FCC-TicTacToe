let board: number[][];

export class Game{
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

  public test1(){
    return this.winningCombos.reduce((pre, current)=>{
      let currentState: GameStateResult = this.checkCombo(current);
      return (pre.isMoreImportentThen(currentState))? pre: currentState;

    }, new GameStateResult);
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

  public value(){
    let k: number = board[this.x][this.y];
    return (isNaN(k))? 0: k;
  }

  x: number = -1;
  y: number = -1;
}

export enum GAMESTATES {
  Computer1MoveFromWinning = 2,
  ComputerWon = 3,
  Player1MoveFromWinning = 8,
  PlayerWon = 12,
}

export enum PLAYERS{
  PLAYER = 4,
  COMPUTER = 1
}
