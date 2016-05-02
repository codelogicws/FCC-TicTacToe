export class Game{
  board: number[][] = [[,,],[,,],[,,]];
  BOARDSIZE: number = 3;

  placePiece(x: number, y: number, isPlayer: boolean){
    this.board[x][y] = (isPlayer)? 4 : 1;
  }

  getWinner(){
    return this.is(GAMESTATES.ComputerWon) || this.is(GAMESTATES.PlayerWon);
  }


  private is(gameState: GAMESTATES){
    var isGameState = false;
    for(var i=0; i<this.BOARDSIZE; i++)
      if(this.checkRowOrColumn(i, gameState, true) || this.checkRowOrColumn(i, gameState, false))
        return true;
    return false;
  }

  private checkRowOrColumn(row: number, gameState: GAMESTATES, isRow: boolean){
    var sum = 0;
    for(var i=0; i<this.BOARDSIZE;i++){
      var x = (isRow)?this.board[i][row]:this.board[row][i];
      sum += ( isNaN(x) )? 0 : x;
    }
    return (gameState == sum);
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

enum GAMESTATES {
  Computer1MoveFromWinning = 2,
  ComputerWon = 3,
  Player1MoveFromWinning = 8,
  PlayerWon = 12
}
