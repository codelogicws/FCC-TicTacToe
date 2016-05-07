let board: number[][] = [[,,],[,,],[,,]];

export class Game{
  BOARDSIZE: number = 3;
  PLAYER:    string = "Player";
  COMPUTER:  string = "Computer";

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
    //use a reduce to go through all the possible win combos
    return this.checkCombo(this.winningCombos[0]).state;
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

  private printBoard(){
    console.log('-------------------------');
    for(var y=0;y<this.BOARDSIZE;y++){
        let row: string = '';
      for(var x=0;x<this.BOARDSIZE;x++){
        row += (board[x][y] == undefined)? "-": board[x][y];
      }
      console.log(row);
    }
  }

}

class GameStateResult{
  state: GAMESTATES = 0;
  lastEmpty: Point = new Point(-1, -1);
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
