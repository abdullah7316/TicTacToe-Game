
document.addEventListener('DOMContentLoaded', function () {
    let clickAduio = document.getElementById('click-audio');
    let boxArray = [];
    boxArray[0] = 0;
    let resetBtn = document.getElementById('reset-btn')
    let gameTurn = document.getElementById('game-turn')
    let turn = 'X'
    let gameWinPossi = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [7, 5, 3]
    ];

    //Reset Button Function
    resetBtn.addEventListener('click', resetGame);

    // Reset Function 
    function resetGame() {
        showTurn();
        for (let i = 1; i < 10; ++i) {
            let Box = document.getElementById(`Box${i}`)
            Box.style.backgroundColor = 'white'
            Box.innerText = ''
            boxArray[i] = Box; //saving the path of each box
        }
    }

    function showTurn() {
        gameTurn.innerText = `Turn for ${turn}`
        console.log('Turn showed')
    }

    function changeTurn() {
        if (turn === 'X') {
            turn = 'O'
        } else if (turn === 'O') {
            turn = 'X'
        }
        showTurn();
    }

    resetGame();

    function checkDraw() {
        for (let i = 1; i < 10; ++i) {
            if (boxArray[i].innerText === '') {
                return false;
            }
            if (i === 9) {
                return true;
            }
        }
    }
    function gameDraw() {
        gameTurn.innerText = `Game Draw`
        let gameDrawDiv = $('#game-draw');
        gameDrawDiv.slideDown(1200)
        setTimeout(function () { gameDrawDiv.slideUp(1200); resetGame() }, 2000)
    }

    function checkWin() {
        for (let i = 0; i < 8; ++i) {
            let A = gameWinPossi[i][0]
            let B = gameWinPossi[i][1]
            let C = gameWinPossi[i][2]

            let boxA = document.getElementById(`Box${A}`)
            let boxAText = boxA.innerText
            let boxB = document.getElementById(`Box${B}`)
            let boxBText = boxB.innerText
            let boxC = document.getElementById(`Box${C}`)
            let boxCText = boxC.innerText

            if ((boxAText === boxBText) && (boxBText === boxCText)) {
                if ((boxAText === 'O') || (boxAText === 'X')) {
                    boxA.style.backgroundColor = 'lightgreen'
                    boxB.style.backgroundColor = 'lightgreen'
                    boxC.style.backgroundColor = 'lightgreen'
                    return true;
                }
            }
        }
        return false;
    }

    function gameWin() {
        //Celebration
        gameTurn.innerText = `${turn} Win the Game`;
        let gameWinDiv = $('#congrat').fadeIn(1200);
        let celeDiv = $('#celebration').fadeIn(1200);
        setTimeout(function () {
            gameWinDiv.fadeOut(1200);
            celeDiv.fadeOut(1200);
            resetGame();
        }, 2500);
    }

    //Each Box Click Event Function
    for (let i = 1; i < 10; ++i) {
        boxArray[i].addEventListener('click', function () {
            boxArray[i].innerText = turn;
            if (checkWin()) {
                gameWin();
            } else if (checkDraw()) {
                gameDraw();
            } else {
                changeTurn();
            }
        })
    }


})