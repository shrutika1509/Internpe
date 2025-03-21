 document.addEventListener("DOMContentLoaded", () => {
    const rows = 6;
    const cols = 7;
    let board = Array.from({ length: rows }, () => Array(cols).fill(null));
    let currentPlayer = 'red';
    const gameBoard = document.getElementById('game-board');

    function createBoard() {
        gameBoard.innerHTML = '';
        for(let row = 0; row < rows; row++){
            for(let col = 0; col < cols; col++){
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                gameBoard.appendChild(cell);
            }
        }
    }

    function dropPiece(col) {
        for(let row = rows - 1; row >= 0; row--) {
            if(board[row][col] === null) {
                board[row][col] = currentPlayer;
                const cell = document.querySelector('.cell[data-row="${row}"][data-col="${col}"]');
                cell.classList.add(currentPlayer);
                if (checkWin(row, col)) {
                    setTimeout(() => alert('${currentPlayer} wins!'), 10);
                }
                currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
                return;
            }
        }
    }

    function checkWin(row, col) {
        const direction = [
            { dr: 1, dc: 0 },
            { dr: 0, dc: 1 },
            { dr: 1, dc: 1 },
            { dr: 1, dc: -1 },
        ];

        for(const { dr, dc} of direction) {
            let count = 1;
            for(let i = 1; i < 4; i++) {
                const r = row + dr * i;
                const c = col + dc * i;
                if(r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== currentPlayer) {
                    break;
                }
                count++;
            }
            for(let i = 1; i < 4; i++){
                const r = row - dr * i;
                const c = col - dc * i;
                if(r < 0 ||  r >= rows || c < 0 || c >= cols || board[r][c] !== currentPlayer) {
                    break;
                }
                count++;
            }
            if (count >= 4) return true;
        }
        return false;
    }

    function handleClick(event) {
        const cell = event.target;
        if(!cell.classList.contains('cell') || cell.classList.contains('red') || cell.classList.contains('yellow')) {
            return;
        }
        const col = parseInt(cell.dataset.col);
        dropPiece(col);
    }

    function resetGame() {
        board = Array.from({ length: rows }, () => Array(cols).fill(null));
        currentPlayer = 'red';
        createBoard();
    }

    gameBoard.addEventListener('click', handleClick);
    document.getElementById('reset-btn').addEventListener('click', resetGame);

    createBoard();
 });

