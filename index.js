const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame() {
    // Initialize game state
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    
    // Clear the UI and reset box styles
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });
    
    // Remove the "active" class from the new game button
    newGameBtn.classList.remove("active");
    
    // Display current player information in the game info
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    // Switch the current player between "X" and "O"
    if(currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    
    // Update the UI with the current player information
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    // Check for winning combinations
    winningPositions.forEach((position) => {
        if (
            (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") &&
            (gameGrid[position[0]] === gameGrid[position[1]]) &&
            (gameGrid[position[1]] === gameGrid[position[2]])
        ) {
            // Determine the winner ("X" or "O")
            if (gameGrid[position[0]] === "X") {
                answer = "X";
            } else {
                answer = "O";
            }

            // Disable pointer events for all boxes
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            // Highlight the winning combination
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // Display the winner in the game info and make the new game button active
    if (answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // Check for a tie game
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    // Display tie message in the game info and make the new game button active
    if (fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index) {
    // Handle box click event
    if(gameGrid[index] === "" ) {
        // Update the clicked box with the current player's symbol
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        
        // Disable further clicks on the current box
        boxes[index].style.pointerEvents = "none";
        
        // Switch to the next player's turn
        swapTurn();
        
        // Check if the game is over (winner or tie)
        checkGameOver();
    }
}

// Add click event listeners to all boxes
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

// Add click event listener to the new game button
newGameBtn.addEventListener("click", initGame);
