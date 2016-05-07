
export class Game{
  BOARDSIZE: number = 3;
  PLAYER:    string = "Player";
  COMPUTER:  string = "Computer";
  board: number[][] = [[,,],[,,],[,,]];

  public placePiece(x: number, y: number, player: PLAYERS){
    this.board[x][y] = (player == PLAYERS.PLAYER)? PLAYERS.PLAYER : PLAYERS.COMPUTER;
  }

  public getBoard(){
    return this.board;
  }

  public test1(){
    return this.checkCombo(this.increment, this.unchanged, 0, 0).state;
  }





  private checkCombo(xModifier: any, yModifier: any, x: number, y: number): GameStateResult{
    let total: number = 0;
    let state: GameStateResult = new GameStateResult();

    for(var i=0; i<this.BOARDSIZE; i++){
      let currentX: number = xModifier(x, i);
      let currentY: number = yModifier(y, i);
      let val = this.board[currentX][currentY];

      if(val == null)
        state.lastEmpty = new Point(currentX, currentY);
      total += (  isNaN(val)  )? 0 : val;
    }
    state.state = total;
    return state;
  }

  private decrement(start: number, k: number){
    return start - k;
  }

  private increment(start: number, k: number){
    return start + k;
  }

  private unchanged(start: number, k: number){
    return start;
  }

  private printBoard(){
    console.log('-------------------------');
    for(var y=0;y<this.BOARDSIZE;y++){
        let row: string = '';
      for(var x=0;x<this.BOARDSIZE;x++){
        row += (this.board[x][y] == undefined)? "-": this.board[x][y];
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
