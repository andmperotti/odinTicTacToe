let GameBoard = (function(){
    let board = new Array(9)
    for(let i = 0; i<board.length; i++){
        board[i]=new Cell()
    }
    function Cell(){
        this.value = '_';
        this.getValue = ()=>this.value
        this.setValue = (marker)=>this.value=marker
    }
    return {board}
})()

let PlayGame = function(){
    let board= GameBoard.board
    const players = [
        {
        name: 'player 1', 
        marker: 'X', 
        },
        {
        name: 'player 2', 
        marker: 'O',
        },
    ]
    let moves = 0
    let nextPlayerMove = players[0]
    let winner = false
    let winningStatement

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
            console.log(`${players[0].name} wins!`)
            winningStatement = `${players[0].name} wins!`
            displayGame.displayWinningStatement(winningStatement)
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
            console.log(`${players[1].name} wins!`)
            winningStatement = `${players[1].name} wins!`
            displayGame.displayWinningStatement(winningStatement)
        }else if(!winner&&moves===9){ 
            //tie game
            console.log('Tie!')
            winningStatement = 'Tie!'
            displayGame.displayWinningStatement(winningStatement)
        }
    }
    //variable which targets the board parent element and listener to place markers on click
    let gameBoardElement = document.querySelector('#gameBoard')
    gameBoardElement.addEventListener('click', e=>{
        setPlayerMarker(e.target.dataset.markerPosition, )
    })

    //dom element and function that allows players to restart game, aka wipe all variables to a fresh start, followed by applying it with a listener
    let restartButton = document.querySelector('#restart')

    function restartGame(){
        //wipe board
        for(let i = 0; i<9; i++){
            board[i].setValue('_')
        }
        moves=0
        nextPlayerMove=players[0]
        winner=false
        displayGame.markPositions(board)
        winningStatement = ''
        displayGame.displayWinningStatement(winningStatement)
    }
    restartButton.addEventListener('click', e=>{
        restartGame()
    })

    return{setPlayerMarker, printBoard, checkWinner, players, restartGame, winningStatement}
}()        


let displayGame = (function(){
    let markerElements = Array.from(document.querySelectorAll('.marker'))
    let playerElements = Array(document.querySelector('#playerOneName'), document.querySelector('#playerTwoName'))
    let nameChangeButton = document.querySelector('#nameChangeButton')

    function markPositions(boardArr){
        for(let i = 0; i<9; i++){
            markerElements[i].textContent = `${boardArr[i].getValue()}`
        }
    }
    function displayPlayerNames(players){
        document.querySelector('#playerOneDisplay').textContent=players[0].name
        document.querySelector('#playerTwoDisplay').textContent=players[1].name
    }
    function changePlayerNames(players){
        let playerOneNewName = document.querySelector('#playerOneName').value
        let playerTwoNewName = document.querySelector('#playerTwoName').value
        if(playerOneNewName!==players[0].name&&playerOneNewName.length>0){
            PlayGame.players[0].name=playerOneNewName
        }
        if(playerTwoNewName!==players[1].name&&playerTwoNewName.length>0){
            PlayGame.players[1].name=playerTwoNewName
        }
    }
    nameChangeButton.addEventListener('click', e=>{
        changePlayerNames(PlayGame.players)
        displayPlayerNames(PlayGame.players)
    })
    function displayWinningStatement(winningStatement){
        let resultElement = document.querySelector('#result')
        resultElement.textContent = winningStatement
    }

    return {markPositions, displayPlayerNames, displayWinningStatement}
})()
displayGame.markPositions(GameBoard.board)
displayGame.displayPlayerNames(PlayGame.players)


//interface element to change player names
    //add class and dynamically use it on the display name of the user whose turn it is to mark a spot on the board
//button to start/restart game
    //use highlight player function in here as well
//display elements that shows the result of the game upon it ending
    //new html element dynamically populated with content after result


//extras:
//try to add a class to the elements that made up the winning combination and give that class a background color in the css. You can use the same class to highlight the player whose turn it is, and to highlight the winning player name at conclusion of the game. Maybe use a different color, like yellow for whose turn it is and green for winner and winning combination.
