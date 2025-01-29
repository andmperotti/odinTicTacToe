let GameBoard = (function(){
    let board = new Array(9)
    for(let i = 0; i<board.length; i++){
        board[i]=Cell()
    }
    function Cell(){
        let value = '_';
        const getValue = ()=>value
        const setValue = (marker)=>value=marker
        return {getValue, setValue}
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
        if(board[position]&&board[position].getValue()==='_'&&moves<9){
            board[position].setValue(nextPlayerMove.marker)
            console.log(`${nextPlayerMove.name} has marked position ${position} with an ${nextPlayerMove.marker} successfully!`)
            moves++
            changePlayer()
            displayGame.markPositions(GameBoard.board)
            displayGame.highlightCurrentPlayer(moves)
            checkWinner()
        }else{
            console.log('That location is already taken or game is over')
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
            displayGame.findWinningElements(GameBoard.board)
            displayGame.highlightWinningElements()
            moves=9
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
            displayGame.findWinningElements(GameBoard.board)
            displayGame.highlightWinningElements()
            moves=9
        }else if(!winner&&moves===9){ 
            //tie game
            console.log('Tie!')
            winningStatement = 'Tie!'
            displayGame.displayWinningStatement(winningStatement)
            displayGame.findWinningElements(GameBoard.board)
            displayGame.highlightWinningElements()
            moves=9
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
        //reset winning statement output (in case there was a winner)
        displayGame.displayWinningStatement(winningStatement)
        displayGame.highlightCurrentPlayer(moves)
        displayGame.unhighlightElements()
    }
    restartButton.addEventListener('click', e=>{
        displayGame.winningArr.splice(0,3)
        restartGame()
    })

    return{setPlayerMarker, printBoard, checkWinner, players, restartGame, winningStatement, moves}
}()        


let displayGame = (function(){
    let markerElements = Array.from(document.querySelectorAll('.marker'))
    let playerNameDisplay = Array(document.querySelector('#playerOneDisplay'), document.querySelector('#playerTwoDisplay'))
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
    function highlightCurrentPlayer(moves){
        if(moves%2===0){
            playerNameDisplay[0].classList.add('highlight')
            playerNameDisplay[1].classList.remove('highlight')
        }else{
            playerNameDisplay[1].classList.add('highlight')
            playerNameDisplay[0].classList.remove('highlight')
        }
    }
    let winningArr = []
    function findWinningElements(board){
        if(         //horizontals
            board[0].getValue()===board[1].getValue()&&board[1].getValue()===board[2].getValue()
        ){
            winningArr.push(0,1,2)
        }else if(
            board[3].getValue()===board[4].getValue()&&board[4].getValue()===board[5].getValue()
        ){
            winningArr.push(3,4,5)
        }else if(
            board[6].getValue()===board[7].getValue()&&board[7].getValue()===board[8].getValue()
        ){
            winningArr.push(6,7,8)
        }else if(   //verticals
            board[0].getValue()===board[3].getValue()&&board[3].getValue()===board[6].getValue()
        ){
            winningArr.push(0,3,6)
        }else if(
            board[1].getValue()===board[4].getValue()&&board[4].getValue()===board[7].getValue()
        ){
            winningArr.push(1,4,7)
        }else if(
            board[2].getValue()===board[5].getValue()&&board[5].getValue()===board[8].getValue()
        ){  winningArr.push(2,5,8)
        }else if(   //diagonals
            board[0].getValue()===board[4].getValue()&&board[4].getValue()===board[8].getValue()
        ){
            winningArr.push(0,4,8)
        }else if(
            board[2].getValue()===board[4].getValue()&&board[4].getValue()===board[6].getValue()
        ){
            winningArr.push(2,4,6)
        }else{
            winningArr.splice(0,3)
        }
    }
    function highlightWinningElements(){
        for(let i = 0; i<3; i++){
            //pull each out of the winningArr array and since these values are representative of the marker positions use them as the index to the markerElements
            markerElements[winningArr[i]].classList.add('combination')
        }
    }
    function unhighlightElements(){
        markerElements.forEach(marker=>marker.classList.remove('combination'))
    }

    return {markPositions, displayPlayerNames, displayWinningStatement, highlightCurrentPlayer, findWinningElements, highlightWinningElements, unhighlightElements, winningArr}
})()
displayGame.markPositions(GameBoard.board)
displayGame.displayPlayerNames(PlayGame.players)
displayGame.highlightCurrentPlayer(PlayGame.moves)
