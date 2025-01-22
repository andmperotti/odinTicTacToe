//GameBoard object, only one is needed so iife it
    //board array, stores cells of playing board
        //Cells should be instances of an object that has a value and maybe methods to change and access that value (value, getValue, setValue)
let GameBoard = (function(){
    let board = new Array(9)
    for(let i = 0; i<board.length; i++){
        board[i]=new Cell()
    }
    function Cell(){
        this.value = '_';
        this.getValue = ()=>this.value
        this. setValue = (marker)=>this.value=marker
    }
    return {board}
})()

//PlayGame will be an object, but inside an iife because we only want one game to be playing
    //an instance of the GameBoard is imported and used
    //players object holds the players and their name and marker
    //game play logic:
        //use a variable to keep track of who's turn it is next
        //use a variable to keep track of how many moves there have been, as there can be ties and we want to end the game in case of that later
        //prompt ask /tell the player to choose where they want to place their marker, if already taken tell them its taken and ask them again
        //check for a winner each turn, by parsing over cells and looking for specific combinations of cell values
        //If there is a winner stop the playing and declare a winner, in html you can add a class to highlight the cells of the winning placements. Otherwise keep playing the game
let PlayGame = function(){
    let board= GameBoard.board
    const players = [
        {
        name: 'player 1', 
        marker: 'X'
    },{
        name: 'player 2', 
        marker: 'O'
    }]
    let moves = 0
    let nextPlayerMove = players[0]
    let winner = false

    function changePlayer(){
        nextPlayerMove===players[0] ? nextPlayerMove=players[1] : nextPlayerMove=players[0]
    }
    function printBoard(){
        console.log(`${board[0].getValue()} ${board[1].getValue()} ${board[2].getValue()}`)
        console.log(`${board[3].getValue()} ${board[4].getValue()} ${board[5].getValue()}`)
        console.log(`${board[6].getValue()} ${board[7].getValue()} ${board[8].getValue()}`)
    }
    function askPlayerMove(player){
        let place = +prompt(`What position, ${nextPlayerMove.name} would you like to take? `)
        if(board[place]&&board[place].getValue()==='_'){
            setPlayerMarker(place)
        }else{
            askPlayerMove(player)
        }
    }
    function setPlayerMarker(position){
        board[position].setValue(nextPlayerMove.marker)
        moves++
        changePlayer()
    }
    //play loop
    while(moves<9&&!winner){
        printBoard()
        askPlayerMove(nextPlayerMove)
        checkWinner()

    }

    function checkWinner(){
        if( //player possible wins
            //horizontals
            (board[0].getValue()==='X'&&board[1].getValue()==='X'&&board[2].getValue()==='X')||
            (board[3].getValue()==='X'&&board[4].getValue()==='X'&&board[5].getValue()==='X')||
            (board[6].getValue()==='X'&&board[7].getValue()==='X'&&board[8].getValue()==='X') ||
            //verticals
            (board[0].getValue()==='X'&&board[3].getValue()==='X'&&board[6].getValue()==='X')||
            (board[1].getValue()==='X'&&board[4].getValue()==='X'&&board[7].getValue()==='X')||
            (board[2].getValue()==='X'&&board[5].getValue()==='X'&&board[8].getValue()==='X') ||
            //diagonals
            (board[0].getValue()==='X'&&board[4].getValue()==='X'&&board[8].getValue()==='X') ||
            (board[6].getValue()==='X'&&board[4].getValue()==='X'&&board[2].getValue()==='X')
        ){
            winner = true;
            printBoard()
            //temporary line of code because it's not dynamic at all
            console.log(`player 1 wins!`)

        }else if(
            (board[0].getValue()==='O'&&board[1].getValue()==='O'&&board[2].getValue()==='O')||
            (board[3].getValue()==='O'&&board[4].getValue()==='O'&&board[5].getValue()==='O')||
            (board[6].getValue()==='O'&&board[7].getValue()==='O'&&board[8].getValue()==='O') ||
            //verticals
            (board[0].getValue()==='O'&&board[3].getValue()==='O'&&board[6].getValue()==='O')||
            (board[1].getValue()==='O'&&board[4].getValue()==='O'&&board[7].getValue()==='O')||
            (board[2].getValue()==='O'&&board[5].getValue()==='O'&&board[8].getValue()==='O') ||
            //diagonals
            (board[0].getValue()==='O'&&board[4].getValue()==='O'&&board[8].getValue()==='O') ||
            (board[6].getValue()==='O'&&board[4].getValue()==='O'&&board[2].getValue()==='O')
        ){
            winner=true
            printBoard()
            console.log(`player 2 wins!`)
        }else if(!winner&&moves===9){ //tie game
            console.log('Tie!')
        }
    }
}        
PlayGame()
//DisplayGame will be inside an iife as there will only be one game to display
    //At first this will just output to the console
    //Later we can render html elements using this

    //We want to console.log a text representation of our games board