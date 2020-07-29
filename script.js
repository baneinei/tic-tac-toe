let gameBoardElement = document.querySelector("#game_container");
let infoBox = document.querySelector("#info_box");

const gameBoard = (() => {
    let gameState = ["","","","","","","","",""];
    let scoreBoard = [0,0,0,0,0,0,0,0];
    
    let updateScoreBoard = (element,whosTurn) => {
        let adder;
        if (whosTurn.marker == "X") {
            adder = 1;
        }
        else {
            adder = -1;
        }

        if (element.classList.contains("row1")) {
            scoreBoard[0] = scoreBoard[0] + adder;
        }
        if (element.classList.contains("row2")) {
            scoreBoard[1] = scoreBoard[1] + adder;
        }
        if (element.classList.contains("row3")) {
            scoreBoard[2] = scoreBoard[2] + adder;
        }
        if (element.classList.contains("col1")) {
            scoreBoard[3] = scoreBoard[3] + adder;
        }
        if (element.classList.contains("col2")) {
            scoreBoard[4] = scoreBoard[4] + adder;
        }
        if (element.classList.contains("col3")) {
            scoreBoard[5] = scoreBoard[5] + adder;
        }
        if (element.classList.contains("diag1")) {
            scoreBoard[6] = scoreBoard[6] + adder;
        }
        if (element.classList.contains("diag2")) {
            scoreBoard[7] = scoreBoard[7] + adder;
        }
        console.log(scoreBoard);
    }
    let clear = () => {
        for (let i = 0 ; i < gameState.length ; i++) {
            gameState[i] = "";
        }
        for (let i = 0 ; i < scoreBoard.length ; i++) {
            scoreBoard[i] = 0;
        }
    }

    let render = () => {
        let squares = gameBoardElement.children; // the individual squares
        for (let i = 0 ;i < gameState.length ; i++) {
            squares[i].querySelector("p").textContent = gameState[i];
        }
    };
    


    //this function adds all the event listeners.
    let initialization = () => {
        let squares = gameBoardElement.children;
        for (let i = 0 ; i < squares.length ; i++) {
            squares[i].addEventListener("click", () => {
                if (squares[i].querySelector("p").textContent == "") {
                    gameController.turn(squares[i]); //  When a square gets clicked, the turn starts
                }
            });
        }
    };
    
    return {gameState,render,initialization,scoreBoard,updateScoreBoard,clear};
})();

const Player = (inputMarker) => {
    let marker = inputMarker;

    let clicked = (element) => {
        element.querySelector("p").textContent = marker;
    }
    return {clicked,marker};
}

const gameController = (() => {
    let players;
    let whosTurn;
    let clickCount = 0;

    let checkWin = () => {
        for (let i = 0 ; i < gameBoard.scoreBoard.length ; i++) {
            if (gameBoard.scoreBoard[i] == 3) {
                return "X";
            }
            else if (gameBoard.scoreBoard[i] == -3) {
                return "O";
            }
        }
        if (clickCount == 9) {
            return "-";
        }
    };
    let endGame = (winner) => {
        if (winner == "-") {
            infoBox.textContent = "It's a tie.";
        }
        else {
            infoBox.textContent = winner + " Is the winner!";
        }
        


    }
    let toggleTurn = () => {
        if (whosTurn == players[0]) {
            whosTurn = players[1];
        }
        else if (whosTurn == players[1]) {
            whosTurn = players[0];
        }
    }
    let turn = (clickedElement) => {
        whosTurn.clicked(clickedElement);
        gameBoard.updateScoreBoard(clickedElement,whosTurn);
        clickCount++;
        if (checkWin() == "X") {
            endGame("X");
        }
        else if (checkWin() == "O") {
            endGame("O");
        }
        else if (checkWin() == "-") {
            endGame("-");
        }
        toggleTurn();
    }
    
    let setPlayers = (player1,player2) => {
        players = [player1,player2];
        whosTurn = player1;
    }
    let startGame = (player1,player2) => {
        gameBoard.initialization();
        gameBoard.render();
        gameController.setPlayers(player1,player2);
    }
    return {turn,setPlayers,startGame};
})();

let clear_btn = document.querySelector("#clear_btn");
clear_btn.addEventListener("click", () => {
    gameBoard.clear();
    gameBoard.render();
})

let player1 = Player("X");
let player2 = Player("O");
gameController.startGame(player1,player2);