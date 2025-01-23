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
        },
        {
        name: 'player 2', 
        marker: 'O'
        },
    ]
    let moves = 0
    let nextPlayerMove = players[0]
    let winner = false
    function changePlayer(){
        nextPlayerMove===players[0] ? nextPlayerMove=players[1] : nextPlayerMove=players[0]
    }
    function printBoard(boardArr=board){
        console.log(`${boardArr[0].getValue()} ${boardArr[1].getValue()} ${boardArr[2].getValue()}`)
        console.log(`${boardArr[3].getValue()} ${boardArr[4].getValue()} ${boardArr[5].getValue()}`)
        console.log(`${boardArr[6].getValue()} ${boardArr[7].getValue()} ${boardArr[8].getValue()}`)
    }
    function setPlayerMarker(position){
        if(board[position]&&board[position].getValue()==='_'){
            board[position].setValue(nextPlayerMove.marker)
            console.log(`${nextPlayerMove.name} has marked position ${position} with an ${nextPlayerMove.marker} successfully!`)
            moves++
            changePlayer()
            checkWinner()
            displayGame.markPositions(GameBoard.board)
        }else{
            console.log('That location is already taken, try again')
        }
    }
    function checkWinner(boardArr=board){
        if( //player 1 possible winning combinations
            //horizontals
            (boardArr[0].getValue()==='X'&&boardArr[1].getValue()==='X'&&boardArr[2].getValue()==='X')||
            (boardArr[3].getValue()==='X'&&boardArr[4].getValue()==='X'&&boardArr[5].getValue()==='X')||
            (boardArr[6].getValue()==='X'&&boardArr[7].getValue()==='X'&&boardArr[8].getValue()==='X') ||
            //verticals
            (boardArr[0].getValue()==='X'&&boardArr[3].getValue()==='X'&&boardArr[6].getValue()==='X')||
            (boardArr[1].getValue()==='X'&&boardArr[4].getValue()==='X'&&boardArr[7].getValue()==='X')||
            (boardArr[2].getValue()==='X'&&boardArr[5].getValue()==='X'&&boardArr[8].getValue()==='X') ||
            //diagonals
            (boardArr[0].getValue()==='X'&&boardArr[4].getValue()==='X'&&boardArr[8].getValue()==='X') ||
            (boardArr[6].getValue()==='X'&&boardArr[4].getValue()==='X'&&boardArr[2].getValue()==='X')
        ){
            winner = true;
            printBoard()
            console.log(`player 1 wins!`)
        }else if(
            //player 2 possible winning combinations
            (boardArr[0].getValue()==='O'&&boardArr[1].getValue()==='O'&&boardArr[2].getValue()==='O')||
            (boardArr[3].getValue()==='O'&&boardArr[4].getValue()==='O'&&boardArr[5].getValue()==='O')||
            (boardArr[6].getValue()==='O'&&boardArr[7].getValue()==='O'&&boardArr[8].getValue()==='O') ||
            //verticals
            (boardArr[0].getValue()==='O'&&boardArr[3].getValue()==='O'&&boardArr[6].getValue()==='O')||
            (boardArr[1].getValue()==='O'&&boardArr[4].getValue()==='O'&&boardArr[7].getValue()==='O')||
            (boardArr[2].getValue()==='O'&&boardArr[5].getValue()==='O'&&boardArr[8].getValue()==='O') ||
            //diagonals
            (boardArr[0].getValue()==='O'&&boardArr[4].getValue()==='O'&&boardArr[8].getValue()==='O') ||
            (boardArr[6].getValue()==='O'&&boardArr[4].getValue()==='O'&&boardArr[2].getValue()==='O')
        ){
            winner=true
            printBoard()
            console.log(`player 2 wins!`)
        }else if(!winner&&moves===9){ 
            //tie game
            console.log('Tie!')
        }
    }
    //variable which targets the board parent element and listener to place markers on click
    let gameBoardElement = document.querySelector('#gameBoard')
    gameBoardElement.addEventListener('click', e=>{
        setPlayerMarker(e.target.dataset.markerPosition, )
    })

    return{setPlayerMarker, printBoard, checkWinner}
}()        


let displayGame = (function(){
    let markerElements = Array.from(document.querySelectorAll('.marker'))
    function markPositions(boardArr){
        for(let i = 0; i<9; i++){
            markerElements[i].textContent = `${boardArr[i].getValue()}`
        }
    }
    return {markPositions}
})()
displayGame.markPositions(GameBoard.board)


//button to start/restart game
//display elements that shows the result of the game upon it ending