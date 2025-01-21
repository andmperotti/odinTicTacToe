// createPlayer factory function  creates an object that represents each player playing the game , for now these will just have a name and marker.
//These players are primarily used in the gameboard so I'll move them there.
const players = (()=>{
    function createPlayer(name, marker){
        this.name = name
        this.marker=marker
        this.getName=()=>this.name
        this.getMarker=()=>this.marker
        return {getName, getMarker}
    }
    
    this.playerOne = createPlayer('one', 'X')
    this.playerTwo = createPlayer('two', 'O')
    return {playerOne, playerTwo}
})()


// gameboard will be an object 
//     will contain an array of players, 2 for tictactoe
//     will also contain an array which represents the placements/moves on the board, starts as an empty array, users will click on specific gui places to place their marker and this array will fill in as users place their markers

const gameBoard = (()=>{
    this.players= [players.playerOne, players.playerTwo]
    this.gamesBoard = Array(9)
    return {players, gamesBoard}
})()

// playTicTacToe is going to be the object that plays the game
    //So it asks each user for their turn until there is a winner or the board is full
        //so checks for winner, or full, if not asks user 1 or user 2 to play
let playTicTacToe = (()=>{
    this.moves= 0
    this.gameOver = false
    this.checkWinner = (gameBoardArr)=>{
        if(
            //horizontals
            (gameBoardArr[0]==='X'&&gameBoardArr[1]==='X'&&gameBoardArr[2]==='X') ||
            (gameBoardArr[3]==='X'&&gameBoardArr[4]==='X'&&gameBoardArr[5]==='X') || 
            (gameBoardArr[6]==='X'&&gameBoardArr[7]==='X'&&gameBoardArr[8]==='X') ||
            //verticals
            (gameBoardArr[0]==='X'&&gameBoardArr[3]==='X'&&gameBoardArr[6]==='X') ||
            (gameBoardArr[1]==='X'&&gameBoardArr[4]==='X'&&gameBoardArr[7]==='X') ||
            (gameBoardArr[2]==='X'&&gameBoardArr[5]==='X'&&gameBoardArr[8]==='X') ||
            //diagonal
            (gameBoardArr[0]==='X'&&gameBoardArr[4]==='X'&&gameBoardArr[8]==='8') ||
            (gameBoardArr[2]==='X'&&gameBoardArr[4]==='X'&&gameBoardArr[6]==='X')
        ){ 
            players.playerOne.incrementWins()
            players.playerTwo.incrementLosses()
            console.log(`player ${playerOne.name} wins!`)
            gameBoard.gamesBoard = Array(9)
            this.gameOver= true
        }else if(
            //horizontals
            (gameBoardArr[0]==='O'&&gameBoardArr[1]==='O'&&gameBoardArr[2]==='O') ||
            (gameBoardArr[3]==='O'&&gameBoardArr[4]==='O'&&gameBoardArr[5]==='O') || 
            (gameBoardArr[6]==='O'&&gameBoardArr[7]==='O'&&gameBoardArr[8]==='O') ||
            //verticals
            (gameBoardArr[0]==='O'&&gameBoardArr[3]==='O'&&gameBoardArr[6]==='O') ||
            (gameBoardArr[1]==='O'&&gameBoardArr[4]==='O'&&gameBoardArr[7]==='O') ||
            (gameBoardArr[2]==='O'&&gameBoardArr[5]==='O'&&gameBoardArr[8]==='X') ||
            //diagonal
            (gameBoardArr[0]==='O'&&gameBoardArr[4]==='O'&&gameBoardArr[8]==='O') ||
            (gameBoardArr[2]==='O'&&gameBoardArr[4]==='O'&&gameBoardArr[6]==='O')
        ){
            players.playerTwo.incrementWins()
            players.playerOne.incrementLosses()
            console.log(`Player ${playerTwo.name} wins!`)
            this.gameOver = true
            gameBoard.gamesBoard = Array(9)

        }else if(playTicTacToe.moves===9){
            //tie0
            players.playerOne.incrementTies()
            players.playerTwo.incrementTies()
            console.log('tie game')
            this.gameOver = true
            gameBoard.gamesBoard = Array(9)

        }
        //otherwise continue the play loop
    }
    this.playGame = ()=>{
        while(this.gameOver===false){
            if(this.moves%2===0||this.moves===0){
                let playerMove = +prompt("Where would player 1 like to fill? ")
                gameBoard.gamesBoard[playerMove]='X'
                this.moves++
                checkWinner(gameBoard.gamesBoard)
            }else if(moves%2!==0){
                playerMove = +prompt("Where would player 2 like to fill? ")
                gameBoard.gamesBoard[playerMove]='O'
                checkWinner(gameBoard.gamesBoard)
                this.moves++
            }
        }
    }
    return {checkWinner, playGame}
})(gameBoard)
playTicTacToe.playGame()


// So first we'll just create 2 players and their markers by default will be X and O, and then the playTicTacToe function is invoked

// I think I'll use an iife for each player, and an iife for the game, which will pull in each player, and initiate playing of the game






//i think I'll put everything outside of an iife until you're ready for it to be in an iife that way you can test functions like the isThereAWinner or whatever it's going to be called, so you can test it by passing in an array of a probable game state