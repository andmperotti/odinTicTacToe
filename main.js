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
        if( //player 1 possible winning combinations
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
            console.log(`player 1 wins!`)

        }else if(
            //player 2 possible winning combinations
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
        }else if(!winner&&moves===9){ 
            //tie game
            console.log('Tie!')
        }
    }
}        
PlayGame()