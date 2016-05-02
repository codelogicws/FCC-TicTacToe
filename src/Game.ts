/*
A X O placement has a number value for computer and players
computer = 1
players = 4
this means that if you sum a column or row then the following should be true
8 = player is 1 move from winning
2 = computer is 1 move from winning
12 = player 3 in a row
3 = computer 3 in a row
*/
export class Game{
  board: number[][];

  constructor(){}
  placePiece(x: number, y: number, isPlayer: boolean){
    this.board[x][y] = (isPlayer)? 4 : 1;
  }

  getWinner(){
    return;
  }

}
