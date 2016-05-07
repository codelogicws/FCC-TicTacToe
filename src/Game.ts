export class Game{
  board:     number[][] = [[,,],[,,],[,,]];
  BOARDSIZE: number = 3;
  PLAYER:    string = "Player";
  COMPUTER:  string = "Computer";

  placePiece(x: number, y: number, player: PLAYERS){
    this.board[x][y] = (player == PLAYERS.PLAYER)? PLAYERS.PLAYER : PLAYERS.COMPUTER;
  }

  public getBoard(){
    return this.board;
  }

  private checkCombo(xModifier: any, yModifier: any, x: number, y: number){
    let state: GameStateResult = new GameStateResult;
    let total: number = 0;
    for(var i=0; i<3; i++){

    }
    return state;
  }

  private decrement(start: number, x: number){
    return start - x;
  }

  private increment(start: number, x: number){
    return start + x;
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
  state: GAMESTATES = GAMESTATES.Uninteresting;
  point: Point = new Point;
}

class Point{
  x: number = -1;
  y: number = -1;
}

enum GAMESTATES {
  Computer1MoveFromWinning = 2,
  ComputerWon = 3,
  Player1MoveFromWinning = 8,
  PlayerWon = 12,
  Uninteresting = 0
}

export enum PLAYERS{
  PLAYER = 4,
  COMPUTER = 1
}
