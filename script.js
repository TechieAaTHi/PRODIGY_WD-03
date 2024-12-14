const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('reset');
const humanVsHumanButton = document.getElementById('humanVsHuman');
const humanVsAIButton = document.getElementById('humanVsAI');

let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameMode = 'human';
let gameActive = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const renderBoard = () => {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.className = 'cell';
        if (cell) cellElement.classList.add('taken');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        boardElement.appendChild(cellElement);
    });
};

const handleCellClick = (index) => {
    if (!gameActive || board[index]) return;

    board[index] = currentPlayer;
    renderBoard();
    checkWinOrDraw();

    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (gameMode === 'ai' && currentPlayer === 'O') aiMove();
    }
};

const checkWinOrDraw = () => {
    const winner = winPatterns.find(pattern => 
        board[pattern[0]] && 
        board[pattern[0]] === board[pattern[1]] && 
        board[pattern[1]] === board[pattern[2]]
    );

    if (winner) {
        gameActive = false;
        statusElement.textContent = `Player ${currentPlayer} wins!`;
        resetButton.style.display = 'block';
    } else if (!board.includes(null)) {
        gameActive = false;
        statusElement.textContent = 'It\'s a draw!';
        resetButton.style.display = 'block';
    } else {
        statusElement.textContent = `Player ${currentPlayer}'s turn`;
    }
};

const aiMove = () => {
    const emptyIndices = board.map((cell, index) => cell === null ? index : null).filter(i => i !== null);
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    board[randomIndex] = 'O';
    renderBoard();
    checkWinOrDraw();
    currentPlayer = 'X';
};

const resetGame = () => {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    statusElement.textContent = 'Player X\'s turn';
    resetButton.style.display = 'none';
    renderBoard();
};

humanVsHumanButton.addEventListener('click', () => {
    gameMode = 'human';
    resetGame();
});

humanVsAIButton.addEventListener('click', () => {
    gameMode = 'ai';
    resetGame();
});

resetButton.addEventListener('click', resetGame);

renderBoard();
